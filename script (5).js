(function() {
    $(document).mousemove(function(e) {
        $("#redImage").css({ left: e.pageX, top: e.pageY });
        $("#greenImage").css({ left: e.pageX, top: e.pageY });
    });
    var currentPlayer = "player1";

    $(".column").on("click", function(e) {
        var slots = $(".slot");
        var x = 5;
        var y = 7;

        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var j = slotsInCol.length - 1; j >= 0; j--) {
            if (
                !slotsInCol.eq(j).hasClass("player1") &&
                !slotsInCol.eq(j).hasClass("player2")
            ) {
                slotsInCol.eq(j).addClass(currentPlayer);
                break;
            }
        }
        if (j == -1) {
            alert("column is full! please select another column");
            return;
        }
        var slotsInRow = $(".row" + j);

        if (
            checkForVictory(slotsInCol) ||
            checkForVictory(slotsInRow) ||
            checkForDiagonal(slots, y) ||
            checkForDiagonal(slots, x)
        ) {
            victoryDance();
        }

        switchPlayer();
    });
    function checkForVictory(e) {
        var countE = 0;
        for (var i = 0; i < e.length; i++) {
            if (e.eq(i).hasClass(currentPlayer)) {
                countE++;
                if (countE == 4) {
                    return true;
                }
            } else {
                countE = 0;
            }
        }
    }

    function checkForDiagonal(slots, coor) {
        for (var p = 0; p < slots.length; p++) {
            if (
                slots.eq(p).hasClass(currentPlayer) &&
                slots.eq(p + coor).hasClass(currentPlayer) &&
                slots.eq(p + 2 * coor).hasClass(currentPlayer) &&
                slots.eq(p + 3 * coor).hasClass(currentPlayer)
            ) {
                return true;
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
            $(".playerball").addClass("player2ball");
            $(".playerball").removeClass("player1ball");
            $(".playerball").html("Go player 2!");
            $("#greenImage").removeAttr("style");
            $("#redImage").attr("style", "display: none");
        } else {
            currentPlayer = "player1";
            $(".playerball").addClass("player1ball");
            $(".playerball").removeClass("player2ball");
            $("#redImage").removeAttr("style");
            $("#greenImage").attr("style", "display: none");
            $(".playerball").html("Go player 1!");
        }
    }
    function victoryDance() {
        $(".playerball").remove();
        $(".congratulation").html(
            "congratiulations! " + currentPlayer + " won!!!"
        );
        $(".victory-banner").removeAttr("style");
    }
})();
