const SPIGOT_ELEMENT_OPTIONS = [SAND, WATER, ACID, SALT, FIRE, SALT_WATER, OIL, TORCH, GUNPOWDER, FALLING_WAX, NITRO, NAPALM, LAVA, ROCK, STEAM, CRYO, MYSTERY, METHANE, SOIL, WET_SOIL, POLLEN, CHARGED_NITRO, FIRE, THERMITE, BURNING_THERMITE, RETRON_MAT, SNOT],
    SPIGOT_SIZE_OPTIONS = [0, 5, 10, 15, 20, 25, 50, 100],
    DEFAULT_SPIGOT_SIZE_IDX = 1,
    SPIGOT_ELEMENTS = [SAND, WATER, SALT, OIL],
    SPIGOT_SIZES = [],
    SPIGOT_HEIGHT = 10,
    MAX_SPIGOT_WIDTH = Math.max(...SPIGOT_SIZE_OPTIONS),
    NUM_SPIGOTS = SPIGOT_ELEMENTS.length,a
    SPIGOT_SPACING = Math.round((width - MAX_SPIGOT_WIDTH * NUM_SPIGOTS) / (NUM_SPIGOTS + 1) + MAX_SPIGOT_WIDTH),
    SPIGOTS_ENABLED = MAX_SPIGOT_WIDTH * NUM_SPIGOTS <= width && 10 <= height;

function initSpigots() {
    const S = SPIGOT_SIZE_OPTIONS[1];
    for (var I = 0; I !== NUM_SPIGOTS; I++) SPIGOT_SIZES.push(S)
}

function updateSpigots() {
    var S, I, T;
    if (SPIGOTS_ENABLED)
        for (S = 0; S !== NUM_SPIGOTS; S++) {
            const _ = SPIGOT_ELEMENTS[S],
                E = SPIGOT_SPACING * (S + 1) - MAX_SPIGOT_WIDTH,
                P = E + SPIGOT_SIZES[S];
            if (!(E < 0)) {
                if (P > MAX_X_IDX) break;
                var O = 0;
                for (T = 0; 10 !== T; T++) {
                    for (I = E; I !== P; I++) random() < 10 && (gameImagedata32[I + O] = _);
                    O += width
                }
            }
        }
}
