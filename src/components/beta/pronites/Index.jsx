import React from 'react';
import './pronites.css';
import $ from 'jquery';

export default class PronitesIndex extends React.Component {
    render() {
        let activeIndex = 0
        let limit = 0
        let disabled = false
        let $stage
        let $controls
        let canvas = false
        const SPIN_FORWARD_CLASS = 'js-spin-fwd'
        const SPIN_BACKWARD_CLASS = 'js-spin-bwd'
        const DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled'
        const SPIN_DUR = 1000
        const appendControls = () => {
            for (let i = 0; i < limit; i++) {
                $('.carousel__control').append(`<a href="#" data-index="${i}"></a>`)
            }
            let height = $('.carousel__control').children().last().outerHeight()

            $('.carousel__control').css('height', (30 + (limit * height)))
            $controls = $('.carousel__control').children()
            $controls.eq(activeIndex).addClass('active')
        }
        const setIndexes = () => {
            $('.spinner').children().each((i, el) => {
                $(el).attr('data-index', i)
                limit++
            })
        }
        const duplicateSpinner = () => {
            const $el = $('.spinner').parent()
            const html = $('.spinner').parent().html()
            $el.append(html)
            $('.spinner').last().addClass('spinner--right')
            $('.spinner--right').removeClass('spinner--left')
        }
        const paintFaces = () => {
            $('.spinner__face').each((i, el) => {
                const $el = $(el)
                let color = $(el).attr('data-bg')
                $el.children().css('backgroundImage', `url(${getBase64PixelByColor(color)})`)
            })
        }
        const getBase64PixelByColor = (hex) => {
            if (!canvas) {
                canvas = document.createElement('canvas')
                canvas.height = 1
                canvas.width = 1
            }
            if (canvas.getContext) {
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = hex
                ctx.fillRect(0, 0, 1, 1)
                return canvas.toDataURL()
            }
            return false
        }
        const prepareDom = () => {
            setIndexes()
            paintFaces()
            duplicateSpinner()
            appendControls()
        }
        const spin = (inc = 1) => {
            if (disabled) return
            if (!inc) return
            activeIndex += inc
            disabled = true
            if (activeIndex >= limit) {
                activeIndex = 0
            }

            if (activeIndex < 0) {
                activeIndex = (limit - 1)
            }
            const $activeEls = $('.spinner__face.js-active')
            const $nextEls = $(`.spinner__face[data-index=${activeIndex}]`)
            $nextEls.addClass('js-next')

            if (inc > 0) {
                $stage.addClass(SPIN_FORWARD_CLASS)
            } else {
                $stage.addClass(SPIN_BACKWARD_CLASS)
            }

            $controls.removeClass('active')
            $controls.eq(activeIndex).addClass('active')

            setTimeout(() => {
                spinCallback(inc)
            }, SPIN_DUR, inc)
        }

        const spinCallback = (inc) => {

            $('.js-active').removeClass('js-active')
            $('.js-next').removeClass('js-next').addClass('js-active')
            $stage
                .addClass(DISABLE_TRANSITIONS_CLASS)
                .removeClass(SPIN_FORWARD_CLASS)
                .removeClass(SPIN_BACKWARD_CLASS)

            $('.js-active').each((i, el) => {
                const $el = $(el)
                $el.prependTo($el.parent())
            })
            setTimeout(() => {
                $stage.removeClass(DISABLE_TRANSITIONS_CLASS)
                disabled = false
            }, 100)
        }
        const attachListeners = () => {

            document.onkeyup = (e) => {
                switch (e.keyCode) {
                    case 38:
                        spin(-1)
                        break
                    case 40:
                        spin(1)
                        break
                }
            }
            $controls.on('click', (e) => {
                e.preventDefault()
                if (disabled) return
                const $el = $(e.target)
                const toIndex = parseInt($el.attr('data-index'), 10)
                spin(toIndex - activeIndex)

            })
        }
        const assignEls = () => {
            $stage = $('.carousel__stage')
        }

        const init = () => {
            assignEls()
            prepareDom()
            attachListeners()
        }
        $(() => {
            init();
        });
        return (
            <div>
                <div className="carousel-parentdiv">
                <div className="carousel">
                    <div className="carousel__control">
                    </div>
                    <div className="carousel__stage">
                        <div className="spinner spinner--left">
                            <div className="spinner__face js-active" data-bg="#27323c">
                                <div className="content" data-type="iceland">
                                    <div className="content__left">
                                        <h1>ICELAND<br /><span>EUROPE</span></h1>
                                    </div>
                                    <div className="content__right">
                                        <div className="content__main">
                                            <p>“As I flew north to begin my third circuit of Iceland in four years, I was slightly anxious. The number of visitors to Iceland has doubled in that period, and I feared this might mean a little less magic to go around. At the end of this trip, 6000km later, I'm thrilled to report that the magic levels remain high. It's found in glorious football victories and Viking chants, kayaking among icebergs, sitting with puffins under the midnight sun and crunching across brand-new lava fields.” </p>
                                            <p>– Carolyn Bain</p>
                                        </div>
                                        <h3 className="content__index">01</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="spinner__face" data-bg="#19304a">
                                <div className="content" data-type="china">
                                    <div className="content__left">
                                        <h1>CHINA<br /><span>ASIA</span></h1>
                                    </div>
                                    <div className="content__right">
                                        <div className="content__main">
                                            <p>“Its modern face is dazzling, but China is no one-trick pony. The world's oldest continuous civilisation isn't all smoked glass and brushed aluminium and while you won't be tripping over artefacts – three decades of round-the-clock development and rash town-planning have taken their toll – rich seams of antiquity await.”</p>
                                            <p>– Damian Harper</p>
                                        </div>
                                        <h3 className="content__index">02</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="spinner__face" data-bg="#2b2533">
                                <div className="content" data-type="usa">
                                    <div className="content__left">
                                        <h1>USA<br /><span>NORTH AMERICA</span></h1>
                                    </div>
                                    <div className="content__right">
                                        <div className="content__main">
                                            <p>“When it comes to travel, America has always floored me with its staggering range of possibilities. Not many other countries have so much natural beauty – mountains, beaches, rainforest, deserts, canyons, glaciers – coupled with fascinating cities to explore, an unrivaled music scene and all the things that make travel so rewarding (friendly locals, great restaurants and farmers markets, and plenty of quirky surprises).” </p>
                                            <p>– Regis St Louis</p>
                                        </div>
                                        <h3 className="content__index">03</h3>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="spinner__face" data-bg="#312f2d">
                                <div className="content" data-type="peru">
                                    <div className="content__left">
                                        <h1>PERU<br /><span>SOUTH AMERICA</span></h1>
                                    </div>
                                    <div className="content__right">
                                        <div className="content__main">
                                            <p>“For me, Peru is the molten core of South America, a distillation of the oldest traditions and the finest building, weaving and art made by the most sophisticated cultures on the continent. In Peru the wildest landscapes – from frozen Andean peaks to the deep Amazon – help us re-forge our connection to the natural world. It is also a cultural stew, where diverse peoples live side by side, negotiating modern life with humor and aplomb. Beyond that, the cuisine alone makes it worth the trip. Every return is rich and surprising.”</p>
                                            <p>– Carolyn McCarthy</p>
                                        </div>
                                        <h3 className="content__index">04</h3>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div style={{ height: "0", width: "0", overflow: "hidden" }}>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/peru.jpg" />
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/canada.jpg" />
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/china.jpg" />
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/usa.jpg" />
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/iceland.jpg" />
                </div>
                </div>
            </div>
        )
    }
}