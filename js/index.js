(function ($) {
    $(".contact-form1").submit(function (event) {
      event.preventDefault();
   
      let successSendText = "The message was sent successfully";
      let errorSendText = "The message has not been sent. Try again!";
    let requiredFieldsText = "Fill in all the fields";
 
    // Сохраняем в переменную класс с параграфом для вывода сообщений об отправке
    let message = $(this).find(".contact-form__message");
   
      let form = $("#" + $(this).attr("id"))[0];
      let fd = new FormData(form);
      $.ajax({
        url: "send-message-to-telegram1.php",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: () => {
          $(".preloader").addClass("preloader_active");
        },
        success: function success(res) {
          $(".preloader").removeClass("preloader_active");
   
          // Посмотреть на статус ответа, если ошибка
          // console.log(res);
          let respond = $.parseJSON(res);
   
          if (respond === "SUCCESS") {
            message.text(successSendText).css("color", "#000000");
            setTimeout(() => {
              message.text("");
            }, 4000);
          } else if (respond === "NOTVALID") {
            message.text(requiredFieldsText).css("color", "#000000");
            setTimeout(() => {
              message.text("");
            }, 3000);
          } else {
            message.text(errorSendText).css("color", "#000000");
            setTimeout(() => {
              message.text("");
            }, 4000);
          }
        }
      });
    });
  })(jQuery);

