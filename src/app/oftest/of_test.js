// ofs_test.js

// Implementación de un iterable similar a nats
function* nats() {
    let n = 0;
    while (true) {
      yield n;
      n++;
    }
  }
  
  // Implementación de un filter para números pares
  function* filterEven(iterable) {
    for (const value of iterable) {
      if (value % 2 === 0) {
        yield value;
      }
    }
  }
  
  // Implementación de un filter para números menores que 11
  function* filterLessThanEleven(iterable) {
    for (const value of iterable) {
      if (value < 11) {
        yield value;
      }
    }
  }
  
  // Implementación de un map para imprimir valores
  function* mapAndLog(iterable) {
    for (const value of iterable) {
      console.log(value);
      yield value;
    }
  }
  
  // Uso de los iterables y combinadores
  const natsIterable = nats();
  const evenIterable = filterEven(natsIterable);
  const evenLessThanElevenIterable = filterLessThanEleven(evenIterable);
  
  // Imprimir los valores menores que 11
  mapAndLog(evenLessThanElevenIterable);
  
  