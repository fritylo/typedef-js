const type = {
   type: Boolean,
   value: true,
};

function x(arg1, arg2) {
   return function (arg3) {

   };
}

function isTypeMatch(
   target, type,
   _ref = { errors: {}, errorScope: undefined }
) {
   let isError = false;
   let error = '';
   
   if (type.constructor === Object) {
      isObjectMatch(target, type, _ref);
   }
   else if (type.constructor !== Array) {
      if (target.constructor !== type) {
         isError = true;
         error = `Expected "${type.name}". Given "${target.constructor.name}".`;
      }
   }
   
   if (isError) {
      throw new Error('Type mismatch\n' + error);
   }

   // if (type.constructor === Object) {
   //    let currentScope = _ref.errorScope;
   //    
   //    _ref.errorScope = _ref.errorScope[key] = {};
   //    let isNestedErrors = Object.match(target[key], type, _ref);
   //    _ref.errorScope = currentScope;

   //    if (isNestedErrors)
   //       isErrors = true;
   //    else
   //       delete _ref.errorScope[key];
   // } 
   // else if (type.constructor === Array) {
   //    // code here
   // } 
   // else {
   //    if (target[key].constructor !== type) {
   //       _ref.errorScope[key] = `Expected "${type.name}". Given "${target[key].constructor.name}".`;
   //       isErrors = true;
   //    }
   //    else { // if OK
   //    }
   // }
}

function isObjectMatch(
   target, pattern, 
   _ref = { errors: {}, errorScope: undefined }
) {
   let isRecurseRoot = false;
   let isErrors = false;

   if (_ref.errorScope === undefined) {
      _ref.errorScope = _ref.errors;
      isRecurseRoot = true;
   }
   
   for (const [key, type] of Object.entries(pattern)) {
      if (key in target) {
         isTypeMatch(target[key], type[key], _ref);
      }
      else { // key !in target
         _ref.errorScope[key] = `Don't exist.`;
         isErrors = true;
      }
   } // for-in
   
   if (isRecurseRoot && isErrors) {
      throw new Error('Type mismatch\n' + JSON.stringify(_ref.errors, 0, 2)
         .replace(/(?<!\\)"/g, '')
         .replace(/\\"/g, '"')
      );
   }
   
   return isErrors;
};

const TState = {
   users: {
      fedor: {
         fullname: String,
         age: Number,
      },
      darya: {
         fullname: String,
         age: Number,
      },
      emine: {
         fullname: String,
         age: Number,
      },
   }
}

const state = {
   users: {
      fedor: {
         fullname: 'Fedor Nikonov',
         age: 20,
      },
      darya: {
         fullname: 'Darya Gurina',
         age: 18,
      },
      emine: {
         fullname: 'Emine Abibulaeva',
         age: 18,
      },
   }
};

Object.matchType = isTypeMatch;

// Object.typeMatch(state, TState);

isTypeMatch(true, Number);
