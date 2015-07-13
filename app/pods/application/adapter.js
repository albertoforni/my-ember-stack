import DS from 'ember-data';
import Configuration from 'flight-search/config/environment';

var adapter = DS.RESTAdapter.extend();

if (Configuration.FIXTURES.enabled) {
  adapter = DS.FixtureAdapter.extend({
    queryFixtures: function(records, query) {
      return records.filter(function(record) {
        for (var key in query) {

          if (!query.hasOwnProperty(key)) { continue; }

          var value = query[key];

          var recordValue = record[key];

          if (typeof value === 'string' && value.indexOf('--day') === 0) {
            value = new Date(value.substr(5)).setHours(0, 0, 0, 0);
            recordValue = new Date(recordValue).setHours(0, 0, 0, 0);
          }

          if (recordValue !== value) {
            return false;
          }

        }

        return true;
      });
    }
  });
}

export default adapter;
