// фіксую header
let header = $('.header'),
    headerH = header.innerHeight(),
    scrollOffset = $(window).scrollTop();

// для вибору мови
$('#header__language, #m-header__language').each(function(){
   var $this = $(this), numberOfOptions = $(this).children('option').length;
 
   $this.addClass('select-hidden'); 
   $this.wrap('<div class="header__language"></div>');
   $this.after('<div class="select-styled"></div>');

   var $styledSelect = $this.next('div.select-styled');
   $styledSelect.text($this.children('option').eq(0).text());
 
   var $list = $('<ul />', {
       'class': 'select-options'
   }).insertAfter($styledSelect);
 
   for (var i = 0; i < numberOfOptions; i++) {
       $('<li />', {
           text: $this.children('option').eq(i).text(),
           rel: $this.children('option').eq(i).val()
       }).appendTo($list);
   }
 
   var $listItems = $list.children('li');
 
   $styledSelect.click(function(e) {
       e.stopPropagation();
       $('div.select-styled.active').not(this).each(function(){
           $(this).removeClass('active').next('ul.select-options').hide();
       });
       $(this).toggleClass('active').next('ul.select-options').toggle();
   });
 
   $listItems.click(function(e) {
       e.stopPropagation();
       $styledSelect.text($(this).text()).removeClass('active');
       $this.val($(this).attr('rel'));
       $list.hide();
   });
 
   $(document).click(function() {
       $styledSelect.removeClass('active');
       $list.hide();
   });

});

// для навігаці по сторінці для мобайл
$('.menu__link').click(function(event){
    event.preventDefault();

    $('.m-menu').removeClass('active');
    $('.header__burger').removeClass('active');
    $('body').removeClass('no-scroll');

    let $this = $(this),
        blockId = $this.data('scroll');
        blockOffset = $(blockId).offset().top - headerH;
    $('html, body').animate({
        scrollTop: blockOffset
    },1000)
})

// бургер меню
$('.header__burger').click(function(){
    $(this).toggleClass('active');
    $('.m-menu').toggleClass('active');
    $('body').toggleClass('no-scroll');
})


