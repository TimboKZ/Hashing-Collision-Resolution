export module HashingCollisionResolution {

    abstract class Resolution {

        protected size:number;
        protected string:string;

        public constructor(size:number, string:string) {
            this.size = size;
            this.string = string;
        }

        public resolve():string[][] {

            // Creating initial array
            var state = [];
            for(var i = 0; i < this.size; i++) {
                state[i] = ' ';
            }

            var result = [];

            // Run for each character
            for(var i = 0; i < this.string.length; i++) {
                var character = this.string.charAt(i);
                state = this.step(state, character);
                result.push(state);
            }

            return this.decorate(result);

        }

        protected decorate(result:string[][]):string[][] {
            return result;
        }

        protected abstract step(previousState:string[], character:string):string[];

    }

    export class LinearProbing extends Resolution {

        protected step(previousState:string[], character:string):string[] {

            // Copying the old array
            var currentState = [];
            for(var i = 0; i < previousState.length; i++) {
                currentState[i] = previousState[i];
            }

            // Removing dashes from the previous state
            for(var i = 0; i < currentState.length; i++) {
                currentState[i] = currentState[i].replace('-', '');
            }

            // Convert from character into index
            var alphabetIndex = parseInt(character, 36) - 9;
            var index = alphabetIndex % this.size;

            var stored = false;

            // Using the slot if empty, try next one otherwise
            while(!stored) {

                if(currentState[index] == ' ') {
                    currentState[index] = character;
                    stored = true;
                } else {
                    currentState[index] += '-';
                    index = (index + 1) % this.size;
                }

            }

            return currentState;

        }

    }

    export class QuadraticProbing extends Resolution {

        protected step(previousState:string[], character:string):string[] {

            // Copying and cleaning the old array
            var currentState = [];
            for(var i = 0; i < previousState.length; i++) {
                currentState[i] = previousState[i].replace('-', '');
            }

            // Convert from character into index
            var alphabetIndex = parseInt(character, 36) - 9;
            var index = alphabetIndex % this.size;
            var counter = 1;
            var acc = 1;

            var stored = false;

            // Using the slot if empty, try next one otherwise
            while(!stored) {

                if(currentState[index] == ' ') {
                    currentState[index] = character;
                    stored = true;
                } else {
                    currentState[index] += '-';
                    index = (index + acc) % this.size;
                    acc += acc;
                    counter++;
                }

            }

            return currentState;

        }

    }

    export class Chaining extends Resolution {

        private counter:number[];

        public constructor(size:number, string:string) {
            super(size, string);
            this.counter = [];
            for(var i = 0; i < this.size; i++) {
                this.counter[i] = 0;
            }
        }

        protected step(previousState:string[], character:string):string[] {

            // Creating a fresh array
            var currentState = [];
            for(var i = 0; i < previousState.length; i++) {
                currentState[i] = ' ';
            }

            // Convert from character into index
            var alphabetIndex = parseInt(character, 36) - 9;
            var index = alphabetIndex % this.size;

            // Chaining characters and counting amount of characters in each column
            currentState[index] = character;
            this.counter[index]++;

            return currentState;

        }

        protected decorate(result:string[][]):string[][] {

            // Preparing an array for the decorated result
            var max = Math.max.apply(null, this.counter);
            var decoratedResult = [];
            for(var i = 0; i < max * 2 - 1; i++) {
                decoratedResult[i] = [];
                for(var k = 0; k < this.size; k++) {
                    decoratedResult[i][k] = ' ';
                }
            }

            // Decorating it to reflect chaining in an unambiguous way
            for(var i = 0; i < result.length; i++) {
                for(var k = 0; k < this.size; k++) {
                    if(result[i][k] != ' ') {
                        var j = 0;
                        while(decoratedResult[j * 2][k] != ' ') {
                            j++;
                        }
                        if(j > 0) {
                            decoratedResult[j * 2 - 1][k] = '|';
                        }
                        decoratedResult[j * 2][k] = result[i][k];
                    }
                }
            }

            return decoratedResult;

        }

    }

}