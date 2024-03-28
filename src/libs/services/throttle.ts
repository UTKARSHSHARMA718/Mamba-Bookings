export function throttle(callBack: (v:any) => void, delay = 1000) {
  let shouldWait = false;
  let waitingArgs:any = null;
  const handleLastCall = () => {
    if (!waitingArgs) {
      shouldWait = false;
      return;
    }
    // @ts-ignore
    callBack(...waitingArgs);
    waitingArgs = null;
    setTimeout(handleLastCall, delay);
  };

  return (...args:any) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    // @ts-ignore
    callBack(...args);
    shouldWait = true;
    setTimeout(handleLastCall, delay);
  };
}
