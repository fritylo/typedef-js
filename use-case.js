// Helpers
class SomeClass {}
   
// Begin
import T from './typedef-js';
   
let t = new T;

t.num = 10;
t.num = 20;
t.num = false; // error

t.bool = true;
t.bool = false;
t.bool = 0; // error


t.obj = { Hello: 'World!' };

t.obj ={Hello: String};
t.obj = { Hello: 'World!' };

t.obj = { Hello: 10 }; // error
t.obj = { Other: 'World!' }; // error
t.obj = { Hello: 'World!', Other: 10 }; // error


t.arr = [1, 2, 3, 4];
t.arr = [1, 2, 3, null]; // error

t.arr =[Number];
t.arr = [1, 2, 3, 4];
t.arr = [1, 2, 3, null]; // error

t.arr =[Number, null];
t.arr = [1, 2, 3, null]; // ok


t.forEach = t(o=> undefined)(
     Array, t(o=> undefined)(undefined, Number, Array)
  );
t.forEach = (array, callback) => {
     let t = new T;
     for (t.i = 0; t.i < 10; t.i++) {
        callback(array[i], i, array);
     }
  };

t.forEach = t(o=> undefined) ( // undefined === any
     ( array =Array, callback =t(o=> undefined)(undefined, Number, Array) ) => {
        let t = new T;
        for (t.i = 0; t.i < 10; t.i++) {
           callback(array[t.i], t.i, array);
        }
     }
  );


t.returnsFunction = t(o=> undefined) (
     ( a =Number ) => t(o=> Number) (
        ( b =Number ) => a + b
     )
  );
t.returnsFunction(10)(20); // 30
t.returnsFunction('10')(20); // error
t.returnsFunction(10)('20'); // error


t.callback = t(o=> Boolean) (Number, String, SomeClass);
t.callback = (argument1, argument2, argument3) => argument1 && argument2 && argument3;

t.callback = t(o=> Boolean) (
   (argument1 =Number, argument2 =String, argument3 =SomeClass) => (
      argument1 && argument2 && argument3
   )
);

t.callback(10, '20', new SomeClass());
t.callback(); // error


t.store = {
   state: {
      users: [
         {
            name: 'Fedor',
            surname: 'Nikonov',
            birthday: new Date('2001-08-17'),
            isMarried: false,
            childrenCount: 0,
         }
      ]
   },
   
   logic: {
      generateGreet: t(o=> String) (
         (user =t.store.state.users[0]) => `Hello, ${user.name} ${user.surname}`
      ),
      generateGreet1 (user =t.store.state.users[0]) {
         return t(String) (`Hello, ${user.name} ${user.surname}`);
      }
   },
};

t.store.users[0].name = /Fedor/; // error
t.store.logic.generateGreet(t.store.state.users[0]);

t.store = {
   state: {
      users: [{
         name: String,
         surname: String,
         birthday: Date,
         isMarried: Boolean,
         childrenCount: Number,
      }]
   }
};


t(
   class Greeting {
      constructor(name =String) {
         this.name = name;
      }
 
      static withSurname(name =String, surname =String) {
         return t(Greeting) (
            new this(`${name} ${surname}`)
         );
      }
   }
);

t.greet = new t.Greeting('Fedor');
t.greetSurname = t.Greeting.withSurname('Fedor', 'Nikonov');


t(
   class IHuman {
      name =String;
      age =Number;

      renew (name =String, age =Number) {
         return Boolean;
      }
      
      constructor(name =String, age =Number) {}
   }
);
t(
   class IEmployee extends t.IHuman {
      welcome (surname =String) {
         return String;
      }
   }
);
t(
   class ShopEmployee extends t.IEmployee {
      constructor (name, age) {
         super();
         
         this.name = name;
         this.age = age;
      }
 
      renew (name, age) {
         if (name.length > 20 || age > 100)
            return false;
 
         this.name = name;
         this.age = age;
 
         return true;
      }
 
      welcome (surname) {
         return `Welcome, ${this.name} ${surname}!`;
      }
   }
);

t.employee = new t.ShopEmployee('Fedor', 20);
t.employee.welcome('Nikonov'); // 'Welcome, Fedor Nikonov!'


t.privateModifier = {
   _privateProp: 'This property is private',
   _privateMethod (arg =Boolean) {
      return t(String) (
         arg
            ? 'This method is private'
            : this._privateProp
      );
   }
};


t(
   function callGreeting(callback =Function) {
      return t(String) (callback());
   }
)


t.sumWithDefaults = t(o=> Number) (
   (a = 10, b = 20) => a + b
);

t.sumWithDefaults(11, 22); // 33
t.sumWithDefaults(); // 30

t.sumWithDefaults('11', 22); // error
t.sumWithDefaults(11, '22'); // error


t.fewTypes = t(Number, null);

t.fewTypes = 10;
t.fewTypes = null;
t.fewTypes = 'string'; // error


t.ternary = t(Number) (true ? 10 : 20);


t.anyObject = instanceOf(Object);

t.anyObject = {};
t.anyObject = new String();


// if logger defined, then do not throw errors
T.logger = t(o=> undefined) (
   (err =T.Error) => {
      // do something
   }
);

