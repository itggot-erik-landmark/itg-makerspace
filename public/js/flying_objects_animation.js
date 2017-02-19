window.addEventListener("load", function () {
    var hammer = new FlyingAnimation("hammer", "left", 5, 45);
    var nails = new FlyingAnimation("nails", "left", 10, 30);
    var wrench = new FlyingAnimation("wrench", "right", 7, 60);
});
var FlyingAnimation = (function () {
    function FlyingAnimation(element, side, startTime, cycleTime) {
        var _this = this;
        this.side = "left";
        this.moveRightID = null;
        this.moveLeftID = null;
        this.item = element;
        startTime *= 1000;
        cycleTime *= 1000;
        this.side = side;
        setInterval(function () {
            if (_this.moveRightID == null && _this.moveLeftID == null) {
                if (_this.side == "left") {
                    _this.moveRight();
                }
                else if (_this.side == "right") {
                    _this.moveLeft();
                }
            }
        }, cycleTime);
        window.addEventListener("resize", function () {
            if (_this.side == "right") {
                document.getElementById(element).style.left = (window.innerWidth + 20).toString() + "px";
            }
        });
        setTimeout(function () {
            if (_this.side == "left") {
                _this.moveRight();
            }
            else if (_this.side == "right") {
                _this.moveLeft();
            }
        }, startTime);
    }
    FlyingAnimation.prototype.moveRight = function () {
        var _this = this;
        var elem = document.getElementById(this.item);
        var posX = -(elem.offsetHeight + 200);
        var speed = Math.random() + 1;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if (this.moveLeftID != null) {
            clearInterval(this.moveLeftID);
        }
        this.moveRightID = setInterval(function () {
            if (posX >= window.innerWidth + 40) {
                _this.side = "right";
                clearInterval(_this.moveRightID);
                _this.moveRightID = null;
            }
            else {
                posX += speed;
                elem.style.left = posX + 'px';
            }
        }, 1000 / 120);
    };
    FlyingAnimation.prototype.moveLeft = function () {
        var _this = this;
        var elem = document.getElementById(this.item);
        var leftLimit = -(elem.offsetHeight + 200);
        var posX = window.innerWidth + 40;
        var speed = Math.random() + 1;
        elem.style.top = (Math.floor(Math.random() * (window.innerHeight - elem.offsetHeight - 50)) + 50).toString() + "px";
        if (this.moveRightID != null) {
            clearInterval(this.moveRightID);
        }
        this.moveLeftID = setInterval(function () {
            if (posX <= leftLimit) {
                _this.side = "left";
                clearInterval(_this.moveLeftID);
                _this.moveLeftID = null;
            }
            else {
                posX -= speed;
                elem.style.left = posX + 'px';
            }
        }, 1000 / 120);
    };
    return FlyingAnimation;
}());
//# sourceMappingURL=flying_objects_animation.js.map