import { runApollo } from './apollo.js';
import { runLotfollahDome } from './lotfollah.js';
import { runRadials } from './radials.js';

var resetFunc = () => {};
var abortController = new AbortController();

export default function resetColourSchemeListeners() {
    resetFunc();

    switch (document.location.href.split('/').slice(-1)[0]) {
        case 'apollo':
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', runApollo, {signal: abortController.signal});
            break;
        case 'lotfollah':
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', runLotfollahDome, {signal: abortController.signal});
            break;
        case 'radials':
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', runRadials, {signal: abortController.signal});
            break;
        default:
            break;
    }

    resetFunc = function() {
        abortController.abort();
        abortController = new AbortController();
    };
}