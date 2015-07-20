module.exports = function permuteKey(key, memo) {
    if (memo.isArray) {
        if (memo.loaded && memo.rangeOffset > memo.to) {
            ++memo.arrOffset;
            memo.loaded = false;
        }

        var idx = memo.arrOffset, length = key.length;
        if (idx >= length) {
            memo.done = true;
            return '';
        }

        var el = key[memo.arrOffset];
        var type = typeof el;
        if (type === 'object') {
            if (!memo.loaded) {
                initializeRange(el, memo);
            }

            return memo.rangeOffset++;
        } else {
            ++memo.arrOffset;
            return el;
        }
    } else {
        if (!memo.loaded) {
            initializeRange(key, memo);
        }
        if (memo.rangeOffset > memo.to) {
            memo.done = true;
            return '';
        }

        return memo.rangeOffset++;
    }
};

function initializeRange(key, memo) {
    memo.from = key.from || 0;
    memo.to = key.to ||
        (typeof key.length === 'number' &&
        memo.from + key.length - 1 || 0);
    memo.rangeOffset = memo.from;
    memo.loaded = true;
}
