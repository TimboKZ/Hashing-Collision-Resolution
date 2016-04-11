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
                    index < this.size ? index++ : index = 0;
                }

            }

            return currentState;

        }

    }

}