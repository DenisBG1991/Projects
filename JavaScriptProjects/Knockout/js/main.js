/*
function AppViewModel() {
    this.firstName = ko.observable("Denis");
    this.lastName = ko.observable("Boriskov");
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

    this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
}

ko.applyBindings(new AppViewModel());
*/
/**=========================================================================**/
/*
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";
    });
}

function ReservationsViewModel() {
    var self = this;

    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];

    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[0])
    ]);

    self.addSeat = function() {
        self.seats.push(new SeatReservation("", self.availableMeals[0]));
    };

    self.removeSeat = function(seat) {
        self.seats.remove(seat);
    };

    self.totalSurcharge = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < self.seats().length; i++)
            total += self.seats()[i].meal().price;
        return total;
    });
}

ko.applyBindings(new ReservationsViewModel());
*/
/**=========================================================================**/
/*
function WebmailViewModel() {
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable('');
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();
    self.goToFolder = function(folder) {
        self.chosenFolderId(folder);
        self.chosenMailData(null);
        $.get('/mail', { folder: folder }, self.chosenFolderData);

    };
    self.goToMail = function(mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null); // Stop showing a folder
        $.get("/mail", { mailId: mail.id }, self.chosenMailData);
    };
    self.goToFolder('Inbox');
}

ko.applyBindings(new WebmailViewModel());
*/
/**=========================================================================**/
/*
ko.bindingHandlers.starRating = {
    init: function(element, valueAccessor) {
        $(element).addClass("starRating");
        for (var i = 0; i < 5; i++)
            $("<span>").appendTo(element);
    },
    update: function(element, valueAccessor) {
        var observable = valueAccessor();
        $("span", element).each(function(index) {
            $(this).toggleClass("chosen", index < observable());
        });
        $("span", element).each(function(index) {
            $(this).hover(
                function() { $(this).prevAll().add(this).addClass("hoverChosen") },
                function() { $(this).prevAll().add(this).removeClass("hoverChosen") }
            ).click(function() {
                var observable = valueAccessor();  // Get the associated observable
                observable(index+1);               // Write the new rating to it
            });
        });
    }
};

ko.bindingHandlers.jqButton = {
    init: function(element) {
        $(element).button(); // Turns the element into a jQuery UI button
    },
    update: function(element, valueAccessor) {
        var currentValue = valueAccessor();
        // Here we just update the "disabled" state, but you could update other properties too
        $(element).button("option", "disabled", currentValue.enable === false);
    }
};

ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: function(element, valueAccessor) {
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }
};

function Answer(text) {
    this.answerText = text; this.points = ko.observable(1);
}

function SurveyViewModel(question, pointsBudget, answers) {
    this.question = question;
    this.pointsBudget = pointsBudget;
    this.answers = $.map(answers, function(text) { return new Answer(text) });
    this.save = function() { alert('To do') };

    this.pointsUsed = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < this.answers.length; i++)
            total += this.answers[i].points();
        return total;
    }, this);
}

ko.applyBindings(new SurveyViewModel("Which factors affect your technology choices?", 10, [
    "Functionality, compatibility, pricing - all that boring stuff",
    "How often it is mentioned on Hacker News",
    "Number of gradients/dropshadows on project homepage",
    "Totally believable testimonials on project homepage"
]));
*/
/**=========================================================================**/
function Task(data) {
    this.title = ko.observable(data.title);
    this.isDone = ko.observable(data.isDone);
}

function TaskListViewModel() {
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
    self.incompleteTasks = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() && !task._destroy });
    });

    self.addTask = function() {
        self.tasks.push(new Task({ title: this.newTaskText() }));
        self.newTaskText("");
    };
    self.removeTask = function(task) {
        self.tasks.destroy(task)
    };

    $.getJSON("/tasks", function(allData) {
        var mappedTasks = $.map(allData, function(item) { return new Task(item) });
        self.tasks(mappedTasks);
    });

    self.save = function() {
        $.ajax("/tasks", {
            data: ko.toJSON({ tasks: self.tasks }),
            type: "post", contentType: "application/json",
            success: function(result) { alert(result) }
        });
    };
}

ko.applyBindings(new TaskListViewModel());