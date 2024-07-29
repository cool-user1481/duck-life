var PENSIZE, SELECTED_ELEM, OVERWRITE_ENABLED;
const userstrokeCanvas = document.createElement("canvas");
userstrokeCanvas.width = width, userstrokeCanvas.height = height;
const userstrokeCtx = userstrokeCanvas.getContext("2d", {
        alpha: !1
    }),
    CURSORS = [];
class Cursor {
    constructor(t) {
        this.x = 0, this.y = 0, this.prevX = 0, this.prevY = 0, this.documentX = 0, this.documentY = 0, this.isDown = !1, this.inCanvas = !1, this.canvas = t
    }
    canvasCursorDown(t, s) {
        this.isDown = !0, this.inCanvas = !0, this.prevX = t, this.prevY = s, this.x = t, this.y = s
    }
    canvasCursorMove(t) {
        if (!this.isDown) return;
        const s = t();
        this.x = s[0], this.y = s[1]
    }
    canvasCursorEnter(t, s) {
        if (this.inCanvas = !0, !this.isDown) return;
        const e = t(this),
            i = s(this);
        Cursor.interpolateCursorBorderPosition(e, i), this.prevX = i[0], this.prevY = i[1], this.x = e[0], this.y = e[1]
    }
    canvasCursorLeave(t) {
        if (this.inCanvas = !1, !this.isDown) return;
        const s = t(this);
        Cursor.interpolateCursorBorderPosition([this.prevX, this.prevY], s), this.x = s[0], this.y = s[1]
    }
    documentCursorMove(t) {
        if (!this.isDown) return;
        if (this.inCanvas) return;
        const s = t();
        this.documentX = s[0], this.documentY = s[1]
    }
    documentCursorUp() {
        this.isDown = !1
    }
    documentCursorDown(t, s) {
        if (t.target == onscreenCanvas) return;
        if (this.isDown) return;
        this.isDown = !0, this.inCanvas = !1, this.prevX = this.x, this.prevY = this.y;
        const e = s(this);
        this.documentX = e[0], this.documentY = e[1]
    }
    documentVisibilityChange(t) {}
    static interpolateCursorBorderPosition(t, s) {
        var e = t[1] - s[1],
            i = t[0] - s[0];
        0 === e && (e = .001), 0 === i && (i = .001);
        const n = e / i,
            o = t[1] - n * t[0];
        return s[0] < 0 ? (s[0] = 0, s[1] = o) : s[0] > MAX_X_IDX && (s[0] = MAX_X_IDX, s[1] = n * MAX_X_IDX + o), s[1] < 0 ? (s[1] = 0, s[0] = (0 - o) / n) : s[1] > MAX_Y_IDX && (s[1] = MAX_Y_IDX, s[0] = (MAX_Y_IDX - o) / n), s[0] = Math.floor(s[0]), s[1] = Math.floor(s[1]), s[0] = Math.max(Math.min(s[0], MAX_X_IDX), 0), s[1] = Math.max(Math.min(s[1], MAX_Y_IDX), 0), s
    }
    drawStroke() {
        if (!this.isDown) return;
        if (!this.inCanvas && this.prevX === this.x && this.prevY === this.y) return;
        const t = SELECTED_ELEM,
            s = OVERWRITE_ENABLED || t === BACKGROUND,
            e = 4278190080 !== t ? "rgba(" + (255 & t) + "," + ((65280 & t) >>> 8) + "," + ((16711680 & t) >>> 16) + ", 1)" : "rgba(1, 0, 0, 1)",
            i = Math.min(this.prevX, this.x),
            n = Math.max(this.prevX, this.x),
            o = this.prevX <= this.x ? this.prevY : this.y,
            r = this.prevX <= this.x ? this.y : this.prevY;
        this.prevX = this.x, this.prevY = this.y;
        const h = Math.ceil(PENSIZE / 2),
            u = i - h,
            a = Math.min(o, r) - h,
            c = i - u,
            v = o - a,
            f = n - u,
            C = r - a,
            d = f + PENSIZE + 2,
            M = Math.max(v, C) + PENSIZE + 2;
        userstrokeCanvas.width < d && (userstrokeCanvas.width = d), userstrokeCanvas.height < M && (userstrokeCanvas.height = M), userstrokeCtx.beginPath(), userstrokeCtx.rect(0, 0, d, M), userstrokeCtx.fillStyle = "rgba(0, 0, 0, 1)", userstrokeCtx.fill(), c === f && v === C ? (userstrokeCtx.beginPath(), userstrokeCtx.lineWidth = 0, userstrokeCtx.fillStyle = e, userstrokeCtx.arc(c, v, PENSIZE / 2, 0, TWO_PI), userstrokeCtx.fill()) : (userstrokeCtx.lineWidth = PENSIZE, userstrokeCtx.strokeStyle = e, userstrokeCtx.lineCap = "round", userstrokeCtx.beginPath(), userstrokeCtx.moveTo(c, v), userstrokeCtx.lineTo(f, C), userstrokeCtx.stroke());
        const D = userstrokeCtx.getImageData(0, 0, d, M),
            p = new Uint32Array(D.data.buffer);
        var m, l;
        const E = Math.max(0, -1 * u),
            X = Math.max(0, -1 * a),
            S = Math.min(d, width - u),
            I = Math.min(M, height - a);
        if (E > S || X > I) console.log("Bug in userstroke drawing");
        else
            for (l = X; l !== I; l++) {
                const e = (l + a) * width,
                    i = l * d;
                for (m = E; m !== S; m++) {
                    const n = m + u;
                    if (4278190080 !== p[m + i]) {
                        const i = n + e;
                        (s || gameImagedata32[i] === BACKGROUND) && (gameImagedata32[i] = t)
                    }
                }
            }
    }
}
class Mouse extends Cursor {
    constructor(t) {
        super(t), this.shiftStartX = 0, this.shiftStartY = 0, this.shiftPressed = !1, this.lineDirection = Mouse.NO_DIRECTION
    }
    canvasMouseDown(t) {
        const s = Mouse.getMousePos(t, !0, this.canvas);
        this.shiftPressed && !t.shiftKey && (this.shiftPressed = !1), this.shiftPressed && (this.shiftStartX = s[0], this.shiftStartY = s[1], this.lineDirection = Mouse.NO_DIRECTION), super.canvasCursorDown(s[0], s[1])
    }
    canvasMouseMove(t) {
        const s = this.canvas;
        super.canvasCursorMove((function() {
            return Mouse.getMousePos(t, !0, s)
        }))
    }
    canvasMouseEnter(t) {
        const s = this.canvas;
        super.canvasCursorEnter((function(e) {
            return Mouse.getMousePos(t, !0, s)
        }), (function(t) {
            return [t.documentX, t.documentY]
        })), this.isDown && this.shiftPressed && this.lineDirection === Mouse.NO_DIRECTION && (this.shiftStartX = this.prevX, this.shiftStartY = this.prevY)
    }
    canvasMouseLeave(t) {
        const s = this.canvas;
        super.canvasCursorLeave((function(e) {
            return Mouse.getMousePos(t, !1, s)
        }))
    }
    documentMouseMove(t) {
        if (t.target == onscreenCanvas) return;
        const s = this.canvas;
        super.documentCursorMove((function() {
            return Mouse.getMousePos(t, !1, s)
        }))
    }
    documentMouseUp(t) {
        this.lineDirection = Mouse.NO_DIRECTION, super.documentCursorUp()
    }
    documentMouseDown(t) {
        if (t.target == onscreenCanvas) return;
        const s = this.canvas;
        this.shiftPressed && !t.shiftKey && (this.shiftPressed = !1), this.shiftPressed && (this.lineDirection = Mouse.NO_DIRECTION), super.documentCursorDown(t, (function() {
            return Mouse.getMousePos(t, !1, s)
        }))
    }
    static getMousePos(t, s, e) {
        var i, n;
        return s ? (i = t.offsetX, n = t.offsetY, i < 0 ? i = 0 : i >= width && (i = MAX_X_IDX), n < 0 ? n = 0 : n >= height && (n = MAX_Y_IDX)) : (i = t.pageX - docOffsetLeft(e), n = t.pageY - docOffsetTop(e)), [Math.round(i), Math.round(n)]
    }
    documentKeyDown(t) {
        t.shiftKey && (this.shiftPressed || (this.shiftPressed = !0, this.lineDirection = Mouse.NO_DIRECTION, this.isDown && this.inCanvas && (this.shiftStartX = this.x, this.shiftStartY = this.y)))
    }
    documentKeyUp(t) {
        !t.shiftKey && this.shiftPressed && (this.shiftPressed = !1)
    }
    documentVisibilityChange(t) {
        "hidden" == document.visibilityState && (this.documentMouseUp(null), this.shiftPressed = !1), super.documentVisibilityChange(t)
    }
    handleShift() {
        if (!this.isDown) return !1;
        if (!this.shiftPressed) return !1;
        if (!this.inCanvas && this.prevX === this.x && this.prevY === this.y) return;
        if (this.lineDirection === Mouse.NO_DIRECTION) {
            if (!this.inCanvas) return !1;
            const t = this.x - this.shiftStartX,
                s = this.y - this.shiftStartY,
                e = Math.abs(t),
                i = Math.abs(s);
            if (Math.max(e, i) < 8) return !0;
            Math.abs(e - i) < 5 ? this.lineDirection = s * t < 0 ? Mouse.DIAGONAL_DOWN : Mouse.DIAGONAL_UP : this.lineDirection = e > i ? Mouse.HORIZONTAL : Mouse.VERTICAL
        }
        const t = this.lineDirection;
        if (t === Mouse.HORIZONTAL) this.prevY = this.shiftStartY, this.y = this.shiftStartY;
        else if (t === Mouse.VERTICAL) this.prevX = this.shiftStartX, this.x = this.shiftStartX;
        else if (t === Mouse.DIAGONAL_DOWN || t === Mouse.DIAGONAL_UP) {
            this.prevX = this.shiftStartX, this.prevY = this.shiftStartY;
            const s = t === Mouse.DIAGONAL_DOWN ? -1 : 1,
                e = this.shiftStartY - s * this.shiftStartX,
                i = s * this.x + e,
                n = (this.y - e) / s;
            distance(n, this.y, this.shiftStartX, this.shiftStartY) > distance(this.x, i, this.shiftStartX, this.shiftStartY) ? this.x = n : this.y = i
        }
        return !1
    }
    drawStroke() {
        this.handleShift() || super.drawStroke()
    }
}
class TouchCursor extends Cursor {
    constructor(t) {
        super(t)
    }
    canvasTouchStart(t) {
        const s = TouchCursor.getTouchPos(t);
        if (s) return super.canvasCursorDown(s[0], s[1]), t.preventDefault(), !1
    }
    canvasTouchEnd(t) {
        return super.documentCursorUp(), t.preventDefault(), !1
    }
    canvasTouchMove(t) {
        const s = TouchCursor.getTouchPos(t);
        if (!s) return;
        return super.canvasCursorMove((function() {
            return s
        })), t.preventDefault(), !1
    }
    static getTouchPos(t) {
        if (!t.touches) return null;
        const s = t.touches[0];
        if (!s) return null;
        const e = t.target.getBoundingClientRect();
        var i = Math.round(s.pageX - e.left - window.scrollX),
            n = Math.round(s.pageY - e.top - window.scrollY);
        return i < 0 ? i = 0 : i >= width && (i = MAX_X_IDX), n < 0 ? n = 0 : n >= height && (n = MAX_Y_IDX), [i, n]
    }
}

function initCursors() {
    PENSIZE = PEN_SIZES[DEFAULT_PEN_IDX], SELECTED_ELEM = WALL, OVERWRITE_ENABLED = !0, Mouse.NO_DIRECTION = 0, Mouse.HORIZONTAL = 1, Mouse.VERTICAL = 2, Mouse.DIAGONAL_UP = 3, Mouse.DIAGONAL_DOWN = 4;
    const t = new Mouse(onscreenCanvas);
    onscreenCanvas.onmousedown = function(s) {
        t.canvasMouseDown(s)
    }, onscreenCanvas.onmousemove = function(s) {
        t.canvasMouseMove(s)
    }, onscreenCanvas.onmouseleave = function(s) {
        t.canvasMouseLeave(s)
    }, onscreenCanvas.onmouseenter = function(s) {
        t.canvasMouseEnter(s)
    }, document.onmouseup = function(s) {
        t.documentMouseUp(s)
    }, document.onmousedown = function(s) {
        t.documentMouseDown(s)
    }, document.onmousemove = function(s) {
        t.documentMouseMove(s)
    }, document.onkeydown = function(s) {
        t.documentKeyDown(s)
    }, document.onkeyup = function(s) {
        t.documentKeyUp(s)
    }, document.onvisibilitychange = function(s) {
        t.documentVisibilityChange(s)
    };
    const s = new TouchCursor(onscreenCanvas);
    onscreenCanvas.addEventListener("touchstart", (function(t) {
        s.canvasTouchStart(t)
    })), onscreenCanvas.addEventListener("touchend", (function(t) {
        s.canvasTouchEnd(t)
    })), onscreenCanvas.addEventListener("touchmove", (function(t) {
        s.canvasTouchMove(t)
    })), CURSORS.push(t), CURSORS.push(s), Object.freeze(CURSORS)
}

function updateUserStroke() {
    const t = CURSORS.length;
    for (var s = 0; s !== t; s++) CURSORS[s].drawStroke()
}
