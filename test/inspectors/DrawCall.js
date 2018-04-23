import assert from 'power-assert';
import DrawCall from 'inspectors/DrawCall';

describe('DrawCall', () => {
  let instance = undefined;

  beforeEach(() => {
    instance = new DrawCall();
  });

  describe('get count', () => {
    it('should return value of _count property', () => {
      const firstCount = instance.count;
      const testValue = 100;

      // ensure using different values
      if (firstCount === testValue) {
        testValue += 1;
      }

      instance._count = testValue;

      assert.strictEqual(instance._count, instance.count);
      assert.notStrictEqual(firstCount, instance.count);
    });
  });

  describe('resetCount', () => {
    it('should set _count property to zero', () => {
      instance._count = 100;
      assert.notStrictEqual(instance._count, 0);

      instance.resetCount();

      assert.strictEqual(instance._count, 0);
    });
  });

  describe('getInvokingTasks', () => {
    it ('should inspect only draw commands', () => {
      const tasks = instance.getInvokingTasks();
      const commands = Object.keys(tasks);
      for (let i = 0; i < commands.length; i++) {
        assert.strictEqual(true, /^draw/.test(commands[i]));
      }
    });
    it('should increment own count property', () => {
      const tasks = instance.getInvokingTasks();
      const commands = Object.keys(tasks);
      for (let i = 0; i < commands.length; i++) {
        const invokes = tasks[commands[i]];
        for (let j = 0; j < invokes.length; j++) {
          const countBefore = instance.count;
          invokes[j]();
          assert.strictEqual(instance.count, countBefore + 1);
        }
      }
    });
  });
});
