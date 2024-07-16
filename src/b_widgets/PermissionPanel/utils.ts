function barrier(e: BeforeUnloadEvent) {
  e.preventDefault();
}

export function addLeaveBarrier() {
  if (!window) return;
  
  window.addEventListener('beforeunload', barrier);
}

export function removeLeaveBarrier() {
  if (!window) return;

  window.removeEventListener('beforeunload', barrier); 
}