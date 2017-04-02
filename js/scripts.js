$(function() {
    // Zmienne
    /*var table = {
        name: 'projekt',
        element: $('div').addClass()
    };*/
    var column = {
        id: '12j82da20k',
        name: 'todo',
        element: $('div')
    };
    var card = {
        id: '2kd8s958ka',
        description: 'Create Kanban app',
        color: 'green',
        element: $('div')
    };

    var board = {
        name: 'Tablica Kanban',
        createColumn: function(column) {
            this.element.append(column.element);
            initSortable();
        },
        element: $('#board .column-container')
    };

    function initSortable() {
        $('.card-list').sortable({
            connectWith: '.card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-column')
        .click(function(){
            board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
        });

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
        var str = '', i;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = createColumn();

        function createColumn() {
            // TWORZENIE NOWYCH WĘZŁÓW
            var column = $('<div class="column col-md-3"></div>');
            var columnTitle = $('<h2 class="column-title text-center">' + self.name + '</h2>');
            var columnCardList = $('<ul class="card-list"></ul>');
            var columnDelete = $('<button class="btn btn-danger"><p>x</p></button>');
            var columnAddCard = $('<button class="column-add-card btn btn-success">Dodaj kartę</button>');

            // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
            columnDelete.click(function() {
                self.deleteColumn();
            });

            columnAddCard.click(function(event) {
                event.preventDefault();
                self.createCard(new Card(prompt("Wpisz nazwę karty")));
            });

            // KONSTRUOWANIE ELEMENTU KOLUMNY
            column.append(columnTitle)
                .append(columnDelete)
                .append(columnAddCard)
                .append(columnCardList);
            return column;
        }
    }
    Column.prototype = {
        createCard: function(card) {
            this.element.children('ul').append(card.element);
        },
        deleteColumn: function() {
            this.element.remove();
        }
    };

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = createCard();

        function createCard() {
            var card = $('<li class="card"></li>');
            var cardDeleteBtn = $('<button class="btn btn-danger"><p>x</p></button>');
            var cardDescription = $('<p class="card-description"></p>');

            cardDeleteBtn.click(function(){
                self.removeCard();
            });

            card.append(cardDeleteBtn);
            cardDescription.text(self.description);
            card.append(cardDescription)
            return card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.element.remove();
        }
    };




    // TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie');
    var doneColumn = new Column('Skończone');

    // DODAWANIE KOLUMN DO TABLICY
    board.createColumn(todoColumn);
    board.createColumn(doingColumn);
    board.createColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('Nowe zadanie');
    var card2 = new Card('stworzyc tablice kanban');

    // DODAWANIE KART DO KOLUMN
    todoColumn.createCard(card1);
    doingColumn.createCard(card2);
});