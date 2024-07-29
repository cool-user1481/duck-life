var __next_elem_idx = 0;

function __inGameColor(a, e, n) {
    a &= 252, e &= 252, n &= 252;
    const t = 3 & __next_elem_idx,
        o = (12 & __next_elem_idx) >>> 2,
        d = (48 & __next_elem_idx) >>> 4;
    return __next_elem_idx++, 4278190080 + ((n += d) << 16) + ((e += o) << 8) + (a += t)
}
const BACKGROUND = __inGameColor(0, 0, 0),
    WALL = __inGameColor(127, 127, 127),
    SAND = __inGameColor(223, 193, 99),
    WATER = __inGameColor(0, 10, 255),
    PLANT = __inGameColor(0, 220, 0),
    FIRE = __inGameColor(255, 0, 10),
    SALT = __inGameColor(253, 253, 253),
    SALT_WATER = __inGameColor(127, 175, 255),
    OIL = __inGameColor(150, 60, 0),
    SPOUT = __inGameColor(117, 189, 252),
    WELL = __inGameColor(131, 11, 28),
    TORCH = __inGameColor(200, 5, 0),
    GUNPOWDER = __inGameColor(170, 170, 140),
    WAX = __inGameColor(239, 225, 211),
    FALLING_WAX = __inGameColor(240, 225, 211),
    NITRO = __inGameColor(0, 150, 26),
    NAPALM = __inGameColor(220, 128, 70),
    C4 = __inGameColor(240, 230, 150),
    CONCRETE = __inGameColor(180, 180, 180),
    FUSE = __inGameColor(219, 175, 199),
    ICE = __inGameColor(161, 232, 255),
    CHILLED_ICE = __inGameColor(20, 153, 220),
    LAVA = __inGameColor(245, 110, 40),
    ROCK = __inGameColor(68, 40, 8),
    STEAM = __inGameColor(195, 214, 235),
    CRYO = __inGameColor(0, 213, 255),
    MYSTERY = __inGameColor(162, 232, 196),
    METHANE = __inGameColor(140, 140, 140),
    SOIL = __inGameColor(120, 75, 33),
    WET_SOIL = __inGameColor(70, 35, 10),
    BRANCH = __inGameColor(166, 128, 100),
    LEAF = __inGameColor(82, 107, 45),
    POLLEN = __inGameColor(230, 235, 110),
    CHARGED_NITRO = __inGameColor(245, 98, 78),
    ACID = __inGameColor(157, 240, 40),
    THERMITE = __inGameColor(195, 140, 70),
    BURNING_THERMITE = __inGameColor(255, 130, 130),
    RETRON_MAT = __inGameColor(102, 153, 255),
    OBSIDIAN = __inGameColor(27, 24, 41),
  SNOT = __inGameColor(0, 0, 0),
  THE_ROck = __inGameColor(0, 0, 0)
    elements = new Uint32Array([BACKGROUND, WALL, SAND, WATER, PLANT, FIRE, SALT, SALT_WATER, OIL, SPOUT, WELL, TORCH, GUNPOWDER, WAX, FALLING_WAX, NITRO, NAPALM, C4, CONCRETE, FUSE, ICE, CHILLED_ICE, LAVA, ROCK, STEAM, CRYO, MYSTERY, METHANE, SOIL, WET_SOIL, BRANCH, LEAF, POLLEN, CHARGED_NITRO, ACID, THERMITE, BURNING_THERMITE, RETRON_MAT, OBSIDIAN, SNOT, THE_ROCK]),
    elementActions = [BACKGROUND_ACTION, WALL_ACTION, SAND_ACTION, WATER_ACTION, PLANT_ACTION, FIRE_ACTION, SALT_ACTION, SALT_WATER_ACTION, OIL_ACTION, SPOUT_ACTION, WELL_ACTION, TORCH_ACTION, GUNPOWDER_ACTION, WAX_ACTION, FALLING_WAX_ACTION, NITRO_ACTION, NAPALM_ACTION, C4_ACTION, CONCRETE_ACTION, FUSE_ACTION, ICE_ACTION, CHILLED_ICE_ACTION, LAVA_ACTION, ROCK_ACTION, STEAM_ACTION, CRYO_ACTION, MYSTERY_ACTION, METHANE_ACTION, SOIL_ACTION, WET_SOIL_ACTION, BRANCH_ACTION, LEAF_ACTION, POLLEN_ACTION, CHARGED_NITRO_ACTION, ACID_ACTION, THERMITE_ACTION, BURNING_THERMITE_ACTION, RETRON_MAT_ACTION, OBSIDIAN_ACTION, SNOT_ACTION, THE_ROCK_ACTION];
Object.freeze(elementActions);
const GAS_PERMEABLE = {},
    NUM_ELEMENTS = elements.length;

function initElements() {
    if (NUM_ELEMENTS > 64) throw "too many elements (we only use 6 bits for element index)";
    if (NUM_ELEMENTS !== elementActions.length) throw "need 1 action per element";
    const a = {};
    for (var e = 0; e < elements.length; e++) {
        const n = elements[e];
        if (((196608 & n) >>> 12) + ((768 & n) >>> 6) + (3 & n) !== e) throw "elements array order does not match element indices";
        if (n in a) throw "duplicate color";
        if (n >>> 24 != 255) throw console.log(n, e), "alpha must be set to 0xff";
        a[n] = null
    }
    GAS_PERMEABLE[SAND] = null, GAS_PERMEABLE[WATER] = null, GAS_PERMEABLE[SALT] = null, GAS_PERMEABLE[SALT_WATER] = null, GAS_PERMEABLE[OIL] = null, GAS_PERMEABLE[GUNPOWDER] = null, GAS_PERMEABLE[FALLING_WAX] = null, GAS_PERMEABLE[NITRO] = null, GAS_PERMEABLE[NAPALM] = null, GAS_PERMEABLE[CONCRETE] = null, GAS_PERMEABLE[ROCK] = null, GAS_PERMEABLE[CRYO] = null, GAS_PERMEABLE[MYSTERY] = null, GAS_PERMEABLE[SOIL] = null, GAS_PERMEABLE[WET_SOIL] = null, GAS_PERMEABLE[POLLEN] = null, GAS_PERMEABLE[CHARGED_NITRO] = null, GAS_PERMEABLE[ACID] = null, GAS_PERMEABLE[SNOT] = null, Object.freeze(GAS_PERMEABLE)
}

function WALL_ACTION(a, e, n) {}

function OBSIDIAN_ACTION(a, e, n) {}

function BACKGROUND_ACTION(a, e, n) {
    throw "As an optimization, we should never be invoking the action for the background"
}

function SAND_ACTION(a, e, n) {
    if (e !== MAX_Y_IDX && uniformBelowAdjacent(a, e, n) !== SAND) {
        if (doDensitySink(a, e, n, WATER, !0, 25)) return;
        if (doDensitySink(a, e, n, SALT_WATER, !0, 25)) return
    }
    doGravity(a, e, n, !0, 95)
}

function WATER_ACTION(a, e, n) {
    doGravity(a, e, n, !0, 95) || doDensityLiquid(a, e, n, OIL, 25, 50)
}

function PLANT_ACTION(a, e, n) {
    if (doGrow(a, e, n, WATER, 50), random() < 5) {
        if (-1 !== bordering(a, e, n, SALT)) return void(gameImagedata32[n] = BACKGROUND)
    }
}

function FIRE_ACTION(a, e, n) {
    if (random() < 80) {
        var t = bordering(a, e, n, WATER);
        if (-1 === t && (t = bordering(a, e, n, SALT_WATER)), -1 !== t && -1 === bordering(a, e, n, BURNING_THERMITE)) return gameImagedata32[t] = STEAM, void(gameImagedata32[n] = BACKGROUND)
    }
    if (random() < 20) {
        const t = borderingAdjacent(a, e, n, PLANT);
        if (-1 !== t) return void(gameImagedata32[t] = FIRE)
    }
    if (random() < 1) {
        const t = bordering(a, e, n, WAX);
        if (-1 !== t) {
            const o = fastItoXYBordering(a, e, n, t);
            gameImagedata32[t] = FIRE;
            const d = below(Math.max(e, o[1]), Math.max(n, t), BACKGROUND);
            return void(-1 !== d && (gameImagedata32[d] = FALLING_WAX))
        }
    }
    if (random() < 80) {
        const t = borderingAdjacent(a, e, n, FUSE);
        if (-1 !== t) return void(gameImagedata32[t] = FIRE)
    }
    if (random() < 40) {
        var o = !0;
        const t = Math.max(a - 1, 0),
            r = Math.max(e - 1, 0),
            m = Math.min(a + 2, MAX_X_IDX + 1),
            A = Math.min(e + 2, MAX_Y_IDX + 1);
        var d, i;
        for (i = r; i !== A; i++) {
            const n = i * width;
            for (d = t; d !== m; d++) {
                if (i === e && d === a) continue;
                const t = gameImagedata32[n + d];
                if (t !== FIRE) {
                    if (t === PLANT || t === FUSE || t === BRANCH || t === LEAF) {
                        o = !1;
                        break
                    }
                    if ((d == a || i == e) && t === WAX) {
                        o = !1;
                        break
                    }
                    if (t === OIL && random() < 50) {
                        o = !1;
                        break
                    }
                }
            }
            if (!o) break
        }
        if (o) return void(gameImagedata32[n] = BACKGROUND)
    }
    if (random() < 50) {
        const a = above(e, n, BACKGROUND);
        if (-1 !== a) return void(gameImagedata32[a] = FIRE)
    }
}

function SALT_ACTION(a, e, n) {
    doGravity(a, e, n, !0, 95) || doTransform(a, e, n, WATER, SALT_WATER, 25, 50) || doDensitySink(a, e, n, SALT_WATER, !0, 25)
}

function SALT_WATER_ACTION(a, e, n) {
    doGravity(a, e, n, !0, 95) || doDensityLiquid(a, e, n, WATER, 50, 50)
}

function OIL_ACTION(a, e, n) {
    random() < 30 && -1 !== bordering(a, e, n, FIRE) ? __doBorderBurn(a, e, n) : doGravity(a, e, n, !0, 95)
}

function SPOUT_ACTION(a, e, n) {
    doProducer(a, e, n, WATER, !1, 5)
}

function WELL_ACTION(a, e, n) {
    doProducer(a, e, n, OIL, !1, 10)
}

function TORCH_ACTION(a, e, n) {
    doProducer(a, e, n, FIRE, !0, 25)
}

function GUNPOWDER_ACTION(a, e, n) {
    if (random() < 95 && -1 !== bordering(a, e, n, FIRE))
        if (random() < 1 && random() < 25 && particles.particleCounts[MAGIC1_PARTICLE] < 30) {
            const t = particles.addActiveParticle(UNKNOWN_PARTICLE, a, e, n);
            t && (t.setColor(FIRE), particles.reinitializeParticle(t, MAGIC1_PARTICLE))
        } else __doGunpowderExplosion(a, e, n);
    else doGravity(a, e, n, !0, 95)
}

function WAX_ACTION(a, e, n) {}

function RETRON_MAT_ACTION(a, e, n) {}

function FALLING_WAX_ACTION(a, e, n) {
    doGravity(a, e, n, !1, 100) || (gameImagedata32[n] = WAX)
}

function NITRO_ACTION(a, e, n) {
    if (!doGravity(a, e, n, !0, 95) && !surroundedByAdjacent(a, e, n, NITRO)) {
        if (-1 !== borderingAdjacent(a, e, n, FIRE)) {
            if (random() < 30) {
                if (!particles.addActiveParticle(NITRO_PARTICLE, a, e, n)) return;
                return void __doBorderBurn(a, e, n)
            }
            if (random() < 20) return void(gameImagedata32[n] = FIRE)
        }
        if (e !== MAX_Y_IDX && uniformBelowAdjacent(a, e, n) !== NITRO) {
            if (doDensitySink(a, e, n, OIL, !0, 25)) return;
            if (doDensitySink(a, e, n, WATER, !0, 25)) return;
            if (doDensitySink(a, e, n, SALT_WATER, !0, 25)) return;
            if (doDensitySink(a, e, n, POLLEN, !0, 25)) return
        }
    }
}

function NAPALM_ACTION(a, e, n) {
    random() < 25 && -1 !== bordering(a, e, n, FIRE) ? particles.addActiveParticle(NAPALM_PARTICLE, a, e, n) || (gameImagedata32[n] = FIRE) : doGravity(a, e, n, !0, 95)
}

function C4_ACTION(a, e, n) {
    random() < 60 && -1 !== bordering(a, e, n, FIRE) && (particles.addActiveParticle(C4_PARTICLE, a, e, n) || (gameImagedata32[n] = FIRE))
}

function CONCRETE_ACTION(a, e, n) {
    if (e !== MAX_Y_IDX && uniformBelowAdjacent(a, e, n) !== CONCRETE) {
        if (doDensitySink(a, e, n, WATER, !0, 35)) return;
        if (doDensitySink(a, e, n, SALT_WATER, !0, 35)) return
    }
    if (random() < 10 && random() < 10) {
        if (-1 !== borderingAdjacent(a, e, n, WALL)) return void(gameImagedata32[n] = WALL)
    }
    doGravity(a, e, n, !0, 95) || random() < 10 && random() < 10 && random() < 5 && (gameImagedata32[n] = WALL)
}

function FUSE_ACTION(a, e, n) {}

function ICE_ACTION(a, e, n) {
    if (!surroundedBy(a, e, n, ICE))
        if (random() < 1 && -1 !== bordering(a, e, n, WATER)) gameImagedata32[n] = WATER;
        else {
            if (random() < 70) {
                const t = bordering(a, e, n, STEAM);
                if (-1 !== t) return gameImagedata32[n] = WATER, void(random() < 50 && (gameImagedata32[t] = WATER))
            }
            if (random() < 10) {
                var t = bordering(a, e, n, SALT);
                if (-1 === t && (t = bordering(a, e, n, SALT_WATER)), -1 !== t) return void(gameImagedata32[n] = WATER)
            }(random() < 50 && -1 !== bordering(a, e, n, FIRE) || random() < 50 && -1 !== bordering(a, e, n, LAVA)) && (gameImagedata32[n] = WATER)
        }
}

function CHILLED_ICE_ACTION(a, e, n) {
    random() < 6 ? gameImagedata32[n] = ICE : -1 === bordering(a, e, n, SALT) && -1 === bordering(a, e, n, SALT_WATER) && -1 === bordering(a, e, n, LAVA) && -1 === bordering(a, e, n, FIRE) && -1 === bordering(a, e, n, STEAM) ? doGrow(a, e, n, WATER, 50) : gameImagedata32[n] = ICE
}
const __lava_immune = [LAVA, BACKGROUND, FIRE, WALL, ROCK, WATER, SALT_WATER, STEAM, OBSIDIAN];
Object.freeze(__lava_immune);
const __num_lava_immune = __lava_immune.length;

function LAVA_ACTION(a, e, n) {
    if (doTransform(a, e, n, WATER, OBSIDIAN, 100, 100)) return;
    const t = 0 !== e ? n - width : -1,
        o = e !== MAX_Y_IDX ? n + width : -1,
        d = 0 !== a ? n - 1 : -1,
        i = a !== MAX_X_IDX ? n + 1 : -1;
    var r = !0;
    if ((-1 !== t && gameImagedata32[t] !== LAVA || -1 !== d && gameImagedata32[d] !== LAVA && gameImagedata32[d] !== BACKGROUND || -1 !== i && gameImagedata32[i] !== LAVA && gameImagedata32[i] !== BACKGROUND || -1 !== o && gameImagedata32[o] !== LAVA && gameImagedata32[o] !== BACKGROUND) && (r = !1), !r) {
        if (random() < 4) {
            const t = particles.particleCounts[LAVA_PARTICLE] < 10 ? 100 : 35;
            if (random() < t && -1 !== bordering(a, e, n, OIL)) return particles.addActiveParticle(LAVA_PARTICLE, a, e, n), void(gameImagedata32[n] = BACKGROUND)
        }
        if (random() < 25) {
            const a = [t, o, d, i],
                e = a.length;
            var m, A;
            for (m = 0; m !== e; m++) {
                const e = a[m];
                if (-1 === e) continue;
                const n = gameImagedata32[e];
                var I = !0;
                for (A = 0; A !== __num_lava_immune; A++)
                    if (n === __lava_immune[A]) {
                        I = !1;
                        break
                    } I && (gameImagedata32[e] = FIRE)
            }
        }
        if (random() < 6 && -1 !== t && gameImagedata32[t] === BACKGROUND && (gameImagedata32[t] = FIRE), -1 !== o) {
            const a = gameImagedata32[o];
            if (a === FIRE) gameImagedata32[o] = BACKGROUND;
            else if (a === STEAM && random() < 95) return gameImagedata32[o] = LAVA, void(gameImagedata32[n] = STEAM)
        }
        random() < 15 && (-1 !== d && gameImagedata32[d] === FIRE && (gameImagedata32[d] = BACKGROUND), -1 !== i && gameImagedata32[i] === FIRE && (gameImagedata32[i] = BACKGROUND))
    }
    doGravity(a, e, n, !0, 100)
}

function ROCK_ACTION(a, e, n) {
    if (e !== MAX_Y_IDX && uniformBelowAdjacent(a, e, n) !== ROCK) {
        if (doDensitySink(a, e, n, WATER, !1, 95)) return;
        if (doDensitySink(a, e, n, OIL, !1, 95)) return;
        if (doDensitySink(a, e, n, SALT_WATER, !1, 95)) return;
        if (doDensitySink(a, e, n, LAVA, !1, 20)) return
    }
    if (!doGravity(a, e, n, !1, 99) && random() < 1 && random() < 20 && -1 !== above(e, n, OIL)) {
        const a = above(e, n, OIL);
        if (-1 !== a) return void(random() < 50 ? gameImagedata32[a] = METHANE : gameImagedata32[n] = METHANE)
    }
}

function STEAM_ACTION(a, e, n) {
    doDensityGas(a, e, n, 70) || doRise(a, e, n, 70, 60) || (random() < 5 && -1 !== bordering(a, e, n, WATER) ? gameImagedata32[n] = WATER : random() < 5 && random() < 40 && -1 !== below(e, n, BACKGROUND) && -1 === above(e, n, BACKGROUND) ? random() < 30 ? gameImagedata32[n] = WATER : gameImagedata32[n] = BACKGROUND : random() < 5 && -1 !== bordering(a, e, n, SPOUT) ? gameImagedata32[n] = WATER : random() < 1 && random() < 5 && -1 === below(e, n, STEAM) && (gameImagedata32[n] = BACKGROUND))
}

function CRYO_ACTION(a, e, n) {
    const t = Math.max(a - 1, 0),
        o = Math.max(e - 1, 0),
        d = Math.min(a + 2, MAX_X_IDX + 1),
        i = Math.min(e + 2, MAX_Y_IDX + 1);
    var r, m;
    for (m = o; m !== i; m++) {
        const o = m * width;
        for (r = t; r !== d; r++) {
            if (m === e && r === a) continue;
            const t = o + r,
                d = gameImagedata32[t];
            if (d !== CRYO) {
                if (d === CHILLED_ICE && random() < 1 && random() < 5) return void(gameImagedata32[n] = CHILLED_ICE);
                if (d === WALL || d === SPOUT || d === WAX || d === WELL || d === FUSE || d === PLANT || d === C4) return void(gameImagedata32[n] = CHILLED_ICE);
                if (d === WATER || d === ICE) return gameImagedata32[t] = CHILLED_ICE, void(gameImagedata32[n] = CHILLED_ICE);
                if (d === LAVA) return gameImagedata32[n] = BACKGROUND, void(gameImagedata32[t] = ROCK)
            }
        }
    }
    doGravity(a, e, n, !0, 95) || random() < 1 && random() < 50 && -1 === bordering(a, e, n, BACKGROUND) && !surroundedBy(a, e, n, CRYO) && (gameImagedata32[n] = CHILLED_ICE)
}

function MYSTERY_ACTION(a, e, n) {
    if (particles.particleActive(MAGIC1_PARTICLE) || particles.particleActive(MAGIC2_PARTICLE)) gameImagedata32[n] = BACKGROUND;
    else if (!(doGravity(a, e, n, !0, 95) || random() < 50)) {
        if (-1 !== borderingAdjacent(a, e, n, SAND)) return particles.addActiveParticle(MAGIC1_PARTICLE, a, e, n), void(gameImagedata32[n] = BACKGROUND);
        if (-1 !== borderingAdjacent(a, e, n, SALT)) return particles.addActiveParticle(MAGIC2_PARTICLE, a, e, n), void(gameImagedata32[n] = BACKGROUND);
        if (-1 !== bordering(a, e, n, FIRE))
            for (var t = MAX_IDX; 0 !== t; t--) {
                const a = gameImagedata32[t];
                if (a === WALL) continue;
                if (a === FIRE) {
                    gameImagedata32[t] = BACKGROUND;
                    continue
                }
                if (a === MYSTERY) {
                    gameImagedata32[t] = BACKGROUND;
                    continue
                }
                const e = Math.floor(Math.random() * t),
                    n = gameImagedata32[e];
                n !== WALL && n !== FIRE && n !== MYSTERY && (gameImagedata32[t] = n, gameImagedata32[e] = a)
            }
        return -1 !== bordering(a, e, n, POLLEN) ? (particles.addActiveParticle(NUKE_PARTICLE, a, e, n), void(gameImagedata32[n] = BACKGROUND)) : void 0
    }
}

function METHANE_ACTION(a, e, n) {
    random() < 25 && -1 !== bordering(a, e, n, FIRE) ? particles.addActiveParticle(METHANE_PARTICLE, a, e, n) || (gameImagedata32[n] = FIRE) : doRise(a, e, n, 25, 65) || doDensityGas(a, e, n, 70)
}

function SOIL_ACTION(a, e, n) {
    if (!doGravity(a, e, n, !1, 99)) {
        if (e !== MAX_Y_IDX && uniformBelowAdjacent(a, e, n) !== SOIL) {
            if (doDensitySink(a, e, n, WATER, !0, 50)) return;
            if (doDensitySink(a, e, n, SALT_WATER, !0, 50)) return;
            if (doDensitySink(a, e, n, POLLEN, !0, 50)) return
        }
        if (!doTransform(a, e, n, NITRO, CHARGED_NITRO, 25, 100) && random() < 15) {
            const t = aboveAdjacent(a, e, n, WATER);
            if (-1 !== t) return gameImagedata32[t] = BACKGROUND, void(gameImagedata32[n] = WET_SOIL)
        }
    }
}

function WET_SOIL_ACTION(a, e, n) {
    if (random() < 15) {
        const t = aboveAdjacent(a, e, n, WATER); - 1 !== t && (gameImagedata32[t] = BACKGROUND)
    }
    if (!doGravity(a, e, n, !1, 99) && !doDensitySink(a, e, n, WATER, !0, 50) && !doDensitySink(a, e, n, SALT_WATER, !0, 50) && random() < 5) {
        if (random() < 97) return void(-1 === borderingAdjacent(a, e, n, WATER) && (gameImagedata32[n] = SOIL));
        if (random() < 35) return; - 1 === aboveAdjacent(a, e, n, BACKGROUND) || -1 === belowAdjacent(a, e, n, SOIL) && -1 === belowAdjacent(a, e, n, WALL) || particles.addActiveParticle(TREE_PARTICLE, a, e, n) && (gameImagedata32[n] = SOIL)
    }
}

function BRANCH_ACTION(a, e, n) {
    random() < 3 && -1 !== borderingAdjacent(a, e, n, FIRE) && (gameImagedata32[n] = FIRE)
}

function LEAF_ACTION(a, e, n) {
    if (random() < 5 && -1 !== borderingAdjacent(a, e, n, FIRE) && (gameImagedata32[n] = FIRE), random() < 20) {
        if (-1 !== borderingAdjacent(a, e, n, SALT)) return void(gameImagedata32[n] = BACKGROUND)
    }
    random() < 1 && random() < 9 && doProducer(a, e, n, POLLEN, !1, 100)
}

function POLLEN_ACTION(a, e, n) {
    doGravity(a, e, n, !0, 95)
}

function CHARGED_NITRO_ACTION(a, e, n) {
    if (!doGravity(a, e, n, !0, 95)) {
        if (e !== MAX_Y_IDX && uniformBelowAdjacent(a, e, n) !== CHARGED_NITRO) {
            if (doDensitySink(a, e, n, SOIL, !0, 25)) return;
            if (doDensitySink(a, e, n, WET_SOIL, !0, 25)) return;
            if (doDensitySink(a, e, n, NITRO, !0, 25)) return;
            if (doDensitySink(a, e, n, POLLEN, !0, 25)) return
        }
        return -1 !== borderingAdjacent(a, e, n, FIRE) ? (particles.addActiveParticle(CHARGED_NITRO_PARTICLE, a, e, n), void(gameImagedata32[n] = FIRE)) : void 0
    }
}

function ACID_ACTION(a, e, n) {
    if (random() < 10) {
        const d = e > 0 ? e - 1 : -1,
            i = e < MAX_Y_IDX ? e + 1 : -1,
            r = a > 0 ? a - 1 : -1,
            m = a < MAX_X_IDX ? a + 1 : -1,
            A = [r, m, a],
            I = [i, d, e];
        var t, o;
        for (random() < 50 && (A[0] = m, A[1] = r), random() < 50 && (I[0] = d, I[1] = i), o = 0; 3 !== o; o++) {
            const d = I[o];
            if (-1 === d) continue;
            if (random() < 25 && d !== i) continue;
            const r = d * width;
            for (t = 0; 3 !== t; t++) {
                const o = A[t];
                if (-1 === o) continue;
                if (d === e && o === a) continue;
                if (o !== a && d !== e) continue;
                const i = r + o,
                    m = gameImagedata32[i];
                if (m !== ACID && m !== BACKGROUND && m !== WATER && m !== SALT_WATER && m !== ICE && m !== CHILLED_ICE && m !== CRYO) return d !== e + 1 ? void(gameImagedata32[i] = BACKGROUND) : (gameImagedata32[n] = BACKGROUND, void((m !== WALL || random() < 75) && (gameImagedata32[i] = ACID)))
            }
        }
    }
    doDensityLiquid(a, e, n, WATER, 25, 30) || doDensityLiquid(a, e, n, SALT_WATER, 25, 30) || doGravity(a, e, n, !0, 100)
}

function THERMITE_ACTION(a, e, n) {
    surroundedByAdjacent(a, e, n, THERMITE) || (random() < 50 && -1 !== borderingAdjacent(a, e, n, FIRE) ? gameImagedata32[n] = BURNING_THERMITE : doDensitySink(a, e, n, WATER, !1, 95) || doDensitySink(a, e, n, SALT_WATER, !1, 95) || doDensitySink(a, e, n, OIL, !1, 95) || doGravity(a, e, n, !1, 99))
}

function BURNING_THERMITE_ACTION(a, e, n) {
    const t = [e > 0 ? n - width : -1, a > 0 ? n - 1 : -1, a < MAX_X_IDX ? n + 1 : -1];
    var o;
    for (o = 0; 3 !== o; o++) {
        const a = t[o];
        if (-1 === a) continue;
        const e = gameImagedata32[a];
        e !== THERMITE && e !== BURNING_THERMITE && e !== LAVA && e !== WALL && (gameImagedata32[a] = FIRE)
    }
    if (random() < 2 && random() < 7) return particles.addActiveParticle(CHARGED_NITRO_PARTICLE, a, e, n), void(gameImagedata32[n] = FIRE);
    if (random() < 2) return void(gameImagedata32[n] = FIRE);
    if (random() < 8) {
        const t = adjacent(a, n, WALL); - 1 !== t && (gameImagedata32[t] = BACKGROUND);
        const o = below(e, n, WALL); - 1 !== o && (gameImagedata32[o] = BACKGROUND)
    }
    const d = below(e, n, FIRE); - 1 !== d && (gameImagedata32[d] = BACKGROUND), doGravity(a, e, n, !1, 99) || doDensitySink(a, e, n, WATER, !1, 95) || doDensitySink(a, e, n, SALT_WATER, !1, 95) || doDensitySink(a, e, n, OIL, !1, 95)
}

function SNOT_ACTION(a, e, n) {
    if (random() < 10) {
        const d = e > 0 ? e - 1 : -1,
            i = e < MAX_Y_IDX ? e + 1 : -1,
            r = a > 0 ? a - 1 : -1,
            m = a < MAX_X_IDX ? a + 1 : -1,
            A = [r, m, a],
            I = [i, d, e];
        var t, o;
        for (random() < 50 && (A[0] = m, A[1] = r), random() < 50 && (I[0] = d, I[1] = i), o = 0; 3 !== o; o++) {
            const d = I[o];
            if (-1 === d) continue;
            if (random() < 25 && d !== i) continue;
            const r = d * width;
            for (t = 0; 3 !== t; t++) {
                const o = A[t];
                if (-1 === o) continue;
                if (d === e && o === a) continue;
                if (o !== a && d !== e) continue;
                const i = r + o,
                    m = gameImagedata32[i];
                if (m !== ACID && m !== BACKGROUND && m !== WATER && m !== SALT_WATER && m !== ICE && m !== CHILLED_ICE && m !== CRYO) return d !== e + 1 ? void(gameImagedata32[i] = BACKGROUND) : (gameImagedata32[n] = BACKGROUND, void((m !== WALL || random() < 75) && (gameImagedata32[i] = SNOT)))
            }
        }
    }

    function THE_ROCK_ACTION(a, e, n) {}

function __pickRandValid(a, e) {
    const n = -1 !== a,
        t = -1 !== e;
    return n && t ? random() < 50 ? a : e : n ? a : t ? e : -1
}

function below(a, e, n) {
    if (a === MAX_Y_IDX) return -1;
    const t = e + width;
    return gameImagedata32[t] === n ? t : -1
}

function belowAdjacent(a, e, n, t) {
    if (e === MAX_Y_IDX) return -1;
    const o = n + width;
    if (gameImagedata32[o] === t) return o;
    const d = o - 1,
        i = o + 1;
    return __pickRandValid(0 !== a && gameImagedata32[d] === t ? d : -1, a !== MAX_X_IDX && gameImagedata32[i] === t ? i : -1)
}

function above(a, e, n) {
    if (0 === a) return -1;
    const t = e - width;
    return gameImagedata32[t] === n ? t : -1
}

function aboveAdjacent(a, e, n, t) {
    if (0 === e) return -1;
    const o = n - width;
    if (gameImagedata32[o] === t) return o;
    const d = o - 1,
        i = o + 1;
    return __pickRandValid(0 !== a && gameImagedata32[d] === t ? d : -1, a !== MAX_X_IDX && gameImagedata32[i] === t ? i : -1)
}

function adjacent(a, e, n) {
    const t = e - 1,
        o = e + 1;
    return __pickRandValid(0 !== a && gameImagedata32[t] === n ? t : -1, a !== MAX_X_IDX && gameImagedata32[o] === n ? o : -1)
}

function bordering(a, e, n, t) {
    var o = -1;
    return e !== MAX_Y_IDX && (o = below(e, n, t)), -1 === o && (o = adjacent(a, n, t)), -1 === o && 0 !== e && (o = above(e, n, t)), o
}

function borderingAdjacent(a, e, n, t) {
    var o = -1;
    return e !== MAX_Y_IDX && (o = belowAdjacent(a, e, n, t)), -1 === o && (o = adjacent(a, n, t)), -1 === o && 0 !== e && (o = aboveAdjacent(a, e, n, t)), o
}

function surroundedBy(a, e, n, t) {
    return (e === MAX_Y_IDX || gameImagedata32[n + width] === t) && ((0 === e || gameImagedata32[n - width] === t) && ((0 === a || gameImagedata32[n - 1] === t) && (a === MAX_X_IDX || gameImagedata32[n + 1] === t)))
}

function surroundedByAdjacent(a, e, n, t) {
    const o = e === MAX_Y_IDX,
        d = 0 === e;
    if (!o && gameImagedata32[n + width] !== t) return !1;
    if (!d && gameImagedata32[n - width] !== t) return !1;
    if (0 !== a) {
        const a = n - 1;
        if (gameImagedata32[a] !== t) return !1;
        if (!d && gameImagedata32[a - width] !== t) return !1;
        if (!o && gameImagedata32[a + width] !== t) return !1
    }
    if (a !== MAX_X_IDX) {
        const a = n + 1;
        if (gameImagedata32[a] !== t) return !1;
        if (!d && gameImagedata32[a - width] !== t) return !1;
        if (!o && gameImagedata32[a + width] !== t) return !1
    }
    return !0
}

function surroundedByCount(a, e, n, t) {
    var o = 0;
    return e !== MAX_Y_IDX && gameImagedata32[n + width] === t && o++, 0 !== e && gameImagedata32[n - width] === t && o++, 0 !== a && gameImagedata32[n - 1] === t && o++, a !== MAX_X_IDX && gameImagedata32[n + 1] === t && o++, o
}

function surroundedByAdjacentCount(a, e, n, t) {
    const o = e === MAX_Y_IDX,
        d = 0 === e;
    var i = 0;
    if (o || gameImagedata32[n + width] !== t || i++, d || gameImagedata32[n - width] !== t || i++, 0 !== a) {
        const a = n - 1;
        gameImagedata32[a] === t && i++, d || gameImagedata32[a - width] !== t || i++, o || gameImagedata32[a + width] !== t || i++
    }
    if (a !== MAX_X_IDX) {
        const a = n + 1;
        gameImagedata32[a] === t && i++, d || gameImagedata32[a - width] !== t || i++, o || gameImagedata32[a + width] !== t || i++
    }
    return i
}

function doGravity(a, e, n, t, o) {
    return !(random() >= o) && (e === MAX_Y_IDX ? (gameImagedata32[n] = BACKGROUND, !0) : (-1 === (d = t ? belowAdjacent(a, e, n, BACKGROUND) : below(e, n, BACKGROUND)) && t && (d = adjacent(a, n, BACKGROUND)), -1 !== d && (gameImagedata32[d] = gameImagedata32[n], gameImagedata32[n] = BACKGROUND, !0)));
    var d
}

function doRise(a, e, n, t, o) {
    var d = -1;
    if (random() < t) {
        if (0 === e) return gameImagedata32[n] = BACKGROUND, !0;
        d = aboveAdjacent(a, e, n, BACKGROUND)
    }
    return -1 === d && random() < o && (d = adjacent(a, n, BACKGROUND)), -1 !== d && (gameImagedata32[d] = gameImagedata32[n], gameImagedata32[n] = BACKGROUND, !0)
}

function doDensitySink(a, e, n, t, o, d) {
    return !(random() >= d) && (e !== MAX_Y_IDX && (-1 !== (i = o ? belowAdjacent(a, e, n, t) : below(e, n, t)) && (gameImagedata32[i] = gameImagedata32[n], gameImagedata32[n] = t, !0)));
    var i
}

function doDensityLiquid(a, e, n, t, o, d) {
    var i = -1;
    return random() < o && (i = belowAdjacent(a, e, n, t)), -1 === i && random() < d && (i = adjacent(a, n, t)), -1 !== i && (gameImagedata32[i] = gameImagedata32[n], gameImagedata32[n] = t, !0)
}

function doGrow(a, e, n, t, o) {
    if (random() >= o) return !1;
    const d = borderingAdjacent(a, e, n, t);
    return -1 !== d && (gameImagedata32[d] = gameImagedata32[n], !0)
}

function __doBorderBurn(a, e, n) {
    0 !== e && (gameImagedata32[n - width] = FIRE), e !== MAX_Y_IDX && (gameImagedata32[n + width] = FIRE), 0 !== a && (gameImagedata32[n - 1] = FIRE), a !== MAX_X_IDX && (gameImagedata32[n + 1] = FIRE), gameImagedata32[n] = FIRE
}

function __doGunpowderExplosion(a, e, n) {
    const t = random() < 60,
        o = t ? FIRE : GUNPOWDER,
        d = 0 !== a,
        i = a !== MAX_X_IDX;
    if (gameImagedata32[n] = o, 0 !== e) {
        const a = n - width;
        gameImagedata32[a] = o, d && (gameImagedata32[a - 1] = o), i && (gameImagedata32[a + 1] = o)
    }
    if (d && (gameImagedata32[n - 1] = o), i && (gameImagedata32[n + 1] = o), e !== MAX_Y_IDX) {
        const a = n + width;
        gameImagedata32[a] = o, d && (gameImagedata32[a - 1] = o), i && (gameImagedata32[a + 1] = o)
    }
    if (t && !(random() >= 40)) {
        if (e - 2 >= 0) {
            const a = n - 2 * width;
            (gameImagedata32[a] !== GUNPOWDER || random() < 50) && (gameImagedata32[a] = FIRE)
        }
        if (e + 2 >= 0) {
            const a = n + 2 * width;
            (gameImagedata32[a] !== GUNPOWDER || random() < 50) && (gameImagedata32[a] = FIRE)
        }
        if (a - 2 >= 0) {
            const a = n - 2;
            (gameImagedata32[a] !== GUNPOWDER || random() < 50) && (gameImagedata32[a] = FIRE)
        }
        if (a + 2 >= 0) {
            const a = n + 2;
            (gameImagedata32[a] !== GUNPOWDER || random() < 50) && (gameImagedata32[a] = FIRE)
        }
    }
}

function doTransform(a, e, n, t, o, d, i) {
    const r = random();
    if (r >= d) return !1;
    const m = bordering(a, e, n, t);
    return -1 !== m && (gameImagedata32[n] = o, r < i && (gameImagedata32[m] = o), !0)
}

function doProducer(a, e, n, t, o, d) {
    if (random() >= d) return !1;
    const i = n - width,
        r = n + width,
        m = n - 1,
        A = n + 1;
    0 === e || !o && gameImagedata32[i] !== BACKGROUND || (gameImagedata32[i] = t), e === MAX_Y_IDX || !o && gameImagedata32[r] !== BACKGROUND || (gameImagedata32[r] = t), 0 === a || !o && gameImagedata32[m] !== BACKGROUND || (gameImagedata32[m] = t), a === MAX_X_IDX || !o && gameImagedata32[A] !== BACKGROUND || (gameImagedata32[A] = t)
}

function uniformBelowAdjacent(a, e, n) {
    if (e === MAX_Y_IDX) return -1;
    const t = n + width,
        o = gameImagedata32[t];
    return 0 !== a && gameImagedata32[t - 1] !== o || a !== MAX_X_IDX && gameImagedata32[t + 1] !== o ? -1 : o
}

function gasPermeable(a) {
    return a !== BACKGROUND && a !== STEAM && a !== METHANE && a in GAS_PERMEABLE
}

function doDensityGas(a, e, n, t) {
    if (random() >= t) return !1;
    if (0 === e) return !1;
    const o = gameImagedata32[n];
    var d = -1;
    const i = n - width,
        r = gameImagedata32[i];
    if (gasPermeable(r)) d = i;
    else {
        const e = i - 1,
            n = i + 1,
            t = 0 !== a ? gameImagedata32[e] : -1,
            o = a !== MAX_X_IDX ? gameImagedata32[n] : -1;
        var m = -1,
            A = -1;
        t !== r && gasPermeable(t) && (m = e), o !== r && (-1 !== m && t === o || gasPermeable(o)) && (A = n), d = __pickRandValid(m, A)
    }
    if (-1 === d && 0 !== a && a !== MAX_X_IDX && e !== MAX_Y_IDX) {
        if (gasPermeable(gameImagedata32[n - 1]) && gameImagedata32[n - 1 + width] !== o) d = n - 1;
        else {
            gasPermeable(gameImagedata32[n + 1]) && gameImagedata32[n + 1 + width] !== o && (d = n + 1)
        }
    }
    return -1 !== d && (gameImagedata32[n] = gameImagedata32[d], gameImagedata32[d] = o, !0)
}
