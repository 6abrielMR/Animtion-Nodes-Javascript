function stateBoxsAnims(stateOpcBox, set_id, btn, idBtn) {
    switch(stateOpcBox) {
        case OPEN:
            set_id[0].style.animation = 'showSetIdAnim .5s ease-out';
                btn[0].style.animation = 'showBtnAnim .5s ease-out';
                set_id[0].addEventListener('webkitAnimationEnd', function() {
                    btn[0].addEventListener('webkitAnimationEnd', function() {
                        set_id[0].style.marginTop ='1%';
                        btn[0].style.marginTop = '1%';
                        if (idBtn == 0) stateAdd = true;
                        else stateRemove = true;
                    });
                });
            break;
        case CLOSE:
            set_id[0].style.animation = 'hideSetIdAnim .5s ease-out';
                btn[0].style.animation = 'hideBtnAnim .5s ease-out';
                set_id[0].addEventListener('webkitAnimationEnd', function() {
                    btn[0].addEventListener('webkitAnimationEnd', function() {
                        set_id[0].style.marginTop ='-30px';
                        btn[0].style.marginTop = '-25px';
                        if (idBtn == 0) stateAdd = false;
                        else stateRemove = false;
                    });
                });

            break;
        default:
            throw new ExceptionAnimBoxs(this.location.href);
    }
}