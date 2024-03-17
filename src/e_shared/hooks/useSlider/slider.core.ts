import { Ease } from "@/e_shared/utils/vars";
import MouseCoor from "./MouseCoor";
import { parseMinMax } from "@/e_shared/utils/utils";

class State {
  static prevX = 0;
  static x = 0;
  static setX(dest: number) {
    const { left, right } = this.end;
    this.prevX = this.x;
    this.x = parseMinMax(dest, left, right);
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
        DURATION = 1000;

  if (N === 0) {
    throw new Error ("At least one child needed");
  }

  // ------------------------- setup -------------------------
  (() => {
    rootElem.style.width = containerWidth;
    rootElem.style.height = String(cardWrapperElem.offsetHeight) + "px";

    State.width.item = CHILDREN[0].offsetWidth;
    State.width.total = N * State.width.item;
    State.width.container = rootElem.offsetWidth;
    State.end.left = 0;
    State.end.right = State.width.total % State.width.container;

    State.x = State.end.left;
    cardWrapperElem.style.transform = `translateX(${State.width.container / 2}px)`;
  })();


  // ------------------------- mouse -------------------------
  const mouseAnimationCallbacks: Array<() => void> = [];

  (() => {
    function moveToX(
      method: 'static' | 'smooth',
    ) {
      if (method === 'static') {
        cardWrapperElem.style.left = String(-State.x) + "px";
      } else if (method === 'smooth') {
        const t1 = Date.now();
    
        const animate = () => {
          if (coor.isMouseDown) return;
          
          const t2 = Date.now(),
                time = Math.min(1, ((t2 - t1) / 100)),
                easedT = Ease.easeOutExpo(time);
  
          cardWrapperElem.style.left = String(-(easedT * (State.x - State.prevX) + State.prevX)) + "px";
    
          if (time < 1) requestAnimationFrame(animate);
          else mouseAnimationCallbacks.forEach(func => func());
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

      State.setX(to);
      moveToX("static");
    });
  
    (['mouseup', 'mouseleave'] as const).forEach((eventName) =>
      rootElem.addEventListener(eventName, (e) => {
        if (!coor.isMouseDown) return;

        coor.mouseup(e.x, e.y);
        
        const from = State.x,
              disX = coor.x2 - coor.x1,
              velocity = disX / (coor.endTime - coor.startTime),
              absVelocity = Math.abs(velocity),
              to = from + -disX * (absVelocity > 2.5 ? absVelocity / 2 : 0);

        State.setX(to);
        moveToX("smooth");
      })
    );
  })();

  
  // ------------------------- position rendering -------------------------
  (() => {
    let curretElem = CHILDREN[0],
        currentX = 0;

    const gap = CHILDREN[1].offsetLeft - CHILDREN[0].offsetLeft,
          rootMargin = State.width.container / 2 - gap / 2,
          positionMap = new Map(),
          showingMap = new Map();

    const ioForPosition = new IntersectionObserver(entries => entries.forEach((info) => {
      if (info.isIntersecting) {
        curretElem = info.target as HTMLElement;
      };
    }), {
      root: rootElem,
      rootMargin: '0px ' + `${-rootMargin}px`,
      threshold: 0.2
    });

    const ioForShowing = new IntersectionObserver(entries => entries.forEach((info) => {
      showingMap.set(info.target, info.isIntersecting);
    }), {
      root: rootElem,
    });

    CHILDREN.forEach((elem) => {
      const position = elem.offsetLeft + State.width.item / 2;
      positionMap.set(elem, position);

      ioForPosition.observe(elem);
      ioForShowing.observe(elem);
    });

    function moveTo() {
      const t1 = Date.now();

      const animate = () => {
        const t2 = Date.now(),
              time = Math.min(1, ((t2 - t1) / DURATION)),
              easedT = Ease.easeOutExpo(time);

        currentX = easedT * (State.x - State.prevX) + State.prevX;
        cardWrapperElem.style.left = String(-currentX) + "px";
  
        if (time < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }

    mouseAnimationCallbacks.push(() => {
      State.setX(positionMap.get(curretElem));
      moveTo();
    });

    function styleChild(elem: HTMLElement) {
      const pos = positionMap.get(elem),
            limit = State.width.container,
            ratio = parseMinMax(Math.abs(pos - currentX), 0, limit) / limit;
      
      elem.style.opacity = String(1 - ratio);
    }

    function renderChildren() {
      CHILDREN.forEach(elem => {
        if (!showingMap.get(elem)) return;

        styleChild(elem);
      })

      requestAnimationFrame(renderChildren);
    }


    State.setX(positionMap.get(curretElem));
    moveTo();
    requestAnimationFrame(renderChildren);
  })();

  // (() => {
  //   function getItemMiddlePosition(idx: number) {
  //     return GItemWidth * idx;
  //   }

  //   const isShowingMap = new Map(),
  //         positionMap = new Map;
    
  //   CHILDREN.forEach((item, idx) => {
  //     isShowingMap.set(item, false);
  //     positionMap.set(item, getItemMiddlePosition(idx));
  //   });

  //   let focusedItem;
    
  //   function moveTo(
  //     from: number,
  //     dest: number,
  //     duration: number
  //   ) {
  //     const t1 = Date.now();

  //     const animate = () => {
  //       if (Animation.isMoving) return;
        
  //       const t2 = Date.now(),
  //             time = Math.min(1, ((t2 - t1) / duration)),
  //             easedT = Ease.easeOutExpo(time);
  
  //       setCardWrapperLeft((easedT * (dest - from)) + from);

  //       if (time < 1) requestAnimationFrame(animate);
  //     }
  //     requestAnimationFrame(animate);
  //   }

  //   function renderChildren() {
  //     CHILDREN.forEach((item) => {
  //       const position = positionMap.get(item),
  //             ratio = parseMinMax(Math.abs(position - GPosition), 0, GContainerWidth) / GContainerWidth;

  //       item.style.opacity = String((ratio));
  //     })
  //   }

  //   function animate() {
  //     if (!Animation.isMoving) {
  //       // moveTo(getLeftPosition(), );
  //     }

  //     renderChildren();
  //     requestAnimationFrame(animate);
  //   }

    // requestAnimationFrame(animate);
    
    // const ioForRenderChildren = new IntersectionObserver((entries) => entries.forEach((info) => {
    //   isShowingMap.set(info.target, info.isIntersecting);
    //   focusedItem = info.target;

    //   console.log(info.target, info.isIntersecting);
    // }), { threshold: 0.1 });

    
  // })();
}