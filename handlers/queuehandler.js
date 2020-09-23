/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 *
 * Code taken from http://code.iamkate.com/javascript/queues/ by Kate Rose Morley
 */


class Queue {
    constructor() {
        // initialise the queue and offset
        var queue = [];
        var offset = 0;

        /* Returns the length of the queue.
         */
        //CLS - rename from getLength to size
        this.getLength = function () {

            // return the length of the queue
            return (queue.length - offset);

        }

        /* Returns true if the queue is empty, and false otherwise.
         */
        this.isEmpty = function () {

            // return whether the queue is empty
            return (queue.length == 0);

        }

        /* Enqueues the specified item. The parameter is:
         *
         * item - the item to enqueue
         */
        //CLS - renamed from enqueue to add
        this.enqueue = function (item) {

            // enqueue the item
            queue.push(item);

        }

        /* Dequeues an item and returns it. If the queue is empty then undefined is
         * returned.
         */
        //CLS - renamed from dequeue to remove
        this.dequeue = function () {

            // if the queue is empty, return undefined
            if (queue.length == 0) return undefined;

            // store the item at the front of the queue
            var item = queue[offset];

            // increment the offset and remove the free space if necessary
            if (++offset * 2 >= queue.length) {
                queue = queue.slice(offset);
                offset = 0;
            }

            // return the dequeued item
            return item;

        }

        /* Returns the item at the front of the queue (without dequeuing it). If the
         * queue is empty then undefined is returned.
         */
        this.peek = function () {

            // return the item at the front of the queue
            return (queue.length > 0 ? queue[offset] : undefined);

        }

        //CLS - Modified to support a contains function (requires '.equals' to work correctly)
        this.contains = function (item) {
            var found = false;
            var selectedSession = null;

            for (var i = 0; i < queue.length; i++) {
                if (queue[i].equals(item)) {
                    found = true;
                    break;
                }
            }

            return found;
        }

        //CLS - add clear function
        this.clear = function () {
            queue = [];
            offset = 0;
        }

        this.String = function () {
            if (this.isEmpty())
                return 'The queue is currently empty.';
            var s = '';
            for (var i = 0; i < this.getLength(); i++) {
                s += (i + 1) + '. ' + queue[offset + i] + '\n';
            }
            return s;
        };
    }
}
module.exports.Queue = Queue;