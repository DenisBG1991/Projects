(function () {

    var app = {
        initialize: function() {
            this.setUpListeners();
            this.updateResults();
        },
        setUpListeners: function() {
            /**
             * Изменение радиуса.
             */
            $("#increase-radius").on("click", $.proxy(this.increaseRadius, this));
            $("#reduce-radius").on("click", $.proxy(this.reduceRadius, this));
            /**
             * Изменение цвета фона и рамки.
             */
            $("#BGColor").on("change", $.proxy(this.changeBackgroundColor, this));
            $("#BorderColor").on("change", $.proxy(this.changeBorderColor, this));
        },
        CREATE : $(".create"),
        MAXRAD : 20,
        MINRAD : 0,
        increaseRadius: function () {
            var step = $("#step").val(),
                currentRadius = this.CREATE.css("border-radius"),
                newRadius = (parseInt(currentRadius) + parseInt(step));

            if (newRadius > this.MAXRAD){
                newRadius = this.MAXRAD;
                $("#increase-radius").addClass("disabled");
            }
            if (newRadius > this.MINRAD){
                $("#reduce-radius").removeClass("disabled");
            }

            this.CREATE.css({"border-radius" : newRadius});
            this.updateResults();
        },
        reduceRadius: function () {
            var step = $("#step").val(),
                currentRadius = this.CREATE.css("border-radius"),
                newRadius = (parseInt(currentRadius) - parseInt(step));

            if (newRadius < this.MINRAD){
                newRadius = this.MINRAD;
                $("#reduce-radius").addClass("disabled");
            }
            if (newRadius < this.MAXRAD){
                $("#increase-radius").removeClass("disabled");
            }

            this.CREATE.css({"border-radius" : newRadius});
            this.updateResults();
        },
        changeBackgroundColor: function () {
            var newColor = "#" + $("#BGColor").val();
            this.CREATE.css({
                "background-color" : newColor
            });
            this.updateResults();
        },
        changeBorderColor: function () {
            var newColor = "#" + $("#BorderColor").val();
            this.CREATE.css({
                "border-color" : newColor
            });
            this.updateResults();
        },
        updateResults: function () {
            var borderRad = this.CREATE.css("border-radius"),
                bgColor = this.CREATE.css("background-color"),
                brColor = this.CREATE.css("border-color"),
                codeResultArea = $("#code-result");
            codeResultArea.text(
                "-moz-border-radius: " + borderRad + ";\n" +
                "-webkit-border-radius: " + borderRad + ";\n" +
                "border-radius: " + borderRad + ";\n" +
                "background-color: " + bgColor + ";\n" +
                "border-color: " + brColor + ";"
            )
        }
    };

    app.initialize();
}());
