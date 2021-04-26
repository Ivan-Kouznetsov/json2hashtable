const json2hashtable = require('../json2hashtable');

describe('json2hashtable', () => {
  it('should return hash table when a hash table is passed', () => {
    const result = json2hashtable({ a: 123, b: 123 });
    expect(result).toEqual({ a: 123, b: 123 });
  });

  it('should return hash table when an object is passed', () => {
    const result = json2hashtable({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      emails: ['Sincere@april.biz', 'Sincere1@april.biz'],
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
    expect(result).toEqual({
      'address.city': 'Gwenborough',
      'address.geo.lat': '-37.3159',
      'address.geo.lng': '81.1496',
      'address.street': 'Kulas Light',
      'address.suite': 'Apt. 556',
      'address.zipcode': '92998-3874',
      'company.bs': 'harness real-time e-markets',
      'company.catchPhrase': 'Multi-layered client-server neural-net',
      'company.name': 'Romaguera-Crona',
      'emails[0]': 'Sincere@april.biz',
      'emails[1]': 'Sincere1@april.biz',
      id: 1,
      name: 'Leanne Graham',
      phone: '1-770-736-8031 x56442',
      username: 'Bret',
      website: 'hildegard.org',
    });
  });

  it('should throw a friendly error when invalid JSON string is passed', () => {
    expect(() => {
      json2hashtable('hello');
    }).toThrow('String passed to json2hashtable is not valid JSON');
  });

  it('should throw a friendly error when cirular object is passed', () => {
    let circularObject = { a: 123 };
    circularObject.a = circularObject;

    expect(() => {
      json2hashtable(circularObject);
    }).toThrow('Object passed to json2hashtable is not serializable');
  });

  it('should throw a friendly error when undefined is passed', () => {
    expect(() => {
      json2hashtable(undefined);
    }).toThrow('Value passed to json2hashtable is not an object or string');
  });

  it('should stringify stringable non-primitive types', () => {
    expect(json2hashtable({ f: () => {}, s: Symbol('hello'), n: 123 })).toEqual({
      f: '() => {}',
      n: 123,
      s: 'Symbol(hello)',
    });
  });
});
