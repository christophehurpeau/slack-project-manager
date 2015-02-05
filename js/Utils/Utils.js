var SPM = SPM || {};

SPM.Utils = {
    waitUntil: function(isReady) {
        return new Promise(function(success, error) {
            var timerId
            timerId = setInterval(function() {
                if (isReady()) {
                    clearInterval(timerId);
                    return success();
                }
            }, 100);
        })
    },

    getProjectNameFromUrl: function(url) {
        var channel = url.split('/')[4];
        if (channel.substring(0,2) == 'p-') {
            return channel;
        } else {
            return null;
        }
        /*
        channelParts = channel.split('-');
        if (channelParts[0] == "p") {
            var project = channelParts[1];
             return project.replace(/_/g, " ");
        }
        */
    },

    unaccent: function (s) {
        var accentMap = {
            'ô':'o',
            'é':'e', 'è':'e','ê':'e', 'ë':'e',
            'à': 'a',
            'î':'i', 'ï': 'i',
            'ç':'c'
        };
        return [].map.call(s, function (c) {
            return accentMap[c] || c;
        }).join('')
    },

    parseGetValueFromKey: function(desc, key) {
        var value = desc
            .toLowerCase()
            .match(new RegExp("(\\n|^).*?" + key + ".*?:.*?(\\n|$)"));
        if (!value) {return false}
        return value[0]
            .slice(value[0].indexOf(':') + 1)
            .trim().replace(/^\*+|\*+$/g, '').trim();
    },

    getDueDate: function(date) {
        var diff = moment(date).diff(moment(), 'days');
        if (diff > 0) {
            return "J-" + diff;
        } else if (diff < 0) {
            return "J+" + Math.abs(diff);
        } else {
            return "";
        }
    },

    doubleLineBreak: function (desc) {
        return desc.replace(/[^\n]\n[^\n]/, function(str) {
            return str[0] + "\n\n" + str[2];
        }, "g");
    }


}
