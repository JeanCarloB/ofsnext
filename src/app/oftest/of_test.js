class Stream {
  constructor(init = 0) {
    this.init = init;
  }

  [Symbol.iterator]() {
    let n = this.init;
    return {
      next: () => ({ value: n++, done: false }),
    };
  }
}

// Define una función que filtra los números pares de una secuencia
function* even(input) {
  for (const n of input) {
    if (n % 2 === 0) {
      yield n;
    }
  }
}

// Define una función que filtra los números menores que 11 de una secuencia
function* evenLessThanEleven(input) {
  for (const n of input) {
    if (n < 11) {
      yield n;
    }
  }
}

// Define una función que imprime los elementos de una secuencia
function print(input) {
  for (const n of input) {
    console.log(n);
  }
}

// Crea una instancia de la clase Nats para generar números naturales
const stream = new Stream();

// Filtra los números pares de la secuencia de números naturales
const evenIterable = even(stream);

// Filtra los números menores que 11 de la secuencia de números pares
const evenLessThanElevenIterable = evenLessThanEleven(evenIterable);

// Imprime los números pares menores que 11
print(evenLessThanElevenIterable);
