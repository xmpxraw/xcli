if (ClientICC && window.windowConf) {
    const wc = window.windowConf;
    const wcDrag = wc.draggableArea;
    let couldSetDrag = false;
    if (ClientICC.isPC()) {
        couldSetDrag = true;
        let size = wc.size.pc
        ClientICC.setWindowSize(size.width, size.height);
    } else if (ClientICC.isWebCC()) {
        couldSetDrag = true;
        let size = wc.size.webcc
        ClientICC.setWindowSize(size.width, size.height);
    }
    if (couldSetDrag&&wcDrag && 
        (wcDrag.webcc || wcDrag.pc)) {
        ClientICC.setDraggableAreas(wcDrag.webcc || {}, wcDrag.pc || function(){})
    }
}
