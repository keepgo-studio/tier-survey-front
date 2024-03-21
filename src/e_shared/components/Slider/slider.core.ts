import MouseCoor from "./MouseCoor";
import { Ease } from "@shared-inner/utils/vars";
import { debounce, floatFormat, parseMinMax } from "@shared-inner/utils/utils";

class State {
  static x = 0;
  static setX(x: number) {
    const { left, right } = this.end;
    this.x = parseMinMax(x, left, right);
  }
  
  static end = {
    left: 0,
    right: 0
  };
  static width = {
    total: 0,
    container: 0,
    item: 0
  };
}

export function attachDragAnimation(rootElem: HTMLElement, cardWrapperElem: HTMLElement, containerWidth: string) {
  const CHILDREN = [...cardWrapperElem.children] as HTMLElement[],
        N = CHILDREN.length,
        DURATION = 1500;

  if (N === 0) {
    throw new Error ("At least one child needed");
  }

  // ------------------------- setup -------------------------
  (() => {
    function setStates() {
      rootElem.style.width = containerWidth;
      rootElem.style.height = String(cardWrapperElem.offsetHeight) + "px";

      State.width.item = CHILDREN[0].offsetWidth;
      State.width.total = N * State.width.item;
      State.width.container = rootElem.offsetWidth;
      State.end.left = 0;
      State.end.right = State.width.total;
      State.x = State.end.left;

      cardWrapperElem.style.transform = `translateX(${State.width.container / 2}px)`;
    }

    setStates();
    window.addEventListener('resize', debounce(setStates));
  

    rootElem.addEventListener('drag', (e) => e.preventDefault());
    cardWrapperElem.addEventListener('drag', (e) => e.preventDefault());
  })();


  // ------------------------- position rendering -------------------------
  let curretElem = CHILDREN[0],
      ioForPosition: IntersectionObserver;

  const positionMap = new Map();

  function setPositionRenderer() {
    if(ioForPosition) ioForPosition.disconnect();

    const gap = CHILDREN[1].offsetLeft - CHILDREN[0].offsetLeft,
        rootMargin = State.width.container / 2 - gap / 2;

    ioForPosition = new IntersectionObserver(entries => entries.forEach((info) => {
      if (info.isIntersecting) {
        curretElem = info.target as HTMLElement;
      };
    }), {
      root: rootElem,
      rootMargin: '0px ' + `${-rootMargin}px`,
      threshold: 0.2
    });

    CHILDREN.forEach((elem) => {
      const position = elem.offsetLeft + State.width.item / 2;
      positionMap.set(elem, position);

      ioForPosition.observe(elem);
    });
  }

  setPositionRenderer();
  window.addEventListener('resize', debounce(setPositionRenderer));

  // ------------------------- style children -------------------------
  const showingMap = new Map();

  const ioForShowing = new IntersectionObserver(entries => entries.forEach((info) => {
    showingMap.set(info.target, info.isIntersecting);
  }), {
    root: rootElem,
  });
  
  CHILDREN.forEach((elem) => ioForShowing.observe(elem));

  const scaleStart = 0.7,
        opacityStart = 0;

  function styleChild(elem: HTMLElement) {
    const pos = positionMap.get(elem),
          limit = State.width.container / 2,
          ratio = floatFormat(parseMinMax(Math.abs(pos - State.x), 0, limit) / limit);
    
    elem.style.scale = String((1 - ratio) * (1 - scaleStart) + scaleStart);
    elem.style.opacity = String((1 - ratio) * (1 - opacityStart) + opacityStart);

    elem.style.zIndex = String(elem === curretElem ? 1 : -1);

    elem.style.pointerEvents = ratio === 0 ? '' : 'none';
  }

  function renderChildren() {
    CHILDREN.forEach(elem => {
      if (!showingMap.get(elem)) return;

      styleChild(elem);
    })

    requestAnimationFrame(renderChildren);
  }

  requestAnimationFrame(renderChildren);
  // ------------------------- mouse -------------------------
  function moveToX(
    from: number,
    dest: number,
    method: 'static' | 'smooth',
  ) {
    if (method === 'static') {
      State.setX(dest);
      cardWrapperElem.style.left = String(-State.x) + "px";
    } else if (method === 'smooth') {
      const t1 = Date.now();

      const animate = () => {
        if (coor.isMouseDown) return;
        
        const t2 = Date.now(),
              time = Math.min(1, ((t2 - t1) / DURATION)),
              easedT = floatFormat(Ease.easeOutExpo(time)),
              d = easedT * (dest - from) + from;

        State.setX(d);
        cardWrapperElem.style.left = String(-State.x) + "px";

        // if mouse reach end of corner or stopped, back to position immediately
        if (from === dest || dest >= State.end.right || dest <= State.end.left) {
          moveToX(State.x, positionMap.get(curretElem), 'smooth');
          return;
        }

        // preserve mouse animation
        if (dest !== positionMap.get(curretElem)) {
          // preserve until t 0.25
          if (time < 0.25) {
            requestAnimationFrame(animate);
          } else {
            moveToX(State.x, positionMap.get(curretElem), 'smooth');  
          }
          return;
        }
        // after mouse animation, back to position
        if (dest === positionMap.get(curretElem)) {
          if (time < 1) {
            requestAnimationFrame(animate);
          }
        }
      }

      requestAnimationFrame(animate);
    }
  }

  const coor = new MouseCoor();

  rootElem.addEventListener('mousedown', (e) => {
    coor.mousedown(e.x, e.y);
  });

  rootElem.addEventListener('mousemove', (e) => {
    if (!coor.isMouseDown) return;

    const from = State.x,
          to = from + -e.movementX;

    moveToX(from, to, "static");
  });

  (['mouseup', 'mouseleave'] as const).forEach((eventName) =>
    rootElem.addEventListener(eventName, (e) => {
      if (!coor.isMouseDown) return;

      coor.mouseup(e.x, e.y);
      
      const from = State.x,
            disX = coor.x2 - coor.x1,
            velocity = disX / (coor.endTime - coor.startTime),
            absVelocity = Math.abs(velocity),
            to = from + -disX * (absVelocity > 1 ? absVelocity / 3 : 0);

      moveToX(from, to, "smooth");
    })
  );

  function init() {
    moveToX(State.x, positionMap.get(curretElem), 'static');
  }
  init();
}