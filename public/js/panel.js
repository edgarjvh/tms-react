let title = '';
let subtitle = '';
let key = '';
let pos = 0;

class ContentPanel {
    setTitle(_title) {
        title = _title
    }
    setSubtitle(_subtitle) {
        subtitle = _subtitle
    }
    setKey(_key) {
        key = _key
    }
    setPos(_pos) {
        pos = _pos
    }

    create(container = '#email-right-container', callback) {
        if (key !== '') {
            $.get('views/panel.html', function (content) {
                content = content.replace('[data-key]', key);
                content = content.replace('[data-pos]', pos);
                content = content.replace('[title]', title);
                content = content.replace('[subtitle]', subtitle);

                $(container).append(content);

                callback();
            }, 'html');
        }
    }
}

class Edit {
    create(container, callback){
        if ($(container).find('.panel-sub-container .edit-contact-container').length > 0){
            $(container).find('.panel-sub-container .modal-shown').fadeIn(300)
            $(container).find('.panel-sub-container .edit-contact-container').animate({
                left: '70%'
            }, 300);

        }else{
            $.get('views/edit-contact.html', function(content){
                content = content.replace('[title]', 'Edit ' + title);
                $(container).find('.panel-sub-container').append(content);
                $(container).find('.panel-sub-container .modal-shown').fadeIn(300)
                $(container).find('.panel-sub-container .edit-contact-container').animate({
                    left: '70%'
                }, 300);
                callback();
            })
        }
    }
}

export {
    ContentPanel,
    Edit
}