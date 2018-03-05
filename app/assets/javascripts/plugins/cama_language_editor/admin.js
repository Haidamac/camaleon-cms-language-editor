jQuery(function(){
  $.fn.extend({
    treed: function (openedClass, closedClass, onChange) {
      var openedClass = openedClass || 'glyphicon-minus-sign';
      var closedClass = closedClass || 'glyphicon-plus-sign';

      //initialize each of the top levels
      var tree = $(this);
      tree.addClass("tree");
      tree.on('click', 'li.branch', function (e, skip_recursive) {
        if (this == e.target) {
          var icon = $(this).children('i:first');
          icon.toggleClass(openedClass + " " + closedClass);
          $(this).children().children().toggle();
          if(onChange && !skip_recursive) onChange($(this))
        }
        e.stopPropagation();
      });

      tree.on('click', '.branch .indicator', function(){ $(this).closest('li').click(); });
    }
  });

  var panel = $('#translations_editor_table')
  $('#translations_editor_form .mode_copy').click(function(){
    var btn = $(this);
    var edit_mode = btn.hasClass('is_edit_mode');
    if(edit_mode) btn.removeClass('is_edit_mode');
    else btn.addClass('is_edit_mode');
    panel.find('input').each(function(){
      if(edit_mode){
        $(this).show().next().remove();
      }else{
        $(this).hide().after("<span class='input-group-addon copy_mode_label'>\""+$(this).val().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '\\\"')+"\"</span>");
      }
    });
  });

  $('.translate-confirm').click(function () {
    var panel_head = $(this).closest('.lang-prefix'),
      lang = panel_head.data("language"),
      prefix = panel_head.data("prefix"),
      input = $(this).parent().find('input[type=text]'),
      branch = [input.val(), input.attr('name')];

    $(this).parents('.branch').map(function(){
      branch.push($(this).data("branch-name"));
    })
    branch.push(prefix, lang);
    branch = branch.reverse();

    input.attr('disabled', 'disabled');

    $.post('/admin/plugins/cama_language_editor/update', { lang: lang, branch: branch }).complete(function(){
      input.prop("disabled", false);
    });

  });

  $('#translations_editor_table .translation_column').treed(null, null, function(li, e){
    $('#translations_editor_table li.'+li.attr('data-class')).not(li).trigger('click', [true]);
  });
});