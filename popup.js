Modals = (function() {
    var init = function() {
        bindEvents();
    }
    
    var loadModal = function() {
        clearModal();

        var $modal = $('#modal');
        var id = $(this).data('id');
        var eats = data.Characters[id]["Eats"];
        var eaten = data.Characters[id]["EatenBy"];

        if ($modal.hasClass('hidden')) {
            $modal.removeClass('hidden');
            $('#animation').load('/assets/animations/' + id + '.html', function() {
                animationInit();
            });
            setTimeout(function(){ 
                $modal.addClass('in');
            }, 5000);
        }
        $('#modal-template').tmpl(data.Characters[id]).appendTo($modal);
        
    }
    
    var clearModal = function() {
        $('#modal').html('');
    }
   
    var hideModal = function() {
        var $modal = $('#modal');
        $modal.removeClass('in');

        setTimeout(function(){ 
             $modal.addClass('hidden');   
        }, 1000);

        clearModal();
    }

    var bindEvents = function() {
        $(document).on('click tap', '.close', hideModal);

    }

    return {
        init: init,
        loadModal: loadModal,
        hideModal: hideModal
    }

})();

   