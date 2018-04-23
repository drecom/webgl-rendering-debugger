import { expect } from 'chai';
import { spy } from 'sinon';
import assert from 'power-assert';
import WebGLRenderingDebugger, { DrawCall, WebGLRenderingDebuggerError } from 'index';

describe('WebGLRenderingDebugger', () => {

  let instance = undefined;
  let mockWebGLRenderingContext = function(){};

  before(() => {
    const commands = Object.keys((new DrawCall()).getInvokingTasks());
    for (let i = 0; i < commands.length; i++) {
      mockWebGLRenderingContext[commands[i]] = () => {};
    }
  });

  describe('constructor', () => {
    beforeEach(() => {
      instance = new WebGLRenderingDebugger();
    });

    describe('property initialization', () => {
      const objectName        = ({}).constructor.name;
      const emptyObjectLength = Object.keys({}).length;

      it('property inspectors should be initialized as empty object', () => {
        assert.strictEqual(instance.inspectors.constructor.name, objectName);
        assert.strictEqual(Object.keys(instance.inspectors).length, emptyObjectLength);
      });
      it('property preservations should be initialized as empty object', () => {
        assert.strictEqual(instance.preservations.constructor.name, objectName);
        assert.strictEqual(Object.keys(instance.preservations).length, emptyObjectLength);
      });
      it('property invokations should be initialized as empty object', () => {
        assert.strictEqual(instance.invokations.constructor.name, objectName);
        assert.strictEqual(Object.keys(instance.invokations).length, emptyObjectLength);
      });
      it('property invokationsInspectorKeyCache should be initialized as empty object', () => {
        assert.strictEqual(instance.invokationsInspectorKeyCache.constructor.name, objectName);
        assert.strictEqual(Object.keys(instance.invokationsInspectorKeyCache).length, emptyObjectLength);
      });
    });

    it('should set first argument to own context property', () => {
      assert.strictEqual(instance.context, undefined);

      const testValue = "test argument";
      const testInstance = new WebGLRenderingDebugger(testValue);

      assert.strictEqual(testInstance.context, testValue);
    });
  });

  describe('createInspector', () => {
    const inspectorKeys = Object.keys(WebGLRenderingDebugger.Inspectors);

    it('should return inspectors related to WebGLRenderingDebugger.Inspectors', () => {
      for (let i = 0; i < inspectorKeys.length; i++) {
        const inspector = WebGLRenderingDebugger.createInspector(WebGLRenderingDebugger.Inspectors[inspectorKeys[i]]);
        assert.notStrictEqual(inspector, undefined);
        assert.notStrictEqual(inspector, null);
      }
    });
    it('should return null if argument not related to WebGLRenderingDebugger.Inspectors', () => {
      const testKey = 'testInspector';

      assert.strictEqual(inspectorKeys.indexOf(testKey), -1);

      const inspector = WebGLRenderingDebugger.createInspector(testKey);
      assert.strictEqual(inspector, null);
    });
  });

  describe('getAttachedInstpector', () => {
    const inspectorName = 'testName';

    it('should return inspectors entity related to given key', () => {
      const stubValue = 100;
      assert.strictEqual(instance.getAttachedInstpector(inspectorName), undefined);
      instance.inspectors[inspectorName] = stubValue;
      assert.strictEqual(instance.getAttachedInstpector(inspectorName), stubValue);
    });

    it('should return undefined if given key does not exist', () => {
      delete instance.inspectors[inspectorName];
      assert.strictEqual(instance.getAttachedInstpector(inspectorName), undefined);
    });
  });

  describe('attach', () => {

    beforeEach(() => {
      instance = new WebGLRenderingDebugger(mockWebGLRenderingContext);
    });

    it('should throws WebGLRenderingDebuggerError if the same inspector is already attached', () => {
      instance.attach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);
      assert.throws(() => instance.attach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS), Error);
    });

    it('should add Inspector instance to inspectors property', () => {
      const keysBefore = Object.keys(instance.inspectors);
      assert.strictEqual(keysBefore.length, 0);

      instance.attach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);

      const keysAfter = Object.keys(instance.inspectors);
      assert.strictEqual(keysAfter.length, 1);

      const inspector = instance.inspectors[WebGLRenderingDebugger.Inspectors.DRAW_CALLS];
      assert.strictEqual(inspector.constructor.name, DrawCall.name);
    });

    it('should add tasks to invokations property', () => {
      const keysBefore = Object.keys(instance.invokations);
      assert.strictEqual(keysBefore.length, 0);

      instance.attach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);

      const keysAfter = Object.keys(instance.invokations);
      expect(keysAfter.length).to.be.greaterThan(0);

      for (let i = 0; i < keysAfter.length; i++) {
        const key = keysAfter[i];
        const inspectorNames = Object.keys(instance.invokations[key]);

        assert.strictEqual(inspectorNames.length, 1);
        assert.strictEqual(inspectorNames[0], WebGLRenderingDebugger.Inspectors.DRAW_CALLS);

        const tasks = instance.invokations[key][inspectorNames[0]];
        assert.strictEqual(tasks.constructor.name, Array.name);
      }
    });
  });

  describe('attachInspector', () => {

    const testApiName       = 'testApi';
    const testInspectorName = 'testInspector';

    const mockTestApi = function mockTestApi() {};

    const stubTasks = [
      () => true,
      () => false,
    ];

    beforeEach(() => {
      mockWebGLRenderingContext[testApiName] = mockTestApi;
      instance = new WebGLRenderingDebugger(mockWebGLRenderingContext);
    });

    it('should add invokations property', () => {
      assert.strictEqual(Object.keys(instance.invokations).length, 0);

      instance.attachInspector(testApiName, testInspectorName, stubTasks);

      assert.strictEqual(Object.keys(instance.invokations).length, 1);
      assert.notStrictEqual(instance.invokations[testApiName], undefined);
      assert.strictEqual(instance.invokations[testApiName].hasOwnProperty(testInspectorName), true);
    });

    it('should add preservations property', () => {
      assert.strictEqual(Object.keys(instance.preservations).length, 0);

      instance.attachInspector(testApiName, testInspectorName, stubTasks);

      assert.strictEqual(Object.keys(instance.preservations).length, 1);
      assert.notStrictEqual(instance.preservations[testApiName], undefined);
      assert.strictEqual(instance.preservations[testApiName], mockTestApi);
    });

    it('should add invokationsInspectorKeyCache property', () => {
      assert.strictEqual(Object.keys(instance.invokationsInspectorKeyCache).length, 0);

      instance.attachInspector(testApiName, testInspectorName, stubTasks);

      assert.strictEqual(Object.keys(instance.invokationsInspectorKeyCache).length, 1);
      assert.strictEqual(instance.invokationsInspectorKeyCache[testApiName][0], testInspectorName);
    });

    it('should invoked attached tasks', () => {
      const spyTasks = [
        spy(),
        spy()
      ];

      {
        const spyOriginal = spy(mockWebGLRenderingContext, testApiName);

        mockWebGLRenderingContext[testApiName]();

        assert.strictEqual(spyOriginal.calledOnce, true);
        for (let i = 0; i < spyTasks.length; i++) {
          assert.strictEqual(spyTasks[i].called, false);
        }
      }

      instance.attachInspector(testApiName, testInspectorName, spyTasks);

      {
        const spyOriginal = spy(mockWebGLRenderingContext, testApiName);

        mockWebGLRenderingContext[testApiName]();

        assert.strictEqual(spyOriginal.calledOnce, true);
        for (let i = 0; i < spyTasks.length; i++) {
          assert.strictEqual(spyTasks[i].calledOnce, true);
        }
      }
    });
  });

  describe('detach', () => {

    let defaultInspectorName = WebGLRenderingDebugger.Inspectors.DRAW_CALLS;

    beforeEach(() => {
      instance = new WebGLRenderingDebugger(mockWebGLRenderingContext);
      instance.attach(defaultInspectorName);
    });

    describe('when detaching last inspector', () => {
      it('should remove Inspector instance from inspectors property', () => {
        assert.strictEqual(instance.inspectors.hasOwnProperty(defaultInspectorName), true);

        instance.detach(WebGLRenderingDebugger.Inspectors.DRAW_CALLS);

        assert.strictEqual(instance.inspectors.hasOwnProperty(defaultInspectorName), false);
      });

      it('should remove api key from invokations property', () => {
        const invokationKeys = Object.keys(instance.invokations);

        for (let i = 0; i < invokationKeys.length; i++) {
          const key = invokationKeys[i];
          assert.strictEqual(instance.invokations[key].hasOwnProperty(defaultInspectorName), true);
        }

        instance.detach(defaultInspectorName);

        for (let i = 0; i < invokationKeys.length; i++) {
          const key = invokationKeys[i];
          assert.strictEqual(instance.invokations.hasOwnProperty(key), false);
        }
      });

      it('should remove preservations property', () => {
        const inspector = instance.getAttachedInstpector(defaultInspectorName);
        const invokingtasks = Object.keys(inspector.getInvokingTasks());
        assert.strictEqual(Object.keys(instance.preservations).length, invokingtasks.length);

        instance.detach(defaultInspectorName);

        assert.strictEqual(Object.keys(instance.preservations).length, 0);
      });

      it('should remove invokationsInspectorKeyCache key', () => {
        const inspector = instance.getAttachedInstpector(defaultInspectorName);
        const tasks = inspector.getInvokingTasks();

        let taskKeys;

        taskKeys = Object.keys(tasks);
        for (let i = 0; i < taskKeys.length; i++) {
          assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(taskKeys[i]), true);
        }

        instance.detach(defaultInspectorName);

        taskKeys = Object.keys(tasks);
        for (let i = 0; i < taskKeys.length; i++) {
          assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(taskKeys[i]), false);
        }
      });
    });

    describe('when detaching inspector that invokes task on the method which other inspector invokes tasks', () => {
      const mockInspectorName = 'mockInspector';
      let defaultInspector = undefined;

      beforeEach(() => {
        instance = new WebGLRenderingDebugger(mockWebGLRenderingContext);
        instance.attach(defaultInspectorName);
        defaultInspector = instance.getAttachedInstpector(defaultInspectorName);

        const commands = Object.keys(defaultInspector.getInvokingTasks());
        for (let i = 0; i < commands.length; i++) {
          instance.attachInspector(commands[i], mockInspectorName, [() => {}]);
        }
      });

      afterEach(() => {
        const commands = Object.keys(defaultInspector.getInvokingTasks());
        for (let i = 0; i < commands.length; i++) {
          instance.detachInspector(commands[i], mockInspectorName);
        }

        instance = null;
      });

      it('should remove only tasks from invokations property', () => {
        const invokationKeys = Object.keys(instance.invokations);

        for (let i = 0; i < invokationKeys.length; i++) {
          const key = invokationKeys[i];
          assert.strictEqual(instance.invokations[key].hasOwnProperty(defaultInspectorName), true);
          assert.strictEqual(instance.invokations[key].hasOwnProperty(mockInspectorName), true);
        }

        instance.detach(defaultInspectorName);

        for (let i = 0; i < invokationKeys.length; i++) {
          const key = invokationKeys[i];
          assert.strictEqual(instance.invokations[key].hasOwnProperty(defaultInspectorName), false);
          assert.strictEqual(instance.invokations[key].hasOwnProperty(mockInspectorName), true);
        }
      });
      it('should remains preservations property key', () => {
        const preservationKeys = Object.keys(instance.preservations);
        expect(preservationKeys.length).to.be.greaterThan(0);

        for (let i = 0; i < preservationKeys.length; i++) {
          assert.strictEqual(instance.preservations.hasOwnProperty(preservationKeys[i]), true);
        }

        instance.detach(defaultInspectorName);

        for (let i = 0; i < preservationKeys.length; i++) {
          assert.strictEqual(instance.preservations.hasOwnProperty(preservationKeys[i]), true);
        }
      });

      it('should not remove invokationsInspectorKeyCache key', () => {
        const inspector = instance.getAttachedInstpector(defaultInspectorName);
        const tasks = inspector.getInvokingTasks();

        let taskKeys;

        taskKeys = Object.keys(tasks);
        for (let i = 0; i < taskKeys.length; i++) {
          assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(taskKeys[i]), true);
        }

        instance.detach(defaultInspectorName);

        taskKeys = Object.keys(tasks);
        for (let i = 0; i < taskKeys.length; i++) {
          assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(taskKeys[i]), true);
        }
      });
    });
  });

  describe('detachInspector', () => {
    const propertyName  = 'testProperty';
    const inspectorName = 'testInspector';

    beforeEach(() => {
      instance = new WebGLRenderingDebugger(mockWebGLRenderingContext);
      instance.invokations[propertyName] =  {};
      instance.invokations[propertyName][inspectorName] = [];
      instance.invokationsInspectorKeyCache[propertyName] = [inspectorName];
    });

    it('should remove given inspector from invokations\'s given property', () => {
      assert.strictEqual(instance.invokations[propertyName].hasOwnProperty(inspectorName), true);
      instance.detachInspector(propertyName, inspectorName);
      assert.strictEqual(instance.invokations[propertyName].hasOwnProperty(inspectorName), false);
    });
    it('should remove given inspector from invokationsInspectorKeyCache\'s given property', () => {
      expect(instance.invokationsInspectorKeyCache[propertyName].length).to.be.greaterThan(0);
      instance.detachInspector(propertyName, inspectorName);
      assert.strictEqual(instance.invokationsInspectorKeyCache[propertyName].length, 0);
    });
  });

  describe('restorePropertyIfNeeded', () => {
    const propertyName  = 'testProperty';
    let stub = undefined;

    beforeEach(() => {
      stub = spy();
      instance.context[propertyName] = () => {};
      instance.preservations[propertyName] = stub;
      instance.invokations[propertyName] = {};
      instance.invokationsInspectorKeyCache[propertyName] = [];
    });

    describe('when any element remains in invokation property', () => {
      beforeEach(() => {
        instance.invokations[propertyName] = [() => {}];
      });

      it('should not restore preservation method', () => {
        instance.context[propertyName]();
        assert.strictEqual(stub.calledOnce, false);

        instance.restorePropertyIfNeeded(propertyName);

        instance.context[propertyName]();
        assert.strictEqual(stub.calledOnce, false);
      });
      it('should not delete given property name from invokations', () => {
        assert.strictEqual(instance.invokations.hasOwnProperty(propertyName), true);
        instance.restorePropertyIfNeeded(propertyName);
        assert.strictEqual(instance.invokations.hasOwnProperty(propertyName), true);
      });
      it('should not delete given property name from invokationsInspectorKeyCache', () => {
        assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(propertyName), true);
        instance.restorePropertyIfNeeded(propertyName);
        assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(propertyName), true);
      });
      it('should not delete given property name from preservations', () => {
        assert.strictEqual(instance.preservations.hasOwnProperty(propertyName), true);
        instance.restorePropertyIfNeeded(propertyName);
        assert.strictEqual(instance.preservations.hasOwnProperty(propertyName), true);
      });
    });

    describe('when no element remains in invokation property', () => {
      beforeEach(() => {
        instance.invokations[propertyName] = [];
      });

      it('should restore preservation method', () => {
        instance.context[propertyName]();
        assert.strictEqual(stub.calledOnce, false);

        instance.restorePropertyIfNeeded(propertyName);

        instance.context[propertyName]();
        assert.strictEqual(stub.calledOnce, true);
      });
      it('should delete given property name from invokations', () => {
        assert.strictEqual(instance.invokations.hasOwnProperty(propertyName), true);
        instance.restorePropertyIfNeeded(propertyName);
        assert.strictEqual(instance.invokations.hasOwnProperty(propertyName), false);
      });
      it('should delete given property name from invokationsInspectorKeyCache', () => {
        assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(propertyName), true);
        instance.restorePropertyIfNeeded(propertyName);
        assert.strictEqual(instance.invokationsInspectorKeyCache.hasOwnProperty(propertyName), false);
      });
      it('should delete given property name from preservations', () => {
        assert.strictEqual(instance.preservations.hasOwnProperty(propertyName), true);
        instance.restorePropertyIfNeeded(propertyName);
        assert.strictEqual(instance.preservations.hasOwnProperty(propertyName), false);
      });
    });
  });

  describe('replaceContextMethod', () => {
    const propertyName = 'testProperty';
    let defaultContextMethod = undefined;

    beforeEach(() => {
      defaultContextMethod = spy();
      instance.context[propertyName] = defaultContextMethod;
    });

    it('should replace context\'s method', () => {
      const stubProperty = 'stubProperty';
      const stubValue = 1;
      instance.context[propertyName][stubProperty] = stubValue;
      assert.strictEqual(instance.context[propertyName][stubProperty], stubValue);
      instance.replaceContextMethod(propertyName);
      assert.strictEqual(instance.context[propertyName][stubProperty], undefined);
    });
    it('should replaced method and original method called', () => {
      const inspectorName = 'testInspector';
      const stubTask = spy();
      instance.invokationsInspectorKeyCache[propertyName] = [inspectorName];
      instance.invokations[propertyName] = {};
      instance.invokations[propertyName][inspectorName] = [stubTask];

      instance.context[propertyName]();
      assert.strictEqual(stubTask.calledOnce, false);
      instance.replaceContextMethod(propertyName);
      instance.context[propertyName]();
      assert.strictEqual(stubTask.calledOnce, true);
    });
  });
});
