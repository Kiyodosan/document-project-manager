function installWidgetPreviewSingle(widget, img) {
  widget.onChange(function(file) {
    img.css('visibility', 'hidden')
    img.attr('src', '')
    if (file) {
      file.done(function(fileInfo) {
        var size = '' + img.width() * 2 + 'x' + img.height() * 2
        var previewUrl = fileInfo.cdnUrl

        img.attr('src', previewUrl)
        img.attr('alt', "Uploaded file")
        img.css('visibility', 'visible')
      })
    }
  })
}

$('.image-preview-single').each(function() {
  installWidgetPreviewSingle(uploadcare.SingleWidget($(this).children('input')), $(this).children('img'))
})