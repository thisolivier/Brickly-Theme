export default {
  init() {
    // Allows the 'show/hide' functionality on widgets
    $('.widget h3').click(function () {
      $(this).next('.widget-content').slideToggle({
        duration: 1000,
      });
    });
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
