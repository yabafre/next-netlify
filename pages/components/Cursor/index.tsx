import { FC, useEffect } from 'react';
import $ from 'jquery';
const Cursor : FC = () => {

useEffect(() => {
    let elementsToWatch = ['.title', '.subtitle', '.about__content', '.letter', '.button__triangle'];
    let elementsToMouse = ['.footer', '.text__into__jop', '.btn__return'];
    let elementHovered = '';


    function cursor() {
        document.body.addEventListener('mousemove', (e) => {
            $('.snipper').css({
                'transform': 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)'
            })
        })
    }

    function updateElementsToWatch() {
        let element = elementsToWatch
        let elementMouse = elementsToMouse
        element.forEach(element => {
            $(`${element}`).each((index: any, el: { addEventListener: (arg0: string, arg1: { (event: any): void; (event: any): void; }) => void; }) => {
                el.addEventListener('mouseenter', hoverZoom);
                el.addEventListener('mouseleave', hoverZoom);
            })
        });
        elementMouse.forEach(element => {
            $(`${element}`).each((index: any, el: { addEventListener: (arg0: string, arg1: { (event: any): void; (event: any): void; }) => void; }) => {
                el.addEventListener('mouseenter', hover);
                el.addEventListener('mouseleave', hover);
            })
        });
    }

    function hoverZoom(event: any) {
        const snipper = $('.snipper');
        const snipperPlus = $('.snipper__plus');
        if (elementHovered === '') {
            snipper.addClass('snipper--hover').addClass('snipper--pointer--zoom');
            snipperPlus.addClass('snipper__plus--hover');
            elementHovered = 'hovered';
        } else {
            snipper.removeClass('snipper--hover snipper--pointer--zoom');
            snipperPlus.removeClass('snipper__plus--hover');
            elementHovered = '';
        }
    }

    function hover(event: any) {
        const snipper = $('.snipper');
        const snipperPlus = $('.snipper__plus');
        if (elementHovered === '') {
            snipper.addClass('snipper--hover').addClass('snipper--pointer');
            elementHovered = 'hovered';
        } else {
            snipper.removeClass('snipper--hover snipper--pointer');
            elementHovered = '';
        }
    }

   $(document).ready(() => {
        cursor();
        updateElementsToWatch();
   } );

    return () => {
        $('.snipper').removeClass('snipper--hover snipper--pointer snipper--pointer--zoom');
        $('.snipper__plus').removeClass('snipper__plus--hover');
        elementsToWatch.forEach(element => {
            $(`${element}`).each((index: any, el: { removeEventListener: (arg0: string, arg1: { (event: any): void; (event: any): void; }) => void; }) => {
                el.removeEventListener('mouseenter', hoverZoom);
                el.removeEventListener('mouseleave', hoverZoom);
            })
        });
        elementsToMouse.forEach(element => {
            $(`${element}`).each((index: any, el: { removeEventListener: (arg0: string, arg1: { (event: any): void; (event: any): void; }) => void; }) => {
                el.removeEventListener('mouseenter', hover);
                el.removeEventListener('mouseleave', hover);
            })
        });
    }
}, []);



    return (
        <>
            <div className="snipper">
                <div className="snipper__coint_1"></div>
                <div className="snipper__coint_2"></div>
                <div className="snipper__coint_3"></div>
                <div className="snipper__coint_4"></div>
                <p className="snipper__plus"></p>
            </div>
        </>
    )

}

export default Cursor;