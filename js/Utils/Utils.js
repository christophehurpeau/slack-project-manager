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
        var parts = url.split('/');
        var channel = parts[4];
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
            .match(new RegExp(key + ".*?:[ ]*#?[\\w]+.*?\\n"));
        if (!value) {return false}
        value = value[0]
        value = value.slice(value.indexOf(':') + 1)
            .trim()
            .split(' ')[0]
        return SPM.Utils.unaccent(value);
    },

    getDueDate: function(date) {
        var diff = moment(date).diff(moment(), 'days');
        if (diff > 0) {
            return "J-" + diff;
        } else if (diff < 0) {
            return "J+" + Math.abs(diff);
        } else {
            return "??";
        }
    }


}