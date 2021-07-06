class List {
  constructor (values = []) {
    this.values = values;
  }

  append (list) {
    return new List ([ ...this.values, ...list.values ]);
  }

  revAppend (list) {
    if (!this.length ()) return list;
    return (([ v, ...vs ], us) => {
      return new List (vs).revAppend (new List ([ v, ...us ]));
    }) (this.values, list.values)
  }

  concat (listOfLists) {
    if (!listOfLists.length ()) return this;
    return (([ v, ...vs ]) => {
      return new List ([
        ...this.values,
        ...new List (v.values).concat (new List (vs)).values
      ]);
    }) (listOfLists.values);
  }

  filter (condition) {
    if (!this.length ()) return this;
    return (([ v, ...vs ]) => {
      return (
        condition (v) ?
        new List ([ v, ...new List (vs).filter (condition).values ])
        : new List (vs).filter (condition)
      );
    }) (this.values);
  }

  map (mapper) {
    if (!this.length ()) return this;
    return (([ v, ...vs ]) => {
      return new List ([
        mapper (v),
        ...new List (vs).map (mapper).values
      ]);
    }) (this.values);
  }

  length () {
    return (([ v, ...vs ]) => {
      return (
        v === undefined ?
        0
        : 1 + new List (vs).length ()
      );
    }) (this.values);
  }

  foldl (func, init) {
    if (!this.length ()) return init;
    return (([ v, ...vs ]) => {
      return new List (vs).foldl (func, func (init, v));
    }) (this.values);
  }

  foldr (func, init) {
    if (!this.length ()) return init;
    return (([ v, ...vs ]) => {
      return func (new List (vs).foldr (func, init), v);
    }) (this.values);
  }

  reverse () {
    return this.revAppend (new List ([]));
  }
}

module.exports.List = List;
