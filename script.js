$ = jQuery;
var rotate;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split("&"),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ?
                true :
                decodeURIComponent(sParameterName[1]);
        }
    }
};

$(document).ready(function() {

    slider(0);
    animationFrontPage();
    form();
    desktopHover();
    customer();
});
////////////////////////////////
// Animation Front Page
///////////////////////////////
function customer() {
    var customer = getUrlParameter('customer');
    if (customer){
        $('body').addClass('customerChefLavanExist');
    }

    if ($('body').hasClass('customerChefLavanExist')){
        $('.send-btn.send-btn1 .txt-send-button').text('נתראה במייל');
    }else{
        $('.send-btn.send-btn1 .txt-send-button').text('עוד רגע סיימנו');
    }
}
////////////////////////////////
// Animation Front Page
///////////////////////////////
function desktopHover() {
    if (!$('body').hasClass('mobile')) {

        if (!$('.container').hasClass('rightHoverShow') ||
            !$('.container').hasClass('leftHoverShow')||
            !$('.container').hasClass('clickRightHoverShow')||
            !$('.container').hasClass('clickLeftHoverShow')
            ){

                setInterval(() => {
                    $('.leftC').addClass('animationPlay');
                    setTimeout(() => {
                        $('.leftC').removeClass('animationPlay');
                    }, 2000);
                    setTimeout(() => {
                        $('.rightC').addClass('animationPlay');
                        setTimeout(() => {
                            $('.rightC').removeClass('animationPlay');
                        }, 2000);
                    }, 3000);
                }, 7000);
            }

        $('.leftC').hover(function() {
            $(this).closest('.container').addClass('leftHoverShow');
        }, function() {
            $(this).closest('.container').removeClass('leftHoverShow');
        });

        $('.rightC').hover(function() {
            $(this).closest('.container').addClass('rightHoverShow');
        }, function() {
            $(this).closest('.container').removeClass('rightHoverShow');
        });

        $('.leftC').click(function() {
            $('body').removeClass('showNextButton');
            $(this).closest('.container').attr('data-answer', '');
            var nameAnswer = $(this).closest('.wrapper').data('answ');
            $(this).closest('.container').attr('data-answer', nameAnswer);
            $(this).closest('.container').removeClass('clickRightHoverShow clickLeftHoverShow');
            $(this).closest('.container').addClass('clickLeftHoverShow');
            $('body').addClass('showNextButton');
        });
        $('.rightC').click(function() {
            $('body').removeClass('showNextButton');
            $(this).closest('.container').attr('data-answer', '');
            var nameAnswer = $(this).closest('.wrapper').data('answ');
            $(this).closest('.container').attr('data-answer', nameAnswer);
            $(this).closest('.container').removeClass('clickRightHoverShow clickLeftHoverShow');
            $(this).closest('.container').addClass('clickRightHoverShow');
            $('body').addClass('showNextButton');
        });
    }
}
////////////////////////////////
// Form
///////////////////////////////
function form() {

    $('.wrapperChooseCook1 .item').click(function(e) {
        $('.wrapperChooseCook1 .item').removeClass('active');
        $(this).addClass('active');
        updateInpuCook();
        checkItem();
    });
    $('.wrapperChooseCook2 .item').click(function(e) {
        $('.wrapperChooseCook2 .item').removeClass('active');
        $(this).addClass('active');
        updateInpuCook();
        checkItem();
    });
    $('.wrapperChooseCook3 .item').click(function(e) {
        $('.wrapperChooseCook3 .item').removeClass('active');
        $(this).addClass('active');
        updateInpuCook();
        checkItem();
    });

    function checkItem() {
        var countItem = 0;
        $('.cookTxtWrapper input').each(function(index, element) {
            if ($(this).val() != '') {
                countItem++;
            }
        });
        // console.log(countItem);
        if (countItem == 3) {
            $('.send-btn.send-btn1').addClass('active');
        } else {
            $('.send-btn.send-btn1').removeClass('active');
        }
    }


    function updateInpuCook() {

        $('#cook').val('');
        $('#cook2').val('');
        $('#cook3').val('');

        $('.wrapperChooseCook1 .item').each(function(index, element) {
            if ($(this).hasClass('active')) {
                var nameItem = $(this).data('item');
                $('#cook').val(nameItem);
            }
        });
        $('.wrapperChooseCook2 .item').each(function(index, element) {
            if ($(this).hasClass('active')) {
                var nameItem = $(this).data('item');
                $('#cook2').val(nameItem);
            }
        });
        $('.wrapperChooseCook3 .item').each(function(index, element) {
            if ($(this).hasClass('active')) {
                var nameItem = $(this).data('item');
                $('#cook3').val(nameItem);
            }
        });
    }


    //Move placeholders up
    $("input").focus(function(e) {
        const name = $(e)[0].target.name;
        $(`.field-placeholder`).removeClass("input-after-active");
        $(`.field-placeholder.${name}`).addClass("active");
    });

    //Move placeholders down if empty field
    $("input").on("focusout", function(e) {
        const name = $(e)[0].target.name;
        const val = $(`input[name="${name}"]`).val();
        if (!val) {
            $(`.field-placeholder.${name}`).removeClass("active");
            $(`.field-placeholder.${name}`).addClass("input-after-active");
        }
    });

    function regexEmail(email) {
        HebrewChars = new RegExp("^[\u0590-\u05FF]+$");
        AlphaNumericChars = new RegExp("^[a-zA-Z0-9-]+$");
        EnglishChars = new RegExp("^[a-zA-Z-]+$");
        LegalChars = new RegExp("^[a-zA-Z-\u0590-\u05FF ]+$");

        // Then use it

        if (!LegalChars.test(email)) {
            console.log("Succeess");
        } else {
            var str = $(".email").val();
            var res = str.replace("email", " ");
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    //Validation for phone number
    function regexPhone(phone) {
        const fixedPhone = phone.replace(/[a-zA-Z\u0590-\u05fe-]/g, "");
        $("#phone").val(fixedPhone);
        const firstRe = /[a-zA-Z\u0590-\u05fe-]/.test(
            String(phone).toLocaleLowerCase()
        );
        if (firstRe) {
            return "characters";
        }

        const secondRe = /^\+?(972|0)?0?(([23489]{1}\d{7})|([71,72,73,74,75,76,77]{2}\d{7})|[5]{1}\d{8})$/.test(
            String(phone).toLowerCase()
        );
        if (!secondRe) {
            return "numbers";
        }
        return "ok";
    }


    function isFormLegal() {
        let isLegal = true;


        $(".error-m.accept").fadeOut();
        $(".success.accept").removeClass("ok");

        if ($('#accept').is(':checked')) {
            $(".success.accept").addClass("ok");
        } else {
            $(".error-m.accept").fadeIn();
        }

        if (!$(".success.name").hasClass("ok")) {
            $(".error-m.name").fadeIn();
        }
        if (!$(".success.phone").hasClass("ok")) {
            $(".error-m.phone").fadeIn();
        }
        if (!$(".success.email").hasClass("ok")) {
            $(".error-m.email").fadeIn();
        }
        if (!$(".success.accept").hasClass("ok")) {
            $(".error-m.accept").fadeIn();
        }
        if (!$(".success.name").hasClass("ok") ||
            !$(".success.accept").hasClass("ok") ||
            !$(".success.email").hasClass("ok")
        ) {
            isLegal = false;
        }

        return isLegal;
    }

    //Validation for all fields
    $("input").on("input", function(e) {
        $(".send-btn2").addClass('active');
        //Get the ID ans the name - Used to know the type of the validation we need
        const id = $(e)[0].target.id;
        const name = $(e)[0].target.name;
        const isRequired = $($(e)[0].target).attr("required");
        const val = $(`input[name="${name}"]`).val();
        const field = $(this).attr("name");

        switch (id) {
            case "name":
                if (isRequired) {
                    if (!val) {
                        $(`.error-m.${id}`).css("display", "block");
                        $(`.success.${id}`).css("display", "none");
                    } else if (!val.split(" ")[1]) {
                        $(`.error-m.${id}`).css("display", "block");
                        $(`.success.${id}`).css("display", "none");
                    } else if (!val.split(" ")[0]) {
                        $(`.error-m.${id}`).css("display", "block");
                        $(`.success.${id}`).css("display", "none");
                    } else {
                        $(`.error-m.${id}`).html("");
                        $(`.success.${id}`).css("display", "block");
                        $(`.success.${id}`).addClass("ok");
                    }
                }
                break;

            case "email":
                if (isRequired) {
                    if (!val) {
                        $(`.error-m.${id}`).css("display", "block");
                        $(`.success.${id}`).css("display", "none");
                    } else if (!regexEmail(val)) {
                        $(`.error-m.${id}`).css("display", "block");
                        $(`.success.${id}`).css("display", "none");
                    } else {
                        $(`.error-m.${id}`).html("");
                        $(`.success.${id}`).css("display", "block");
                        $(`.success.${id}`).addClass("ok");
                    }
                }
                break;

            case "phone":
                var regex = new RegExp('^05[0-9]{8}$');
                const re = regexPhone(val);
                $("#phone").attr("maxlength", "10");
                if (isRequired && !val) {
                    $(`.error-m.${id}`).css("display", "block");
                    $(`.success.${id}`).css("display", "none");
                } else if (re === "numbers") {
                    $(`.error-m.${id}`).css("display", "block");
                    $(`.success.${id}`).css("display", "none");
                } else if (re === "characters") {
                    $(`.error-m.${id}`).css("display", "block");
                    $(`.success.${id}`).css("display", "none");
                } else if (!regex.test($('#phone').val())) {
                    $(`.error-m.${id}`).css("display", "block");
                    $(`.success.${id}`).css("display", "none");
                } else {
                    $(`.error-m.${id}`).html("");
                    $(`.success.${id}`).css("display", "block");
                    $(`.success.${id}`).addClass("ok");
                }
                break;

            default:
                break;
        }
    });

    $(".send-btn1").click(function(e) {
        
        if ($('body').hasClass('customerChefLavanExist')){
            var getTheUrl = document.location.href;

            var Interest_1 = $('.container-first').data('answer');
            var Interest_2 = $('.container-second').data('answer');
            var Interest_3 = $('.container-three').data('answer');
            var Interest_4 = $('.container-four').data('answer');
            var Interest_5 = $('.container-five').data('answer');
            var Interest_6 = $('.container-six').data('answer');
            var Interest_7 = $('.container-seven').data('answer');
            var Difficulty = $('#cook').val();
            var Difficulty2 = $('#cook2').val();
            var Difficulty3 = $('#cook3').val();
    
            var email = getUrlParameter('email');
            var ContactKey = 'tn_' + email;
    
            const dateCreate = new Date();
            const date = dateCreate.toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', "");
            var Created_Date = date;
            var url = `${getTheUrl}/includes/`;
    
            var data2 = {
                Interest_1: Interest_1,
                Interest_2: Interest_2,
                Interest_3: Interest_3,
                Interest_4: Interest_4,
                Interest_5: Interest_5,
                Interest_6: Interest_6,
                Interest_7: Interest_7,
                email: email,
                Created_Date: Created_Date,
                ContactKey: ContactKey,
                Difficulty: Difficulty,
                Difficulty2: Difficulty2,
                Difficulty3: Difficulty3
            };
    
            // console.log(data2);
    
            $.ajax({
                type: "POST",
                url: url,
                data: data2,
                error: function(request, error) {
                    console.log(request);
                    console.log(error);
                    alert("לצערנו ישנה שגיאה בשליחת הטופס");
                },
                success: function(data) {
                    console.log(data);
                    $(".tnx").fadeIn();
                }
            });
        }else{   
            $('.contentTextForm2').fadeIn();
            $('.costumerNotExist').fadeIn();
            $('.customerExist').hide();
            $('.wrapperNumberQuetion').hide();
            $('.back2').hide();
            $('.back3').css('display','flex');
            $('.bgDesktopForm1').fadeOut();
            $('.bgDesktopForm2').fadeIn();
        }
    });

    $(".send-btn2").click(function(e) {
        e.preventDefault();

        if (!isFormLegal()) {
            return;
        }


        var getTheUrl = document.location.href;

        var Interest_1 = $('.container-first').data('answer');
        var Interest_2 = $('.container-second').data('answer');
        var Interest_3 = $('.container-three').data('answer');
        var Interest_4 = $('.container-four').data('answer');
        var Interest_5 = $('.container-five').data('answer');
        var Interest_6 = $('.container-six').data('answer');
        var Interest_7 = $('.container-seven').data('answer');

        var fullName = $("#name").val().split(" ");
        var lastname = fullName.pop();
        var firstname = fullName.join(" ");



        var Difficulty = $('#cook').val();
        var Difficulty2 = $('#cook2').val();
        var Difficulty3 = $('#cook3').val();

        var email = $("#email").val();
        var ContactKey = 'tn_' + email;

        var emailOptIn = $('#accept').is(':checked').toString();
        var NewsletterApproved = '';
        if (emailOptIn) {
            NewsletterApproved = 'true';
        } else {
            NewsletterApproved = 'false';
        }
        const dateCreate = new Date();
        const date = dateCreate.toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', "");
        var Created_Date = date;
        var url = `${getTheUrl}/includes/`;

        var data2 = {
            Interest_1: Interest_1,
            Interest_2: Interest_2,
            Interest_3: Interest_3,
            Interest_4: Interest_4,
            Interest_5: Interest_5,
            Interest_6: Interest_6,
            Interest_7: Interest_7,
            firstname: firstname,
            lastname: lastname,
            email: email,
            NewsletterApproved: NewsletterApproved,
            Created_Date: Created_Date,
            ContactKey: ContactKey,
            Difficulty: Difficulty,
            Difficulty2: Difficulty2,
            Difficulty3: Difficulty3
        };

        // console.log(data2);

        $.ajax({
            type: "POST",
            url: url,
            data: data2,
            error: function(request, error) {
                console.log(request);
                console.log(error);
                alert("לצערנו ישנה שגיאה בשליחת הטופס");
            },
            success: function(data) {
                console.log(data);
                $(".tnx").fadeIn();
            }
        });

    });

}
////////////////////////////////
// Animation Front Page
///////////////////////////////
function slider() {
    if ($('body').hasClass('mobile')) {
        $(`#container0`).twentytwenty();
        $(`#container1`).twentytwenty();
        $(`#container2`).twentytwenty();
        $(`#container3`).twentytwenty();
        $(`#container4`).twentytwenty();
        $(`#container5`).twentytwenty();
        $(`#container6`).twentytwenty();
        $(`#container7`).twentytwenty();
    }
}

function animationFrontPage() {
    var click = 0;

    $('.start').click(function(e) {
        $('body').addClass('frontSlideOut');
        $('.container-first').addClass('active last');
        click = 1;
    });

    $('.next').click(function(e) {
        if ($(this).hasClass('enableClick') || !$('body').hasClass('mobile')) {

            $('body').removeClass('showNextButton');

            if ($('body').hasClass('mobile')) {

                $('.container').each(function(index, element) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active');
                        $(this).addClass('yes');
                        return false;
                    }
                });
                click++;

                if (click == 8) {
                    $('body').addClass('showForm');
                }
            } else {

                $('.after').removeClass('startAnimation rotateY');
                $('.before').removeClass('startAnimation rotateY');
                $('.animationDesktopChoose').removeClass('startAnimationLeft startAnimationRight');

                $('.contentText').fadeOut();

                $('.container').each(function(index, element) {

                    if (!$(this).hasClass('active')) {
                        $(this).removeClass('clickLeftHoverShow clickRightHoverShow');
                    }

                    if ($(this).hasClass('active')) {
                        if ($(this).hasClass('clickLeftHoverShow')) {
                            $(this).find('.animationDesktopChoose').addClass('startAnimationLeft');
                            $(this).find('.before').addClass('startAnimation');
                            $(this).find('.after').addClass('rotateY');
                        } else if ($(this).hasClass('clickRightHoverShow')) {
                            $(this).find('.animationDesktopChoose').addClass('startAnimationRight');
                            $(this).find('.after').addClass('startAnimation');
                            $(this).find('.before').addClass('rotateY');
                        }
                    }
                });

                setTimeout(() => {

                    $('.container').each(function(index, element) {
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active');
                            $(this).addClass('yes');
                            $('.container').removeClass('last');
                            $(this).addClass('last');
                            return false;
                        }
                    });
                    click++;

                    $('.contentText').fadeIn();

                    if (click == 8) {
                        $('body').addClass('showForm');
                    }
                }, 1500);

                setTimeout(() => {
                    $('.after').removeClass('startAnimation rotateY');
                    $('.before').removeClass('startAnimation rotateY');
                    $('.animationDesktopChoose').removeClass('startAnimationLeft startAnimationRight');
                }, 2500);
            }
        }

        $('.next').removeClass('enableClick');

    });

    $('.back').click(function(e) {
        $('.after').removeClass('startAnimation rotateY');
        $('.before').removeClass('startAnimation rotateY');
        $('.animationDesktopChoose').removeClass('startAnimationLeft startAnimationRight');

        if (click == 1) {
            $('body').addClass('frontSliderIn');
            setTimeout(() => {
                $('body').removeClass('frontSlideOut frontSliderIn nextStay');
            }, 1000);
            click--;
        } else if (click >= 2) {
            $('.container').each(function(index, element) {
                var containerClick = $(this).data('click');
                if (containerClick == click) {
                    $(this).removeClass('active');
                }
            });
            click--;
        }

        if ($('body').hasClass('mobile')) {
            $('.next').addClass('enableClick');
        }
    });

    $('.back2').click(function(e) {

        setTimeout(() => {
            $('body').removeClass('showForm formSliderIn');
        }, 1000);
        click--;
        if ($('body').hasClass('mobile')){
            $('body').addClass('formSliderIn nextStay');
            $('.next').addClass('enableClick');
        }
        if (!$('body').hasClass('mobile')){
            $('body').addClass('showNextButton');
        }

    });

    $('.back3').click(function(e) {
        $('.back2').css('display','flex');
        $('.back3').hide();
        $('.contentTextForm2').hide();
        $('.costumerNotExist').hide();
        $('.customerExist').fadeIn();
        $('.wrapperNumberQuetion').fadeIn();
        $('.bgDesktopForm1').fadeIn();
        $('.bgDesktopForm2').fadeOut();
    });
}