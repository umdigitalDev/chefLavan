(function($) {

    $.fn.twentytwenty = function(options) {
        var options = $.extend({
            default_offset_pct: 0.5,
            orientation: 'horizontal',
            before_label: 'Before',
            after_label: 'After',
            no_overlay: false,
            move_slider_on_hover: false,
            move_with_handle_only: true,
            click_to_move: false
        }, options);

        return this.each(function() {

            var sliderPct = options.default_offset_pct;
            var container = $(this);
            var sliderOrientation = options.orientation;
            var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
            var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';


            container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
            if (!options.no_overlay) {
                container.append("<div class='twentytwenty-overlay'></div>");
                var overlay = container.find(".twentytwenty-overlay");
                overlay.append("<div class='twentytwenty-before-label' data-content='" + options.before_label + "'></div>");
                overlay.append("<div class='twentytwenty-after-label' data-content='" + options.after_label + "'></div>");
            }
            var beforeImg = container.find(".before");
            var afterImg = container.find(".after");
            container.append("<div class='twentytwenty-handle'></div>");
            container.append("<div class='HoverSlide'></div>");
            var slider2 = container.find(".HoverSlide");
            var slider = container.find(".twentytwenty-handle");
            slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
            slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
            slider.append("<div class='move2'></div>");
            slider.append("<div class='hr'></div>");
            container.addClass("twentytwenty-container");
            beforeImg.addClass("twentytwenty-before");
            afterImg.addClass("twentytwenty-after");

            var calcOffset = function(dimensionPct) {
                var w = beforeImg.width();
                var h = beforeImg.height();
                return {
                    w: w + "px",
                    h: h + "px",
                    cw: (dimensionPct * w) + "px",
                    ch: (dimensionPct * h) + "px"
                };
            };

            var adjustContainer = function(offset) {
                if (sliderOrientation === 'vertical') {
                    beforeImg.css("clip", "rect(0," + offset.w + "," + offset.ch + ",0)");
                    afterImg.css("clip", "rect(" + offset.ch + "," + offset.w + "," + offset.h + ",0)");
                } else {
                    beforeImg.css("clip", "rect(0," + offset.cw + "," + offset.h + ",0)");
                    afterImg.css("clip", "rect(0," + offset.w + "," + offset.h + "," + offset.cw + ")");
                }
                container.css("height", offset.h);
            };

            var adjustSlider = function(pct) {
                var offset = calcOffset(pct);
                slider.css((sliderOrientation === "vertical") ? "top" : "left", (sliderOrientation === "vertical") ? offset.ch : offset.cw);
                slider2.css((sliderOrientation === "vertical") ? "top" : "left", (sliderOrientation === "vertical") ? offset.ch : offset.cw);
                adjustContainer(offset);

                var offsetCW = parseInt(offset.cw.replace('px', ''));
                var offsetW = parseInt(offset.w.replace('px', ''));
                var precent = offsetCW / offsetW;
                var offsetWRight = offsetW - 15;

                // console.log(precent);

                if (precent > 0.6) {
                    beforeImg.css("transition", "inherit");
                    afterImg.css("transition", "inherit");
                    container.find('.twentytwenty-handle').css("transition", "inherit");
                    container.find('.twentytwenty-handle').addClass("noAnimation");
                    container.find(".blueOne")[0].style.opacity = '1';
                    container.find('.rotateOne')[0].style.transform = 'rotate(2.4deg)';
                    container.closest('.container').find(".contText2")[0].style.filter = 'blur(3px)';
                    container.closest('.container').find(".contTextBetwwen")[0].style.filter = 'blur(3px)';
                    var answer = container.find(".wrapper-one").data('answ');
                    container.closest('.container').attr('data-answer', answer);
                    $('.next').addClass('enableClick');
                } else if (precent < 0.4) {
                    beforeImg.css("transition", "inherit");
                    afterImg.css("transition", "inherit");
                    container.find('.twentytwenty-handle').css("transition", "inherit");
                    container.find('.twentytwenty-handle').addClass("noAnimation");
                    container.find(".blueTwo")[0].style.opacity = '1';
                    container.find('.rotateTwo')[0].style.transform = 'rotate(-2.4deg)';
                    container.closest('.container').find(".contText1")[0].style.filter = 'blur(3px)';
                    container.closest('.container').find(".contTextBetwwen")[0].style.filter = 'blur(3px)';
                    var answer = container.find(".wrapper-two").data('answ');
                    container.closest('.container').attr('data-answer', answer);
                    $('.next').addClass('enableClick');
                } else {
                    container.find(".blueOne")[0].style.opacity = '0';
                    container.find(".blueTwo")[0].style.opacity = '0';
                    container.find('.rotateOne')[0].style.transform = 'rotate(0deg)';
                    container.find('.rotateTwo')[0].style.transform = 'rotate(0deg)';
                    container.closest('.container').find(".contText2")[0].style.filter = 'blur(0px)';
                    container.closest('.container').find(".contText1")[0].style.filter = 'blur(0px)';
                    container.closest('.container').find(".contTextBetwwen")[0].style.filter = 'blur(0px)';
                    container.closest('.container').attr('data-answer', '');
                    // $('.next').removeClass('enableClick');
                    container.find('.twentytwenty-handle').removeClass("noAnimation");
                }



            };

            // Return the number specified or the min/max number if it outside the range given.
            var minMaxNumber = function(num, min, max) {
                return Math.max(min, Math.min(max, num));
            };

            // Calculate the slider percentage based on the position.
            var getSliderPercentage = function(positionX, positionY) {
                var sliderPercentage = (sliderOrientation === 'vertical') ?
                    (positionY - offsetY) / imgHeight :
                    (positionX - offsetX) / imgWidth;

                return minMaxNumber(sliderPercentage, 0, 1);
            };


            $(window).on("resize.twentytwenty", function(e) {
                adjustSlider(sliderPct);
            });

            var offsetX = 0;
            var offsetY = 0;
            var imgWidth = 0;
            var imgHeight = 0;
            var onMoveStart = function(e) {
                if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
                    e.preventDefault();
                } else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
                    e.preventDefault();
                }
                container.addClass("active");
                offsetX = container.offset().left;
                offsetY = container.offset().top;
                imgWidth = beforeImg.width();
                imgHeight = beforeImg.height();
            };
            var onMove = function(e) {
                if (container.hasClass("active")) {
                    sliderPct = getSliderPercentage(e.pageX, e.pageY);
                    adjustSlider(sliderPct);
                }
            };
            var onMoveEnd = function(e) {
                container.removeClass("active");

                var offset = calcOffset(sliderPct);
                var offsetCW = parseInt(offset.cw.replace('px', ''));
                var offsetW = parseInt(offset.w.replace('px', ''));
                var precent = offsetCW / offsetW;
                var offsetWRight = offsetW - 15;

                if (precent > 0.5) {
                    beforeImg.css("transition", "0.2s ease");
                    afterImg.css("transition", "0.2s ease");
                    container.find('.twentytwenty-handle').css("transition", "0.2s ease");
                    beforeImg.css("clip", "rect(0," + offsetWRight + "px," + offset.h + ",0)");
                    afterImg.css("clip", "rect(0," + offset.w + "," + offset.h + "," + offsetWRight + "px)");
                    container.find('.twentytwenty-handle').css("left", offsetWRight + "px");
                } else if (precent < 0.5) {
                    beforeImg.css("transition", "0.2s ease");
                    afterImg.css("transition", "0.2s ease");
                    container.find('.twentytwenty-handle').css("transition", "0.2s ease");
                    beforeImg.css("clip", "rect(0,15px," + offset.h + ",0)");
                    afterImg.css("clip", "rect(0," + offset.w + "," + offset.h + ",15px)");
                    container.find('.twentytwenty-handle').css("left", "15px");
                }
            };

            var moveTarget = options.move_with_handle_only ? slider : container;
            var moveTarget2 = options.move_with_handle_only ? slider2 : container;
            moveTarget.on("movestart", onMoveStart);
            moveTarget.on("move", onMove);
            moveTarget.on("moveend", onMoveEnd);
            moveTarget2.on("movestart", onMoveStart);
            moveTarget2.on("move", onMove);
            moveTarget2.on("moveend", onMoveEnd);

            if (options.move_slider_on_hover) {
                container.on("mouseenter", onMoveStart);
                container.on("mousemove", onMove);
                container.on("mouseleave", onMoveEnd);
            }

            slider.on("touchmove", function(e) {
                e.preventDefault();
            });
            slider2.on("touchmove", function(e) {
                e.preventDefault();
            });

            container.find("img").on("mousedown", function(event) {
                event.preventDefault();
            });

            if (options.click_to_move) {
                container.on('click', function(e) {
                    offsetX = container.offset().left;
                    offsetY = container.offset().top;
                    imgWidth = beforeImg.width();
                    imgHeight = beforeImg.height();

                    sliderPct = getSliderPercentage(e.pageX, e.pageY);
                    adjustSlider(sliderPct);
                });
            }

            $(window).trigger("resize.twentytwenty");
        });
    };

})(jQuery);