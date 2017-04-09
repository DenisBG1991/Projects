var QuoteGenerator = (function(){
    function _setUpListeners() {
        $(':mobile-pagecontainer').on('pagecontainershow', _showList);
        $('#list').on('click', 'del-link', _delQuote);
        $('#list').on('click', 'show-link', _showQuotePage);
    }

    function _showList() {
        var data = "",
            quoteList = $('#list'),
            restoreQuotes = JSON.parse(localStorage.getItem('quotes'));

        $(quoteList).empty();
        if (restoreQuotes.state) {
            $.each(restoreQuotes.quotes, function (key, val) {
                var itemLink = '<a href="#" class="show-link">' + val.title + '</a>',
                    refreshLink = '<a href="#" class="del-link"></a>',
                    link = '<li class="quote-elem">' + itemLink + refreshLink + '</li>';
                $(quoteList).append(link);
            });

            $(quoteList).listview('refresh');
        } else {
            $(quoteList).append("<li>can't load data</li>");
            $(quoteList).listview('refresh');
        }
    }
    
    function _showQuotePage(e) {
        e.preventDefault();

        var restoreQuotes = JSON.parse(localStorage.getItem('quotes')),
            quotes = restoreQuotes.quotes,
            list = $('.quote-elem'),
            target = $(e.target).parent(),
            index = list.index(target),
            title,
            author,
            text;

        $.each(quotes, function (key) {
            if (index === key) {
                title = quotes[key].title;
                author = quotes[key].author;
                text = quotes[key].text;
            }
        });

        _generateQuotePage(title, author, text);
    }
    
    function _generateQuotePage(title, author, text) {
        var quotePage = $('<div data-role="page" data-url="test.html&home">' +
            '<div data-role="header" data-position="fixed"' +
            ' data-add-back-btn="true" data-back-btn-text="back" data-back-btn-theme="a">' +
            '<h1>' + title + '</h1>' +
            '</div>' +
            '<div data-role="content" class="ui-content>">' +
            '<h3>' + author + '</h3>' +
            '<p>' + text + '</p>' +
            '</div>' +
            '<div data-role="footer">' +
            '</div>' +
            '</div>');

        quotePage.appendTo($.mobile.pagecontainer);

        $.mobile.changePage(quotePage);
    }
    
    function _delQuote(e) {
        e.preventDefault();

        var restoreQuotes = JSON.parse(localStorage.getItem('quotes')),
            quotes = restoreQuotes.quotes,
            list = $('.quote-elem'),
            target = $(e.target).parent(),
            index = list.index(target);

        $.each(quotes, function (key) {
            if (index === key) {
                quotes.splice(key, 1);
                target.remove();
            }
        });

        localStorage.setItem('quotes', JSON.stringify(restoreQuotes));
    }

    return {
        init: function () {
            _setUpListeners();
        },
        show: function () {
            _showList();
        }
    }
}());


var QuoteAdd = (function(){
    var quoteList = {
        'quotes': [],
        'state': true
    };

    function _setUpListeners() {
        $('#addForm').on("submit", _saveQuoteList());
    }
    
    function _saveQuoteList(e) {
        e.preventDefault();

        var title = $('#quote-title').val(),
            author = $('#quote-author').val(),
            text = $('#quote-text').val();

        var restoreQuotes = JSON.parse(localStorage.getItem("quotes"));

        if (restoreQuotes.state){
            restoreQuotes.quotes.push({'title': title, 'author': author, 'text': text});
            localStorage.setItem('quotes', JSON.stringify(restoreQuotes));
        } else {
            quoteList.quotes.push({'title': title, 'author': author, 'text': text});
            localStorage.setItem('quotes', JSON.stringify(quoteList));
        }

        alert("done");
        $(':mobile-pagecontainer').pagecontainer('change', '#home');
    }

    return {
        init: function () {
            _setUpListeners();
        }
    }
}());