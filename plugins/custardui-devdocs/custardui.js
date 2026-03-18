/*!
 * @custardui/custardui v2.1.1
 * (c) 2026 Chan Ger Teck
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CustardUI = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Helper function to prepend baseUrl to a path
     * @param path The path to prepend the baseUrl to
     * @param baseUrl The base URL to prepend
     * @returns The full URL with baseUrl prepended if applicable
     */
    function prependBaseUrl(path, baseUrl) {
        if (!baseUrl)
            return path;
        // Don't prepend if the path is already absolute (starts with http:// or https://)
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // Ensure baseUrl doesn't end with / and path starts with /
        const cleanbaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const cleanPath = path.startsWith('/') ? path : '/' + path;
        return cleanbaseUrl + cleanPath;
    }

    /**
     * Finds the script tag that loaded the library and extracts configuration attributes.
     * Looks for `data-base-url` and `data-config-path`.
     */
    function getScriptAttributes() {
        let scriptTag = document.currentScript;
        const defaults = { baseURL: '/', configPath: '/custardui.config.json' };
        if (!scriptTag || !scriptTag.hasAttribute('data-base-url')) {
            const dataAttrMatch = document.querySelector('script[data-base-url]');
            if (dataAttrMatch) {
                scriptTag = dataAttrMatch;
            }
            else {
                // Fallback: try to find script by src pattern
                for (const script of document.scripts) {
                    const src = script.src || '';
                    if (/(?:custard(?:ui)?|@custardui\/custard(?:ui)?)(?:\.min)?\.(?:esm\.)?js($|\?)/i.test(src)) {
                        scriptTag = script;
                        break;
                    }
                }
            }
        }
        if (scriptTag) {
            return {
                baseURL: scriptTag.getAttribute('data-base-url') || defaults.baseURL,
                configPath: scriptTag.getAttribute('data-config-path') || defaults.configPath,
            };
        }
        return defaults;
    }
    /**
     * Fetches and parses the configuration file.
     */
    async function fetchConfig(configPath, baseURL) {
        const fallbackMinimalConfig = {
            config: {},
            settings: { enabled: true },
        };
        try {
            const fullConfigPath = prependBaseUrl(configPath, baseURL);
            const response = await fetch(fullConfigPath);
            if (!response.ok) {
                console.warn(`[CustardUI] Config file not found at ${fullConfigPath}. Using defaults.`);
                return fallbackMinimalConfig;
            }
            const config = await response.json();
            return config;
        }
        catch (error) {
            console.error('[CustardUI] Error loading config file:', error);
            return fallbackMinimalConfig;
        }
    }

    // generated during release, do not modify

    const PUBLIC_VERSION = '5';

    if (typeof window !== 'undefined') {
    	// @ts-expect-error
    	((window.__svelte ??= {}).v ??= new Set()).add(PUBLIC_VERSION);
    }

    const EACH_ITEM_REACTIVE = 1;
    const EACH_INDEX_REACTIVE = 1 << 1;
    /** See EachBlock interface metadata.is_controlled for an explanation what this is */
    const EACH_IS_CONTROLLED = 1 << 2;
    const EACH_IS_ANIMATED = 1 << 3;
    const EACH_ITEM_IMMUTABLE = 1 << 4;

    const PROPS_IS_IMMUTABLE = 1;
    const PROPS_IS_RUNES = 1 << 1;
    const PROPS_IS_UPDATED = 1 << 2;
    const PROPS_IS_BINDABLE = 1 << 3;
    const PROPS_IS_LAZY_INITIAL = 1 << 4;

    const TRANSITION_IN = 1;
    const TRANSITION_OUT = 1 << 1;
    const TRANSITION_GLOBAL = 1 << 2;

    const TEMPLATE_FRAGMENT = 1;
    const TEMPLATE_USE_IMPORT_NODE = 1 << 1;

    const HYDRATION_START = '[';
    /** used to indicate that an `{:else}...` block was rendered */
    const HYDRATION_START_ELSE = '[!';
    const HYDRATION_END = ']';
    const HYDRATION_ERROR = {};

    const UNINITIALIZED = Symbol();

    const NAMESPACE_HTML = 'http://www.w3.org/1999/xhtml';

    const ATTACHMENT_KEY = '@attach';

    var DEV = false;

    // Store the references to globals in case someone tries to monkey patch these, causing the below
    // to de-opt (this occurs often when using popular extensions).
    var is_array = Array.isArray;
    var index_of = Array.prototype.indexOf;
    var array_from = Array.from;
    var object_keys = Object.keys;
    var define_property = Object.defineProperty;
    var get_descriptor = Object.getOwnPropertyDescriptor;
    var get_descriptors = Object.getOwnPropertyDescriptors;
    var object_prototype = Object.prototype;
    var array_prototype = Array.prototype;
    var get_prototype_of = Object.getPrototypeOf;
    var is_extensible = Object.isExtensible;

    /**
     * @param {any} thing
     * @returns {thing is Function}
     */
    function is_function(thing) {
    	return typeof thing === 'function';
    }

    const noop = () => {};

    /** @param {Function} fn */
    function run(fn) {
    	return fn();
    }

    /** @param {Array<() => void>} arr */
    function run_all(arr) {
    	for (var i = 0; i < arr.length; i++) {
    		arr[i]();
    	}
    }

    /**
     * TODO replace with Promise.withResolvers once supported widely enough
     * @template [T=void]
     */
    function deferred() {
    	/** @type {(value: T) => void} */
    	var resolve;

    	/** @type {(reason: any) => void} */
    	var reject;

    	/** @type {Promise<T>} */
    	var promise = new Promise((res, rej) => {
    		resolve = res;
    		reject = rej;
    	});

    	// @ts-expect-error
    	return { promise, resolve, reject };
    }

    // General flags
    const DERIVED = 1 << 1;
    const EFFECT = 1 << 2;
    const RENDER_EFFECT = 1 << 3;
    /**
     * An effect that does not destroy its child effects when it reruns.
     * Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
     */
    const MANAGED_EFFECT = 1 << 24;
    /**
     * An effect that does not destroy its child effects when it reruns (like MANAGED_EFFECT).
     * Runs eagerly as part of tree traversal or effect flushing.
     */
    const BLOCK_EFFECT = 1 << 4;
    const BRANCH_EFFECT = 1 << 5;
    const ROOT_EFFECT = 1 << 6;
    const BOUNDARY_EFFECT = 1 << 7;
    /**
     * Indicates that a reaction is connected to an effect root — either it is an effect,
     * or it is a derived that is depended on by at least one effect. If a derived has
     * no dependents, we can disconnect it from the graph, allowing it to either be
     * GC'd or reconnected later if an effect comes to depend on it again
     */
    const CONNECTED = 1 << 9;
    const CLEAN = 1 << 10;
    const DIRTY = 1 << 11;
    const MAYBE_DIRTY = 1 << 12;
    const INERT = 1 << 13;
    const DESTROYED = 1 << 14;

    // Flags exclusive to effects
    /** Set once an effect that should run synchronously has run */
    const EFFECT_RAN = 1 << 15;
    /**
     * 'Transparent' effects do not create a transition boundary.
     * This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
     */
    const EFFECT_TRANSPARENT = 1 << 16;
    const EAGER_EFFECT = 1 << 17;
    const HEAD_EFFECT = 1 << 18;
    const EFFECT_PRESERVED = 1 << 19;
    const USER_EFFECT = 1 << 20;
    const EFFECT_OFFSCREEN = 1 << 25;

    // Flags exclusive to deriveds
    /**
     * Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
     * Will be lifted during execution of the derived and during checking its dirty state (both are necessary
     * because a derived might be checked but not executed).
     */
    const WAS_MARKED = 1 << 15;

    // Flags used for async
    const REACTION_IS_UPDATING = 1 << 21;
    const ASYNC = 1 << 22;

    const ERROR_VALUE = 1 << 23;

    const STATE_SYMBOL = Symbol('$state');
    const LEGACY_PROPS = Symbol('legacy props');
    const LOADING_ATTR_SYMBOL = Symbol('');

    /** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
    const STALE_REACTION = new (class StaleReactionError extends Error {
    	name = 'StaleReactionError';
    	message = 'The reaction that called `getAbortSignal()` was re-run or destroyed';
    })();
    const TEXT_NODE = 3;
    const COMMENT_NODE = 8;

    /* This file is generated by scripts/process-messages/index.js. Do not edit! */


    /**
     * `%name%(...)` can only be used during component initialisation
     * @param {string} name
     * @returns {never}
     */
    function lifecycle_outside_component(name) {
    	{
    		throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
    	}
    }

    /* This file is generated by scripts/process-messages/index.js. Do not edit! */


    /**
     * Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
     * @returns {never}
     */
    function async_derived_orphan() {
    	{
    		throw new Error(`https://svelte.dev/e/async_derived_orphan`);
    	}
    }

    /**
     * `%rune%` cannot be used inside an effect cleanup function
     * @param {string} rune
     * @returns {never}
     */
    function effect_in_teardown(rune) {
    	{
    		throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    	}
    }

    /**
     * Effect cannot be created inside a `$derived` value that was not itself created inside an effect
     * @returns {never}
     */
    function effect_in_unowned_derived() {
    	{
    		throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    	}
    }

    /**
     * `%rune%` can only be used inside an effect (e.g. during component initialisation)
     * @param {string} rune
     * @returns {never}
     */
    function effect_orphan(rune) {
    	{
    		throw new Error(`https://svelte.dev/e/effect_orphan`);
    	}
    }

    /**
     * Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
     * @returns {never}
     */
    function effect_update_depth_exceeded() {
    	{
    		throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    	}
    }

    /**
     * Failed to hydrate the application
     * @returns {never}
     */
    function hydration_failed() {
    	{
    		throw new Error(`https://svelte.dev/e/hydration_failed`);
    	}
    }

    /**
     * Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
     * @param {string} key
     * @returns {never}
     */
    function props_invalid_value(key) {
    	{
    		throw new Error(`https://svelte.dev/e/props_invalid_value`);
    	}
    }

    /**
     * Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
     * @returns {never}
     */
    function state_descriptors_fixed() {
    	{
    		throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    	}
    }

    /**
     * Cannot set prototype of `$state` object
     * @returns {never}
     */
    function state_prototype_fixed() {
    	{
    		throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    	}
    }

    /**
     * Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
     * @returns {never}
     */
    function state_unsafe_mutation() {
    	{
    		throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    	}
    }

    /**
     * A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
     * @returns {never}
     */
    function svelte_boundary_reset_onerror() {
    	{
    		throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
    	}
    }

    /* This file is generated by scripts/process-messages/index.js. Do not edit! */


    /**
     * Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
     * @param {string | undefined | null} [location]
     */
    function hydration_mismatch(location) {
    	{
    		console.warn(`https://svelte.dev/e/hydration_mismatch`);
    	}
    }

    /**
     * The `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.
     */
    function select_multiple_invalid_value() {
    	{
    		console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
    	}
    }

    /**
     * A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
     */
    function svelte_boundary_reset_noop() {
    	{
    		console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
    	}
    }

    /** @import { TemplateNode } from '#client' */


    /**
     * Use this variable to guard everything related to hydration code so it can be treeshaken out
     * if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
     */
    let hydrating = false;

    /** @param {boolean} value */
    function set_hydrating(value) {
    	hydrating = value;
    }

    /**
     * The node that is currently being hydrated. This starts out as the first node inside the opening
     * <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
     * When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
     * time we leave the block it is the closing comment, which serves as the block's anchor.
     * @type {TemplateNode}
     */
    let hydrate_node;

    /** @param {TemplateNode | null} node */
    function set_hydrate_node(node) {
    	if (node === null) {
    		hydration_mismatch();
    		throw HYDRATION_ERROR;
    	}

    	return (hydrate_node = node);
    }

    function hydrate_next() {
    	return set_hydrate_node(get_next_sibling(hydrate_node));
    }

    /** @param {TemplateNode} node */
    function reset(node) {
    	if (!hydrating) return;

    	// If the node has remaining siblings, something has gone wrong
    	if (get_next_sibling(hydrate_node) !== null) {
    		hydration_mismatch();
    		throw HYDRATION_ERROR;
    	}

    	hydrate_node = node;
    }

    function next(count = 1) {
    	if (hydrating) {
    		var i = count;
    		var node = hydrate_node;

    		while (i--) {
    			node = /** @type {TemplateNode} */ (get_next_sibling(node));
    		}

    		hydrate_node = node;
    	}
    }

    /**
     * Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
     * @param {boolean} remove
     */
    function skip_nodes(remove = true) {
    	var depth = 0;
    	var node = hydrate_node;

    	while (true) {
    		if (node.nodeType === COMMENT_NODE) {
    			var data = /** @type {Comment} */ (node).data;

    			if (data === HYDRATION_END) {
    				if (depth === 0) return node;
    				depth -= 1;
    			} else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
    				depth += 1;
    			}
    		}

    		var next = /** @type {TemplateNode} */ (get_next_sibling(node));
    		if (remove) node.remove();
    		node = next;
    	}
    }

    /**
     *
     * @param {TemplateNode} node
     */
    function read_hydration_instruction(node) {
    	if (!node || node.nodeType !== COMMENT_NODE) {
    		hydration_mismatch();
    		throw HYDRATION_ERROR;
    	}

    	return /** @type {Comment} */ (node).data;
    }

    /** @import { Equals } from '#client' */

    /** @type {Equals} */
    function equals(value) {
    	return value === this.v;
    }

    /**
     * @param {unknown} a
     * @param {unknown} b
     * @returns {boolean}
     */
    function safe_not_equal(a, b) {
    	return a != a
    		? b == b
    		: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
    }

    /** @type {Equals} */
    function safe_equals(value) {
    	return !safe_not_equal(value, this.v);
    }

    /** True if experimental.async=true */
    /** True if we're not certain that we only have Svelte 5 code in the compilation */
    let legacy_mode_flag = false;
    /** True if $inspect.trace is used */
    let tracing_mode_flag = false;

    function enable_legacy_mode_flag() {
    	legacy_mode_flag = true;
    }

    /** @import { ComponentContext, DevStackEntry, Effect } from '#client' */

    /** @type {ComponentContext | null} */
    let component_context = null;

    /** @param {ComponentContext | null} context */
    function set_component_context(context) {
    	component_context = context;
    }

    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
     *
     * @template T
     * @param {any} key
     * @returns {T}
     */
    function getContext(key) {
    	const context_map = get_or_init_context_map();
    	const result = /** @type {T} */ (context_map.get(key));
    	return result;
    }

    /**
     * @param {Record<string, unknown>} props
     * @param {any} runes
     * @param {Function} [fn]
     * @returns {void}
     */
    function push(props, runes = false, fn) {
    	component_context = {
    		p: component_context,
    		i: false,
    		c: null,
    		e: null,
    		s: props,
    		x: null,
    		l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
    	};
    }

    /**
     * @template {Record<string, any>} T
     * @param {T} [component]
     * @returns {T}
     */
    function pop(component) {
    	var context = /** @type {ComponentContext} */ (component_context);
    	var effects = context.e;

    	if (effects !== null) {
    		context.e = null;

    		for (var fn of effects) {
    			create_user_effect(fn);
    		}
    	}

    	if (component !== undefined) {
    		context.x = component;
    	}

    	context.i = true;

    	component_context = context.p;

    	return component ?? /** @type {T} */ ({});
    }

    /** @returns {boolean} */
    function is_runes() {
    	return !legacy_mode_flag || (component_context !== null && component_context.l === null);
    }

    /**
     * @param {string} name
     * @returns {Map<unknown, unknown>}
     */
    function get_or_init_context_map(name) {
    	if (component_context === null) {
    		lifecycle_outside_component();
    	}

    	return (component_context.c ??= new Map(get_parent_context(component_context) || undefined));
    }

    /**
     * @param {ComponentContext} component_context
     * @returns {Map<unknown, unknown> | null}
     */
    function get_parent_context(component_context) {
    	let parent = component_context.p;
    	while (parent !== null) {
    		const context_map = parent.c;
    		if (context_map !== null) {
    			return context_map;
    		}
    		parent = parent.p;
    	}
    	return null;
    }

    /** @type {Array<() => void>} */
    let micro_tasks = [];

    function run_micro_tasks() {
    	var tasks = micro_tasks;
    	micro_tasks = [];
    	run_all(tasks);
    }

    /**
     * @param {() => void} fn
     */
    function queue_micro_task(fn) {
    	if (micro_tasks.length === 0 && !is_flushing_sync) {
    		var tasks = micro_tasks;
    		queueMicrotask(() => {
    			// If this is false, a flushSync happened in the meantime. Do _not_ run new scheduled microtasks in that case
    			// as the ordering of microtasks would be broken at that point - consider this case:
    			// - queue_micro_task schedules microtask A to flush task X
    			// - synchronously after, flushSync runs, processing task X
    			// - synchronously after, some other microtask B is scheduled, but not through queue_micro_task but for example a Promise.resolve() in user code
    			// - synchronously after, queue_micro_task schedules microtask C to flush task Y
    			// - one tick later, microtask A now resolves, flushing task Y before microtask B, which is incorrect
    			// This if check prevents that race condition (that realistically will only happen in tests)
    			if (tasks === micro_tasks) run_micro_tasks();
    		});
    	}

    	micro_tasks.push(fn);
    }

    /**
     * Synchronously run any queued tasks.
     */
    function flush_tasks() {
    	while (micro_tasks.length > 0) {
    		run_micro_tasks();
    	}
    }

    /** @import { Derived, Effect } from '#client' */
    /** @import { Boundary } from './dom/blocks/boundary.js' */

    /**
     * @param {unknown} error
     */
    function handle_error(error) {
    	var effect = active_effect;

    	// for unowned deriveds, don't throw until we read the value
    	if (effect === null) {
    		/** @type {Derived} */ (active_reaction).f |= ERROR_VALUE;
    		return error;
    	}

    	if ((effect.f & EFFECT_RAN) === 0) {
    		// if the error occurred while creating this subtree, we let it
    		// bubble up until it hits a boundary that can handle it
    		if ((effect.f & BOUNDARY_EFFECT) === 0) {

    			throw error;
    		}

    		/** @type {Boundary} */ (effect.b).error(error);
    	} else {
    		// otherwise we bubble up the effect tree ourselves
    		invoke_error_boundary(error, effect);
    	}
    }

    /**
     * @param {unknown} error
     * @param {Effect | null} effect
     */
    function invoke_error_boundary(error, effect) {
    	while (effect !== null) {
    		if ((effect.f & BOUNDARY_EFFECT) !== 0) {
    			try {
    				/** @type {Boundary} */ (effect.b).error(error);
    				return;
    			} catch (e) {
    				error = e;
    			}
    		}

    		effect = effect.parent;
    	}

    	throw error;
    }

    /** @import { Fork } from 'svelte' */
    /** @import { Derived, Effect, Reaction, Source, Value } from '#client' */

    /**
     * @typedef {{
     *   parent: EffectTarget | null;
     *   effect: Effect | null;
     *   effects: Effect[];
     *   render_effects: Effect[];
     * }} EffectTarget
     */

    /** @type {Set<Batch>} */
    const batches = new Set();

    /** @type {Batch | null} */
    let current_batch = null;

    /**
     * When time travelling (i.e. working in one batch, while other batches
     * still have ongoing work), we ignore the real values of affected
     * signals in favour of their values within the batch
     * @type {Map<Value, any> | null}
     */
    let batch_values = null;

    // TODO this should really be a property of `batch`
    /** @type {Effect[]} */
    let queued_root_effects = [];

    /** @type {Effect | null} */
    let last_scheduled_effect = null;

    let is_flushing = false;
    let is_flushing_sync = false;

    class Batch {
    	committed = false;

    	/**
    	 * The current values of any sources that are updated in this batch
    	 * They keys of this map are identical to `this.#previous`
    	 * @type {Map<Source, any>}
    	 */
    	current = new Map();

    	/**
    	 * The values of any sources that are updated in this batch _before_ those updates took place.
    	 * They keys of this map are identical to `this.#current`
    	 * @type {Map<Source, any>}
    	 */
    	previous = new Map();

    	/**
    	 * When the batch is committed (and the DOM is updated), we need to remove old branches
    	 * and append new ones by calling the functions added inside (if/each/key/etc) blocks
    	 * @type {Set<() => void>}
    	 */
    	#commit_callbacks = new Set();

    	/**
    	 * If a fork is discarded, we need to destroy any effects that are no longer needed
    	 * @type {Set<(batch: Batch) => void>}
    	 */
    	#discard_callbacks = new Set();

    	/**
    	 * The number of async effects that are currently in flight
    	 */
    	#pending = 0;

    	/**
    	 * The number of async effects that are currently in flight, _not_ inside a pending boundary
    	 */
    	#blocking_pending = 0;

    	/**
    	 * A deferred that resolves when the batch is committed, used with `settled()`
    	 * TODO replace with Promise.withResolvers once supported widely enough
    	 * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
    	 */
    	#deferred = null;

    	/**
    	 * Deferred effects (which run after async work has completed) that are DIRTY
    	 * @type {Set<Effect>}
    	 */
    	#dirty_effects = new Set();

    	/**
    	 * Deferred effects that are MAYBE_DIRTY
    	 * @type {Set<Effect>}
    	 */
    	#maybe_dirty_effects = new Set();

    	/**
    	 * A set of branches that still exist, but will be destroyed when this batch
    	 * is committed — we skip over these during `process`
    	 * @type {Set<Effect>}
    	 */
    	skipped_effects = new Set();

    	is_fork = false;

    	is_deferred() {
    		return this.is_fork || this.#blocking_pending > 0;
    	}

    	/**
    	 *
    	 * @param {Effect[]} root_effects
    	 */
    	process(root_effects) {
    		queued_root_effects = [];

    		this.apply();

    		/** @type {EffectTarget} */
    		var target = {
    			parent: null,
    			effect: null,
    			effects: [],
    			render_effects: []
    		};

    		for (const root of root_effects) {
    			this.#traverse_effect_tree(root, target);
    			// Note: #traverse_effect_tree runs block effects eagerly, which can schedule effects,
    			// which means queued_root_effects now may be filled again.

    			// Helpful for debugging reactivity loss that has to do with branches being skipped:
    			// log_inconsistent_branches(root);
    		}

    		if (!this.is_fork) {
    			this.#resolve();
    		}

    		if (this.is_deferred()) {
    			this.#defer_effects(target.effects);
    			this.#defer_effects(target.render_effects);
    		} else {
    			current_batch = null;

    			flush_queued_effects(target.render_effects);
    			flush_queued_effects(target.effects);

    			this.#deferred?.resolve();
    		}

    		batch_values = null;
    	}

    	/**
    	 * Traverse the effect tree, executing effects or stashing
    	 * them for later execution as appropriate
    	 * @param {Effect} root
    	 * @param {EffectTarget} target
    	 */
    	#traverse_effect_tree(root, target) {
    		root.f ^= CLEAN;

    		var effect = root.first;

    		while (effect !== null) {
    			var flags = effect.f;
    			var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    			var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;

    			var skip = is_skippable_branch || (flags & INERT) !== 0 || this.skipped_effects.has(effect);

    			if ((effect.f & BOUNDARY_EFFECT) !== 0 && effect.b?.is_pending()) {
    				target = {
    					parent: target,
    					effect,
    					effects: [],
    					render_effects: []
    				};
    			}

    			if (!skip && effect.fn !== null) {
    				if (is_branch) {
    					effect.f ^= CLEAN;
    				} else if ((flags & EFFECT) !== 0) {
    					target.effects.push(effect);
    				} else if (is_dirty(effect)) {
    					if ((effect.f & BLOCK_EFFECT) !== 0) this.#dirty_effects.add(effect);
    					update_effect(effect);
    				}

    				var child = effect.first;

    				if (child !== null) {
    					effect = child;
    					continue;
    				}
    			}

    			var parent = effect.parent;
    			effect = effect.next;

    			while (effect === null && parent !== null) {
    				if (parent === target.effect) {
    					// TODO rather than traversing into pending boundaries and deferring the effects,
    					// could we just attach the effects _to_ the pending boundary and schedule them
    					// once the boundary is ready?
    					this.#defer_effects(target.effects);
    					this.#defer_effects(target.render_effects);

    					target = /** @type {EffectTarget} */ (target.parent);
    				}

    				effect = parent.next;
    				parent = parent.parent;
    			}
    		}
    	}

    	/**
    	 * @param {Effect[]} effects
    	 */
    	#defer_effects(effects) {
    		for (const e of effects) {
    			if ((e.f & DIRTY) !== 0) {
    				this.#dirty_effects.add(e);
    			} else if ((e.f & MAYBE_DIRTY) !== 0) {
    				this.#maybe_dirty_effects.add(e);
    			}

    			// Since we're not executing these effects now, we need to clear any WAS_MARKED flags
    			// so that other batches can correctly reach these effects during their own traversal
    			this.#clear_marked(e.deps);

    			// mark as clean so they get scheduled if they depend on pending async state
    			set_signal_status(e, CLEAN);
    		}
    	}

    	/**
    	 * @param {Value[] | null} deps
    	 */
    	#clear_marked(deps) {
    		if (deps === null) return;

    		for (const dep of deps) {
    			if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
    				continue;
    			}

    			dep.f ^= WAS_MARKED;

    			this.#clear_marked(/** @type {Derived} */ (dep).deps);
    		}
    	}

    	/**
    	 * Associate a change to a given source with the current
    	 * batch, noting its previous and current values
    	 * @param {Source} source
    	 * @param {any} value
    	 */
    	capture(source, value) {
    		if (!this.previous.has(source)) {
    			this.previous.set(source, value);
    		}

    		// Don't save errors in `batch_values`, or they won't be thrown in `runtime.js#get`
    		if ((source.f & ERROR_VALUE) === 0) {
    			this.current.set(source, source.v);
    			batch_values?.set(source, source.v);
    		}
    	}

    	activate() {
    		current_batch = this;
    		this.apply();
    	}

    	deactivate() {
    		// If we're not the current batch, don't deactivate,
    		// else we could create zombie batches that are never flushed
    		if (current_batch !== this) return;

    		current_batch = null;
    		batch_values = null;
    	}

    	flush() {
    		this.activate();

    		if (queued_root_effects.length > 0) {
    			flush_effects();

    			if (current_batch !== null && current_batch !== this) {
    				// this can happen if a new batch was created during `flush_effects()`
    				return;
    			}
    		} else if (this.#pending === 0) {
    			this.process([]); // TODO this feels awkward
    		}

    		this.deactivate();
    	}

    	discard() {
    		for (const fn of this.#discard_callbacks) fn(this);
    		this.#discard_callbacks.clear();
    	}

    	#resolve() {
    		if (this.#blocking_pending === 0) {
    			// append/remove branches
    			for (const fn of this.#commit_callbacks) fn();
    			this.#commit_callbacks.clear();
    		}

    		if (this.#pending === 0) {
    			this.#commit();
    		}
    	}

    	#commit() {
    		// If there are other pending batches, they now need to be 'rebased' —
    		// in other words, we re-run block/async effects with the newly
    		// committed state, unless the batch in question has a more
    		// recent value for a given source
    		if (batches.size > 1) {
    			this.previous.clear();

    			var previous_batch_values = batch_values;
    			var is_earlier = true;

    			/** @type {EffectTarget} */
    			var dummy_target = {
    				parent: null,
    				effect: null,
    				effects: [],
    				render_effects: []
    			};

    			for (const batch of batches) {
    				if (batch === this) {
    					is_earlier = false;
    					continue;
    				}

    				/** @type {Source[]} */
    				const sources = [];

    				for (const [source, value] of this.current) {
    					if (batch.current.has(source)) {
    						if (is_earlier && value !== batch.current.get(source)) {
    							// bring the value up to date
    							batch.current.set(source, value);
    						} else {
    							// same value or later batch has more recent value,
    							// no need to re-run these effects
    							continue;
    						}
    					}

    					sources.push(source);
    				}

    				if (sources.length === 0) {
    					continue;
    				}

    				// Re-run async/block effects that depend on distinct values changed in both batches
    				const others = [...batch.current.keys()].filter((s) => !this.current.has(s));
    				if (others.length > 0) {
    					// Avoid running queued root effects on the wrong branch
    					var prev_queued_root_effects = queued_root_effects;
    					queued_root_effects = [];

    					/** @type {Set<Value>} */
    					const marked = new Set();
    					/** @type {Map<Reaction, boolean>} */
    					const checked = new Map();
    					for (const source of sources) {
    						mark_effects(source, others, marked, checked);
    					}

    					if (queued_root_effects.length > 0) {
    						current_batch = batch;
    						batch.apply();

    						for (const root of queued_root_effects) {
    							batch.#traverse_effect_tree(root, dummy_target);
    						}

    						// TODO do we need to do anything with `target`? defer block effects?

    						batch.deactivate();
    					}

    					queued_root_effects = prev_queued_root_effects;
    				}
    			}

    			current_batch = null;
    			batch_values = previous_batch_values;
    		}

    		this.committed = true;
    		batches.delete(this);
    	}

    	/**
    	 *
    	 * @param {boolean} blocking
    	 */
    	increment(blocking) {
    		this.#pending += 1;
    		if (blocking) this.#blocking_pending += 1;
    	}

    	/**
    	 *
    	 * @param {boolean} blocking
    	 */
    	decrement(blocking) {
    		this.#pending -= 1;
    		if (blocking) this.#blocking_pending -= 1;

    		this.revive();
    	}

    	revive() {
    		for (const e of this.#dirty_effects) {
    			this.#maybe_dirty_effects.delete(e);
    			set_signal_status(e, DIRTY);
    			schedule_effect(e);
    		}

    		for (const e of this.#maybe_dirty_effects) {
    			set_signal_status(e, MAYBE_DIRTY);
    			schedule_effect(e);
    		}

    		this.flush();
    	}

    	/** @param {() => void} fn */
    	oncommit(fn) {
    		this.#commit_callbacks.add(fn);
    	}

    	/** @param {(batch: Batch) => void} fn */
    	ondiscard(fn) {
    		this.#discard_callbacks.add(fn);
    	}

    	settled() {
    		return (this.#deferred ??= deferred()).promise;
    	}

    	static ensure() {
    		if (current_batch === null) {
    			const batch = (current_batch = new Batch());
    			batches.add(current_batch);

    			if (!is_flushing_sync) {
    				Batch.enqueue(() => {
    					if (current_batch !== batch) {
    						// a flushSync happened in the meantime
    						return;
    					}

    					batch.flush();
    				});
    			}
    		}

    		return current_batch;
    	}

    	/** @param {() => void} task */
    	static enqueue(task) {
    		queue_micro_task(task);
    	}

    	apply() {
    		return;
    	}
    }

    /**
     * Synchronously flush any pending updates.
     * Returns void if no callback is provided, otherwise returns the result of calling the callback.
     * @template [T=void]
     * @param {(() => T) | undefined} [fn]
     * @returns {T}
     */
    function flushSync(fn) {
    	var was_flushing_sync = is_flushing_sync;
    	is_flushing_sync = true;

    	try {
    		var result;

    		if (fn) ;

    		while (true) {
    			flush_tasks();

    			if (queued_root_effects.length === 0) {
    				current_batch?.flush();

    				// we need to check again, in case we just updated an `$effect.pending()`
    				if (queued_root_effects.length === 0) {
    					// this would be reset in `flush_effects()` but since we are early returning here,
    					// we need to reset it here as well in case the first time there's 0 queued root effects
    					last_scheduled_effect = null;

    					return /** @type {T} */ (result);
    				}
    			}

    			flush_effects();
    		}
    	} finally {
    		is_flushing_sync = was_flushing_sync;
    	}
    }

    function flush_effects() {
    	var was_updating_effect = is_updating_effect;
    	is_flushing = true;

    	var source_stacks = null;

    	try {
    		var flush_count = 0;
    		set_is_updating_effect(true);

    		while (queued_root_effects.length > 0) {
    			var batch = Batch.ensure();

    			if (flush_count++ > 1000) {
    				var updates, entry; if (DEV) ;

    				infinite_loop_guard();
    			}

    			batch.process(queued_root_effects);
    			old_values.clear();

    			if (DEV) ;
    		}
    	} finally {
    		is_flushing = false;
    		set_is_updating_effect(was_updating_effect);

    		last_scheduled_effect = null;
    	}
    }

    function infinite_loop_guard() {
    	try {
    		effect_update_depth_exceeded();
    	} catch (error) {

    		// Best effort: invoke the boundary nearest the most recent
    		// effect and hope that it's relevant to the infinite loop
    		invoke_error_boundary(error, last_scheduled_effect);
    	}
    }

    /** @type {Set<Effect> | null} */
    let eager_block_effects = null;

    /**
     * @param {Array<Effect>} effects
     * @returns {void}
     */
    function flush_queued_effects(effects) {
    	var length = effects.length;
    	if (length === 0) return;

    	var i = 0;

    	while (i < length) {
    		var effect = effects[i++];

    		if ((effect.f & (DESTROYED | INERT)) === 0 && is_dirty(effect)) {
    			eager_block_effects = new Set();

    			update_effect(effect);

    			// Effects with no dependencies or teardown do not get added to the effect tree.
    			// Deferred effects (e.g. `$effect(...)`) _are_ added to the tree because we
    			// don't know if we need to keep them until they are executed. Doing the check
    			// here (rather than in `update_effect`) allows us to skip the work for
    			// immediate effects.
    			if (effect.deps === null && effect.first === null && effect.nodes === null) {
    				// if there's no teardown or abort controller we completely unlink
    				// the effect from the graph
    				if (effect.teardown === null && effect.ac === null) {
    					// remove this effect from the graph
    					unlink_effect(effect);
    				} else {
    					// keep the effect in the graph, but free up some memory
    					effect.fn = null;
    				}
    			}

    			// If update_effect() has a flushSync() in it, we may have flushed another flush_queued_effects(),
    			// which already handled this logic and did set eager_block_effects to null.
    			if (eager_block_effects?.size > 0) {
    				old_values.clear();

    				for (const e of eager_block_effects) {
    					// Skip eager effects that have already been unmounted
    					if ((e.f & (DESTROYED | INERT)) !== 0) continue;

    					// Run effects in order from ancestor to descendant, else we could run into nullpointers
    					/** @type {Effect[]} */
    					const ordered_effects = [e];
    					let ancestor = e.parent;
    					while (ancestor !== null) {
    						if (eager_block_effects.has(ancestor)) {
    							eager_block_effects.delete(ancestor);
    							ordered_effects.push(ancestor);
    						}
    						ancestor = ancestor.parent;
    					}

    					for (let j = ordered_effects.length - 1; j >= 0; j--) {
    						const e = ordered_effects[j];
    						// Skip eager effects that have already been unmounted
    						if ((e.f & (DESTROYED | INERT)) !== 0) continue;
    						update_effect(e);
    					}
    				}

    				eager_block_effects.clear();
    			}
    		}
    	}

    	eager_block_effects = null;
    }

    /**
     * This is similar to `mark_reactions`, but it only marks async/block effects
     * depending on `value` and at least one of the other `sources`, so that
     * these effects can re-run after another batch has been committed
     * @param {Value} value
     * @param {Source[]} sources
     * @param {Set<Value>} marked
     * @param {Map<Reaction, boolean>} checked
     */
    function mark_effects(value, sources, marked, checked) {
    	if (marked.has(value)) return;
    	marked.add(value);

    	if (value.reactions !== null) {
    		for (const reaction of value.reactions) {
    			const flags = reaction.f;

    			if ((flags & DERIVED) !== 0) {
    				mark_effects(/** @type {Derived} */ (reaction), sources, marked, checked);
    			} else if (
    				(flags & (ASYNC | BLOCK_EFFECT)) !== 0 &&
    				(flags & DIRTY) === 0 &&
    				depends_on(reaction, sources, checked)
    			) {
    				set_signal_status(reaction, DIRTY);
    				schedule_effect(/** @type {Effect} */ (reaction));
    			}
    		}
    	}
    }

    /**
     * @param {Reaction} reaction
     * @param {Source[]} sources
     * @param {Map<Reaction, boolean>} checked
     */
    function depends_on(reaction, sources, checked) {
    	const depends = checked.get(reaction);
    	if (depends !== undefined) return depends;

    	if (reaction.deps !== null) {
    		for (const dep of reaction.deps) {
    			if (sources.includes(dep)) {
    				return true;
    			}

    			if ((dep.f & DERIVED) !== 0 && depends_on(/** @type {Derived} */ (dep), sources, checked)) {
    				checked.set(/** @type {Derived} */ (dep), true);
    				return true;
    			}
    		}
    	}

    	checked.set(reaction, false);

    	return false;
    }

    /**
     * @param {Effect} signal
     * @returns {void}
     */
    function schedule_effect(signal) {
    	var effect = (last_scheduled_effect = signal);

    	while (effect.parent !== null) {
    		effect = effect.parent;
    		var flags = effect.f;

    		// if the effect is being scheduled because a parent (each/await/etc) block
    		// updated an internal source, bail out or we'll cause a second flush
    		if (
    			is_flushing &&
    			effect === active_effect &&
    			(flags & BLOCK_EFFECT) !== 0 &&
    			(flags & HEAD_EFFECT) === 0
    		) {
    			return;
    		}

    		if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
    			if ((flags & CLEAN) === 0) return;
    			effect.f ^= CLEAN;
    		}
    	}

    	queued_root_effects.push(effect);
    }

    /**
     * Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
     * It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
     *
     * If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
     * the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
     *
     * If `start` returns a cleanup function, it will be called when the effect is destroyed.
     *
     * If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
     * are active, and the returned teardown function will only be called when all effects are destroyed.
     *
     * It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
     *
     * ```js
     * import { createSubscriber } from 'svelte/reactivity';
     * import { on } from 'svelte/events';
     *
     * export class MediaQuery {
     * 	#query;
     * 	#subscribe;
     *
     * 	constructor(query) {
     * 		this.#query = window.matchMedia(`(${query})`);
     *
     * 		this.#subscribe = createSubscriber((update) => {
     * 			// when the `change` event occurs, re-run any effects that read `this.current`
     * 			const off = on(this.#query, 'change', update);
     *
     * 			// stop listening when all the effects are destroyed
     * 			return () => off();
     * 		});
     * 	}
     *
     * 	get current() {
     * 		// This makes the getter reactive, if read in an effect
     * 		this.#subscribe();
     *
     * 		// Return the current state of the query, whether or not we're in an effect
     * 		return this.#query.matches;
     * 	}
     * }
     * ```
     * @param {(update: () => void) => (() => void) | void} start
     * @since 5.7.0
     */
    function createSubscriber(start) {
    	let subscribers = 0;
    	let version = source(0);
    	/** @type {(() => void) | void} */
    	let stop;

    	return () => {
    		if (effect_tracking()) {
    			get(version);

    			render_effect(() => {
    				if (subscribers === 0) {
    					stop = untrack(() => start(() => increment(version)));
    				}

    				subscribers += 1;

    				return () => {
    					queue_micro_task(() => {
    						// Only count down after a microtask, else we would reach 0 before our own render effect reruns,
    						// but reach 1 again when the tick callback of the prior teardown runs. That would mean we
    						// re-subcribe unnecessarily and create a memory leak because the old subscription is never cleaned up.
    						subscribers -= 1;

    						if (subscribers === 0) {
    							stop?.();
    							stop = undefined;
    							// Increment the version to ensure any dependent deriveds are marked dirty when the subscription is picked up again later.
    							// If we didn't do this then the comparison of write versions would determine that the derived has a later version than
    							// the subscriber, and it would not be re-run.
    							increment(version);
    						}
    					});
    				};
    			});
    		}
    	};
    }

    /** @import { Effect, Source, TemplateNode, } from '#client' */

    /**
     * @typedef {{
     * 	 onerror?: (error: unknown, reset: () => void) => void;
     *   failed?: (anchor: Node, error: () => unknown, reset: () => () => void) => void;
     *   pending?: (anchor: Node) => void;
     * }} BoundaryProps
     */

    var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED | BOUNDARY_EFFECT;

    /**
     * @param {TemplateNode} node
     * @param {BoundaryProps} props
     * @param {((anchor: Node) => void)} children
     * @returns {void}
     */
    function boundary(node, props, children) {
    	new Boundary(node, props, children);
    }

    class Boundary {
    	/** @type {Boundary | null} */
    	parent;

    	#pending = false;

    	/** @type {TemplateNode} */
    	#anchor;

    	/** @type {TemplateNode | null} */
    	#hydrate_open = hydrating ? hydrate_node : null;

    	/** @type {BoundaryProps} */
    	#props;

    	/** @type {((anchor: Node) => void)} */
    	#children;

    	/** @type {Effect} */
    	#effect;

    	/** @type {Effect | null} */
    	#main_effect = null;

    	/** @type {Effect | null} */
    	#pending_effect = null;

    	/** @type {Effect | null} */
    	#failed_effect = null;

    	/** @type {DocumentFragment | null} */
    	#offscreen_fragment = null;

    	/** @type {TemplateNode | null} */
    	#pending_anchor = null;

    	#local_pending_count = 0;
    	#pending_count = 0;

    	#is_creating_fallback = false;

    	/**
    	 * A source containing the number of pending async deriveds/expressions.
    	 * Only created if `$effect.pending()` is used inside the boundary,
    	 * otherwise updating the source results in needless `Batch.ensure()`
    	 * calls followed by no-op flushes
    	 * @type {Source<number> | null}
    	 */
    	#effect_pending = null;

    	#effect_pending_subscriber = createSubscriber(() => {
    		this.#effect_pending = source(this.#local_pending_count);

    		return () => {
    			this.#effect_pending = null;
    		};
    	});

    	/**
    	 * @param {TemplateNode} node
    	 * @param {BoundaryProps} props
    	 * @param {((anchor: Node) => void)} children
    	 */
    	constructor(node, props, children) {
    		this.#anchor = node;
    		this.#props = props;
    		this.#children = children;

    		this.parent = /** @type {Effect} */ (active_effect).b;

    		this.#pending = !!this.#props.pending;

    		this.#effect = block(() => {
    			/** @type {Effect} */ (active_effect).b = this;

    			if (hydrating) {
    				const comment = this.#hydrate_open;
    				hydrate_next();

    				const server_rendered_pending =
    					/** @type {Comment} */ (comment).nodeType === COMMENT_NODE &&
    					/** @type {Comment} */ (comment).data === HYDRATION_START_ELSE;

    				if (server_rendered_pending) {
    					this.#hydrate_pending_content();
    				} else {
    					this.#hydrate_resolved_content();
    				}
    			} else {
    				var anchor = this.#get_anchor();

    				try {
    					this.#main_effect = branch(() => children(anchor));
    				} catch (error) {
    					this.error(error);
    				}

    				if (this.#pending_count > 0) {
    					this.#show_pending_snippet();
    				} else {
    					this.#pending = false;
    				}
    			}

    			return () => {
    				this.#pending_anchor?.remove();
    			};
    		}, flags);

    		if (hydrating) {
    			this.#anchor = hydrate_node;
    		}
    	}

    	#hydrate_resolved_content() {
    		try {
    			this.#main_effect = branch(() => this.#children(this.#anchor));
    		} catch (error) {
    			this.error(error);
    		}

    		// Since server rendered resolved content, we never show pending state
    		// Even if client-side async operations are still running, the content is already displayed
    		this.#pending = false;
    	}

    	#hydrate_pending_content() {
    		const pending = this.#props.pending;
    		if (!pending) {
    			return;
    		}
    		this.#pending_effect = branch(() => pending(this.#anchor));

    		Batch.enqueue(() => {
    			var anchor = this.#get_anchor();

    			this.#main_effect = this.#run(() => {
    				Batch.ensure();
    				return branch(() => this.#children(anchor));
    			});

    			if (this.#pending_count > 0) {
    				this.#show_pending_snippet();
    			} else {
    				pause_effect(/** @type {Effect} */ (this.#pending_effect), () => {
    					this.#pending_effect = null;
    				});

    				this.#pending = false;
    			}
    		});
    	}

    	#get_anchor() {
    		var anchor = this.#anchor;

    		if (this.#pending) {
    			this.#pending_anchor = create_text();
    			this.#anchor.before(this.#pending_anchor);

    			anchor = this.#pending_anchor;
    		}

    		return anchor;
    	}

    	/**
    	 * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
    	 * @returns {boolean}
    	 */
    	is_pending() {
    		return this.#pending || (!!this.parent && this.parent.is_pending());
    	}

    	has_pending_snippet() {
    		return !!this.#props.pending;
    	}

    	/**
    	 * @param {() => Effect | null} fn
    	 */
    	#run(fn) {
    		var previous_effect = active_effect;
    		var previous_reaction = active_reaction;
    		var previous_ctx = component_context;

    		set_active_effect(this.#effect);
    		set_active_reaction(this.#effect);
    		set_component_context(this.#effect.ctx);

    		try {
    			return fn();
    		} catch (e) {
    			handle_error(e);
    			return null;
    		} finally {
    			set_active_effect(previous_effect);
    			set_active_reaction(previous_reaction);
    			set_component_context(previous_ctx);
    		}
    	}

    	#show_pending_snippet() {
    		const pending = /** @type {(anchor: Node) => void} */ (this.#props.pending);

    		if (this.#main_effect !== null) {
    			this.#offscreen_fragment = document.createDocumentFragment();
    			this.#offscreen_fragment.append(/** @type {TemplateNode} */ (this.#pending_anchor));
    			move_effect(this.#main_effect, this.#offscreen_fragment);
    		}

    		if (this.#pending_effect === null) {
    			this.#pending_effect = branch(() => pending(this.#anchor));
    		}
    	}

    	/**
    	 * Updates the pending count associated with the currently visible pending snippet,
    	 * if any, such that we can replace the snippet with content once work is done
    	 * @param {1 | -1} d
    	 */
    	#update_pending_count(d) {
    		if (!this.has_pending_snippet()) {
    			if (this.parent) {
    				this.parent.#update_pending_count(d);
    			}

    			// if there's no parent, we're in a scope with no pending snippet
    			return;
    		}

    		this.#pending_count += d;

    		if (this.#pending_count === 0) {
    			this.#pending = false;

    			if (this.#pending_effect) {
    				pause_effect(this.#pending_effect, () => {
    					this.#pending_effect = null;
    				});
    			}

    			if (this.#offscreen_fragment) {
    				this.#anchor.before(this.#offscreen_fragment);
    				this.#offscreen_fragment = null;
    			}
    		}
    	}

    	/**
    	 * Update the source that powers `$effect.pending()` inside this boundary,
    	 * and controls when the current `pending` snippet (if any) is removed.
    	 * Do not call from inside the class
    	 * @param {1 | -1} d
    	 */
    	update_pending_count(d) {
    		this.#update_pending_count(d);

    		this.#local_pending_count += d;

    		if (this.#effect_pending) {
    			internal_set(this.#effect_pending, this.#local_pending_count);
    		}
    	}

    	get_effect_pending() {
    		this.#effect_pending_subscriber();
    		return get(/** @type {Source<number>} */ (this.#effect_pending));
    	}

    	/** @param {unknown} error */
    	error(error) {
    		var onerror = this.#props.onerror;
    		let failed = this.#props.failed;

    		// If we have nothing to capture the error, or if we hit an error while
    		// rendering the fallback, re-throw for another boundary to handle
    		if (this.#is_creating_fallback || (!onerror && !failed)) {
    			throw error;
    		}

    		if (this.#main_effect) {
    			destroy_effect(this.#main_effect);
    			this.#main_effect = null;
    		}

    		if (this.#pending_effect) {
    			destroy_effect(this.#pending_effect);
    			this.#pending_effect = null;
    		}

    		if (this.#failed_effect) {
    			destroy_effect(this.#failed_effect);
    			this.#failed_effect = null;
    		}

    		if (hydrating) {
    			set_hydrate_node(/** @type {TemplateNode} */ (this.#hydrate_open));
    			next();
    			set_hydrate_node(skip_nodes());
    		}

    		var did_reset = false;
    		var calling_on_error = false;

    		const reset = () => {
    			if (did_reset) {
    				svelte_boundary_reset_noop();
    				return;
    			}

    			did_reset = true;

    			if (calling_on_error) {
    				svelte_boundary_reset_onerror();
    			}

    			// If the failure happened while flushing effects, current_batch can be null
    			Batch.ensure();

    			this.#local_pending_count = 0;

    			if (this.#failed_effect !== null) {
    				pause_effect(this.#failed_effect, () => {
    					this.#failed_effect = null;
    				});
    			}

    			// we intentionally do not try to find the nearest pending boundary. If this boundary has one, we'll render it on reset
    			// but it would be really weird to show the parent's boundary on a child reset.
    			this.#pending = this.has_pending_snippet();

    			this.#main_effect = this.#run(() => {
    				this.#is_creating_fallback = false;
    				return branch(() => this.#children(this.#anchor));
    			});

    			if (this.#pending_count > 0) {
    				this.#show_pending_snippet();
    			} else {
    				this.#pending = false;
    			}
    		};

    		var previous_reaction = active_reaction;

    		try {
    			set_active_reaction(null);
    			calling_on_error = true;
    			onerror?.(error, reset);
    			calling_on_error = false;
    		} catch (error) {
    			invoke_error_boundary(error, this.#effect && this.#effect.parent);
    		} finally {
    			set_active_reaction(previous_reaction);
    		}

    		if (failed) {
    			queue_micro_task(() => {
    				this.#failed_effect = this.#run(() => {
    					Batch.ensure();
    					this.#is_creating_fallback = true;

    					try {
    						return branch(() => {
    							failed(
    								this.#anchor,
    								() => error,
    								() => reset
    							);
    						});
    					} catch (error) {
    						invoke_error_boundary(error, /** @type {Effect} */ (this.#effect.parent));
    						return null;
    					} finally {
    						this.#is_creating_fallback = false;
    					}
    				});
    			});
    		}
    	}
    }

    /** @import { Effect, TemplateNode, Value } from '#client' */

    /**
     * @param {Array<Promise<void>>} blockers
     * @param {Array<() => any>} sync
     * @param {Array<() => Promise<any>>} async
     * @param {(values: Value[]) => any} fn
     */
    function flatten(blockers, sync, async, fn) {
    	const d = is_runes() ? derived : derived_safe_equal;

    	if (async.length === 0 && blockers.length === 0) {
    		fn(sync.map(d));
    		return;
    	}

    	var batch = current_batch;
    	var parent = /** @type {Effect} */ (active_effect);

    	var restore = capture();

    	function run() {
    		Promise.all(async.map((expression) => async_derived(expression)))
    			.then((result) => {
    				restore();

    				try {
    					fn([...sync.map(d), ...result]);
    				} catch (error) {
    					// ignore errors in blocks that have already been destroyed
    					if ((parent.f & DESTROYED) === 0) {
    						invoke_error_boundary(error, parent);
    					}
    				}

    				batch?.deactivate();
    				unset_context();
    			})
    			.catch((error) => {
    				invoke_error_boundary(error, parent);
    			});
    	}

    	if (blockers.length > 0) {
    		Promise.all(blockers).then(() => {
    			restore();

    			try {
    				return run();
    			} finally {
    				batch?.deactivate();
    				unset_context();
    			}
    		});
    	} else {
    		run();
    	}
    }

    /**
     * Captures the current effect context so that we can restore it after
     * some asynchronous work has happened (so that e.g. `await a + b`
     * causes `b` to be registered as a dependency).
     */
    function capture() {
    	var previous_effect = active_effect;
    	var previous_reaction = active_reaction;
    	var previous_component_context = component_context;
    	var previous_batch = current_batch;

    	return function restore(activate_batch = true) {
    		set_active_effect(previous_effect);
    		set_active_reaction(previous_reaction);
    		set_component_context(previous_component_context);
    		if (activate_batch) previous_batch?.activate();
    	};
    }

    function unset_context() {
    	set_active_effect(null);
    	set_active_reaction(null);
    	set_component_context(null);
    }

    /** @import { Derived, Effect, Source } from '#client' */
    /** @import { Batch } from './batch.js'; */

    /**
     * @template V
     * @param {() => V} fn
     * @returns {Derived<V>}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function derived(fn) {
    	var flags = DERIVED | DIRTY;
    	var parent_derived =
    		active_reaction !== null && (active_reaction.f & DERIVED) !== 0
    			? /** @type {Derived} */ (active_reaction)
    			: null;

    	if (active_effect !== null) {
    		// Since deriveds are evaluated lazily, any effects created inside them are
    		// created too late to ensure that the parent effect is added to the tree
    		active_effect.f |= EFFECT_PRESERVED;
    	}

    	/** @type {Derived<V>} */
    	const signal = {
    		ctx: component_context,
    		deps: null,
    		effects: null,
    		equals,
    		f: flags,
    		fn,
    		reactions: null,
    		rv: 0,
    		v: /** @type {V} */ (UNINITIALIZED),
    		wv: 0,
    		parent: parent_derived ?? active_effect,
    		ac: null
    	};

    	return signal;
    }

    /**
     * @template V
     * @param {() => V | Promise<V>} fn
     * @param {string} [location] If provided, print a warning if the value is not read immediately after update
     * @returns {Promise<Source<V>>}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function async_derived(fn, location) {
    	let parent = /** @type {Effect | null} */ (active_effect);

    	if (parent === null) {
    		async_derived_orphan();
    	}

    	var boundary = /** @type {Boundary} */ (parent.b);

    	var promise = /** @type {Promise<V>} */ (/** @type {unknown} */ (undefined));
    	var signal = source(/** @type {V} */ (UNINITIALIZED));

    	// only suspend in async deriveds created on initialisation
    	var should_suspend = !active_reaction;

    	/** @type {Map<Batch, ReturnType<typeof deferred<V>>>} */
    	var deferreds = new Map();

    	async_effect(() => {

    		/** @type {ReturnType<typeof deferred<V>>} */
    		var d = deferred();
    		promise = d.promise;

    		try {
    			// If this code is changed at some point, make sure to still access the then property
    			// of fn() to read any signals it might access, so that we track them as dependencies.
    			// We call `unset_context` to undo any `save` calls that happen inside `fn()`
    			Promise.resolve(fn())
    				.then(d.resolve, d.reject)
    				.then(() => {
    					if (batch === current_batch && batch.committed) {
    						// if the batch was rejected as stale, we need to cleanup
    						// after any `$.save(...)` calls inside `fn()`
    						batch.deactivate();
    					}

    					unset_context();
    				});
    		} catch (error) {
    			d.reject(error);
    			unset_context();
    		}

    		var batch = /** @type {Batch} */ (current_batch);

    		if (should_suspend) {
    			var blocking = !boundary.is_pending();

    			boundary.update_pending_count(1);
    			batch.increment(blocking);

    			deferreds.get(batch)?.reject(STALE_REACTION);
    			deferreds.delete(batch); // delete to ensure correct order in Map iteration below
    			deferreds.set(batch, d);
    		}

    		/**
    		 * @param {any} value
    		 * @param {unknown} error
    		 */
    		const handler = (value, error = undefined) => {

    			batch.activate();

    			if (error) {
    				if (error !== STALE_REACTION) {
    					signal.f |= ERROR_VALUE;

    					// @ts-expect-error the error is the wrong type, but we don't care
    					internal_set(signal, error);
    				}
    			} else {
    				if ((signal.f & ERROR_VALUE) !== 0) {
    					signal.f ^= ERROR_VALUE;
    				}

    				internal_set(signal, value);

    				// All prior async derived runs are now stale
    				for (const [b, d] of deferreds) {
    					deferreds.delete(b);
    					if (b === batch) break;
    					d.reject(STALE_REACTION);
    				}
    			}

    			if (should_suspend) {
    				boundary.update_pending_count(-1);
    				batch.decrement(blocking);
    			}
    		};

    		d.promise.then(handler, (e) => handler(null, e || 'unknown'));
    	});

    	teardown(() => {
    		for (const d of deferreds.values()) {
    			d.reject(STALE_REACTION);
    		}
    	});

    	return new Promise((fulfil) => {
    		/** @param {Promise<V>} p */
    		function next(p) {
    			function go() {
    				if (p === promise) {
    					fulfil(signal);
    				} else {
    					// if the effect re-runs before the initial promise
    					// resolves, delay resolution until we have a value
    					next(promise);
    				}
    			}

    			p.then(go, go);
    		}

    		next(promise);
    	});
    }

    /**
     * @template V
     * @param {() => V} fn
     * @returns {Derived<V>}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function user_derived(fn) {
    	const d = derived(fn);

    	push_reaction_value(d);

    	return d;
    }

    /**
     * @template V
     * @param {() => V} fn
     * @returns {Derived<V>}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function derived_safe_equal(fn) {
    	const signal = derived(fn);
    	signal.equals = safe_equals;
    	return signal;
    }

    /**
     * @param {Derived} derived
     * @returns {void}
     */
    function destroy_derived_effects(derived) {
    	var effects = derived.effects;

    	if (effects !== null) {
    		derived.effects = null;

    		for (var i = 0; i < effects.length; i += 1) {
    			destroy_effect(/** @type {Effect} */ (effects[i]));
    		}
    	}
    }

    /**
     * @param {Derived} derived
     * @returns {Effect | null}
     */
    function get_derived_parent_effect(derived) {
    	var parent = derived.parent;
    	while (parent !== null) {
    		if ((parent.f & DERIVED) === 0) {
    			// The original parent effect might've been destroyed but the derived
    			// is used elsewhere now - do not return the destroyed effect in that case
    			return (parent.f & DESTROYED) === 0 ? /** @type {Effect} */ (parent) : null;
    		}
    		parent = parent.parent;
    	}
    	return null;
    }

    /**
     * @template T
     * @param {Derived} derived
     * @returns {T}
     */
    function execute_derived(derived) {
    	var value;
    	var prev_active_effect = active_effect;

    	set_active_effect(get_derived_parent_effect(derived));

    	{
    		try {
    			derived.f &= ~WAS_MARKED;
    			destroy_derived_effects(derived);
    			value = update_reaction(derived);
    		} finally {
    			set_active_effect(prev_active_effect);
    		}
    	}

    	return value;
    }

    /**
     * @param {Derived} derived
     * @returns {void}
     */
    function update_derived(derived) {
    	var value = execute_derived(derived);

    	if (!derived.equals(value)) {
    		// in a fork, we don't update the underlying value, just `batch_values`.
    		// the underlying value will be updated when the fork is committed.
    		// otherwise, the next time we get here after a 'real world' state
    		// change, `derived.equals` may incorrectly return `true`
    		if (!current_batch?.is_fork) {
    			derived.v = value;
    		}

    		derived.wv = increment_write_version();
    	}

    	// don't mark derived clean if we're reading it inside a
    	// cleanup function, or it will cache a stale value
    	if (is_destroying_effect) {
    		return;
    	}

    	// During time traveling we don't want to reset the status so that
    	// traversal of the graph in the other batches still happens
    	if (batch_values !== null) {
    		// only cache the value if we're in a tracking context, otherwise we won't
    		// clear the cache in `mark_reactions` when dependencies are updated
    		if (effect_tracking() || current_batch?.is_fork) {
    			batch_values.set(derived, value);
    		}
    	} else {
    		var status = (derived.f & CONNECTED) === 0 ? MAYBE_DIRTY : CLEAN;
    		set_signal_status(derived, status);
    	}
    }

    /** @import { Derived, Effect, Source, Value } from '#client' */

    /** @type {Set<any>} */
    let eager_effects = new Set();

    /** @type {Map<Source, any>} */
    const old_values = new Map();

    let eager_effects_deferred = false;

    /**
     * @template V
     * @param {V} v
     * @param {Error | null} [stack]
     * @returns {Source<V>}
     */
    // TODO rename this to `state` throughout the codebase
    function source(v, stack) {
    	/** @type {Value} */
    	var signal = {
    		f: 0, // TODO ideally we could skip this altogether, but it causes type errors
    		v,
    		reactions: null,
    		equals,
    		rv: 0,
    		wv: 0
    	};

    	return signal;
    }

    /**
     * @template V
     * @param {V} v
     * @param {Error | null} [stack]
     */
    /*#__NO_SIDE_EFFECTS__*/
    function state(v, stack) {
    	const s = source(v);

    	push_reaction_value(s);

    	return s;
    }

    /**
     * @template V
     * @param {V} initial_value
     * @param {boolean} [immutable]
     * @returns {Source<V>}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function mutable_source(initial_value, immutable = false, trackable = true) {
    	const s = source(initial_value);
    	if (!immutable) {
    		s.equals = safe_equals;
    	}

    	// bind the signal to the component context, in case we need to
    	// track updates to trigger beforeUpdate/afterUpdate callbacks
    	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
    		(component_context.l.s ??= []).push(s);
    	}

    	return s;
    }

    /**
     * @template V
     * @param {Source<V>} source
     * @param {V} value
     * @param {boolean} [should_proxy]
     * @returns {V}
     */
    function set(source, value, should_proxy = false) {
    	if (
    		active_reaction !== null &&
    		// since we are untracking the function inside `$inspect.with` we need to add this check
    		// to ensure we error if state is set inside an inspect effect
    		(!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) &&
    		is_runes() &&
    		(active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 &&
    		!current_sources?.includes(source)
    	) {
    		state_unsafe_mutation();
    	}

    	let new_value = should_proxy ? proxy(value) : value;

    	return internal_set(source, new_value);
    }

    /**
     * @template V
     * @param {Source<V>} source
     * @param {V} value
     * @returns {V}
     */
    function internal_set(source, value) {
    	if (!source.equals(value)) {
    		var old_value = source.v;

    		if (is_destroying_effect) {
    			old_values.set(source, value);
    		} else {
    			old_values.set(source, old_value);
    		}

    		source.v = value;

    		var batch = Batch.ensure();
    		batch.capture(source, old_value);

    		if ((source.f & DERIVED) !== 0) {
    			// if we are assigning to a dirty derived we set it to clean/maybe dirty but we also eagerly execute it to track the dependencies
    			if ((source.f & DIRTY) !== 0) {
    				execute_derived(/** @type {Derived} */ (source));
    			}

    			set_signal_status(source, (source.f & CONNECTED) !== 0 ? CLEAN : MAYBE_DIRTY);
    		}

    		source.wv = increment_write_version();

    		// For debugging, in case you want to know which reactions are being scheduled:
    		// log_reactions(source);
    		mark_reactions(source, DIRTY);

    		// It's possible that the current reaction might not have up-to-date dependencies
    		// whilst it's actively running. So in the case of ensuring it registers the reaction
    		// properly for itself, we need to ensure the current effect actually gets
    		// scheduled. i.e: `$effect(() => x++)`
    		if (
    			is_runes() &&
    			active_effect !== null &&
    			(active_effect.f & CLEAN) !== 0 &&
    			(active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0
    		) {
    			if (untracked_writes === null) {
    				set_untracked_writes([source]);
    			} else {
    				untracked_writes.push(source);
    			}
    		}

    		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
    			flush_eager_effects();
    		}
    	}

    	return value;
    }

    function flush_eager_effects() {
    	eager_effects_deferred = false;
    	var prev_is_updating_effect = is_updating_effect;
    	set_is_updating_effect(true);

    	const inspects = Array.from(eager_effects);

    	try {
    		for (const effect of inspects) {
    			// Mark clean inspect-effects as maybe dirty and then check their dirtiness
    			// instead of just updating the effects - this way we avoid overfiring.
    			if ((effect.f & CLEAN) !== 0) {
    				set_signal_status(effect, MAYBE_DIRTY);
    			}

    			if (is_dirty(effect)) {
    				update_effect(effect);
    			}
    		}
    	} finally {
    		set_is_updating_effect(prev_is_updating_effect);
    	}

    	eager_effects.clear();
    }

    /**
     * Silently (without using `get`) increment a source
     * @param {Source<number>} source
     */
    function increment(source) {
    	set(source, source.v + 1);
    }

    /**
     * @param {Value} signal
     * @param {number} status should be DIRTY or MAYBE_DIRTY
     * @returns {void}
     */
    function mark_reactions(signal, status) {
    	var reactions = signal.reactions;
    	if (reactions === null) return;

    	var runes = is_runes();
    	var length = reactions.length;

    	for (var i = 0; i < length; i++) {
    		var reaction = reactions[i];
    		var flags = reaction.f;

    		// In legacy mode, skip the current effect to prevent infinite loops
    		if (!runes && reaction === active_effect) continue;

    		var not_dirty = (flags & DIRTY) === 0;

    		// don't set a DIRTY reaction to MAYBE_DIRTY
    		if (not_dirty) {
    			set_signal_status(reaction, status);
    		}

    		if ((flags & DERIVED) !== 0) {
    			var derived = /** @type {Derived} */ (reaction);

    			batch_values?.delete(derived);

    			if ((flags & WAS_MARKED) === 0) {
    				// Only connected deriveds can be reliably unmarked right away
    				if (flags & CONNECTED) {
    					reaction.f |= WAS_MARKED;
    				}

    				mark_reactions(derived, MAYBE_DIRTY);
    			}
    		} else if (not_dirty) {
    			if ((flags & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
    				eager_block_effects.add(/** @type {Effect} */ (reaction));
    			}

    			schedule_effect(/** @type {Effect} */ (reaction));
    		}
    	}
    }

    /** @import { Source } from '#client' */

    /**
     * @template T
     * @param {T} value
     * @returns {T}
     */
    function proxy(value) {
    	// if non-proxyable, or is already a proxy, return `value`
    	if (typeof value !== 'object' || value === null || STATE_SYMBOL in value) {
    		return value;
    	}

    	const prototype = get_prototype_of(value);

    	if (prototype !== object_prototype && prototype !== array_prototype) {
    		return value;
    	}

    	/** @type {Map<any, Source<any>>} */
    	var sources = new Map();
    	var is_proxied_array = is_array(value);
    	var version = state(0);
    	var parent_version = update_version;

    	/**
    	 * Executes the proxy in the context of the reaction it was originally created in, if any
    	 * @template T
    	 * @param {() => T} fn
    	 */
    	var with_parent = (fn) => {
    		if (update_version === parent_version) {
    			return fn();
    		}

    		// child source is being created after the initial proxy —
    		// prevent it from being associated with the current reaction
    		var reaction = active_reaction;
    		var version = update_version;

    		set_active_reaction(null);
    		set_update_version(parent_version);

    		var result = fn();

    		set_active_reaction(reaction);
    		set_update_version(version);

    		return result;
    	};

    	if (is_proxied_array) {
    		// We need to create the length source eagerly to ensure that
    		// mutations to the array are properly synced with our proxy
    		sources.set('length', state(/** @type {any[]} */ (value).length));
    	}

    	return new Proxy(/** @type {any} */ (value), {
    		defineProperty(_, prop, descriptor) {
    			if (
    				!('value' in descriptor) ||
    				descriptor.configurable === false ||
    				descriptor.enumerable === false ||
    				descriptor.writable === false
    			) {
    				// we disallow non-basic descriptors, because unless they are applied to the
    				// target object — which we avoid, so that state can be forked — we will run
    				// afoul of the various invariants
    				// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor#invariants
    				state_descriptors_fixed();
    			}
    			var s = sources.get(prop);
    			if (s === undefined) {
    				s = with_parent(() => {
    					var s = state(descriptor.value);
    					sources.set(prop, s);
    					return s;
    				});
    			} else {
    				set(s, descriptor.value, true);
    			}

    			return true;
    		},

    		deleteProperty(target, prop) {
    			var s = sources.get(prop);

    			if (s === undefined) {
    				if (prop in target) {
    					const s = with_parent(() => state(UNINITIALIZED));
    					sources.set(prop, s);
    					increment(version);
    				}
    			} else {
    				set(s, UNINITIALIZED);
    				increment(version);
    			}

    			return true;
    		},

    		get(target, prop, receiver) {
    			if (prop === STATE_SYMBOL) {
    				return value;
    			}

    			var s = sources.get(prop);
    			var exists = prop in target;

    			// create a source, but only if it's an own property and not a prototype property
    			if (s === undefined && (!exists || get_descriptor(target, prop)?.writable)) {
    				s = with_parent(() => {
    					var p = proxy(exists ? target[prop] : UNINITIALIZED);
    					var s = state(p);

    					return s;
    				});

    				sources.set(prop, s);
    			}

    			if (s !== undefined) {
    				var v = get(s);
    				return v === UNINITIALIZED ? undefined : v;
    			}

    			return Reflect.get(target, prop, receiver);
    		},

    		getOwnPropertyDescriptor(target, prop) {
    			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

    			if (descriptor && 'value' in descriptor) {
    				var s = sources.get(prop);
    				if (s) descriptor.value = get(s);
    			} else if (descriptor === undefined) {
    				var source = sources.get(prop);
    				var value = source?.v;

    				if (source !== undefined && value !== UNINITIALIZED) {
    					return {
    						enumerable: true,
    						configurable: true,
    						value,
    						writable: true
    					};
    				}
    			}

    			return descriptor;
    		},

    		has(target, prop) {
    			if (prop === STATE_SYMBOL) {
    				return true;
    			}

    			var s = sources.get(prop);
    			var has = (s !== undefined && s.v !== UNINITIALIZED) || Reflect.has(target, prop);

    			if (
    				s !== undefined ||
    				(active_effect !== null && (!has || get_descriptor(target, prop)?.writable))
    			) {
    				if (s === undefined) {
    					s = with_parent(() => {
    						var p = has ? proxy(target[prop]) : UNINITIALIZED;
    						var s = state(p);

    						return s;
    					});

    					sources.set(prop, s);
    				}

    				var value = get(s);
    				if (value === UNINITIALIZED) {
    					return false;
    				}
    			}

    			return has;
    		},

    		set(target, prop, value, receiver) {
    			var s = sources.get(prop);
    			var has = prop in target;

    			// variable.length = value -> clear all signals with index >= value
    			if (is_proxied_array && prop === 'length') {
    				for (var i = value; i < /** @type {Source<number>} */ (s).v; i += 1) {
    					var other_s = sources.get(i + '');
    					if (other_s !== undefined) {
    						set(other_s, UNINITIALIZED);
    					} else if (i in target) {
    						// If the item exists in the original, we need to create an uninitialized source,
    						// else a later read of the property would result in a source being created with
    						// the value of the original item at that index.
    						other_s = with_parent(() => state(UNINITIALIZED));
    						sources.set(i + '', other_s);
    					}
    				}
    			}

    			// If we haven't yet created a source for this property, we need to ensure
    			// we do so otherwise if we read it later, then the write won't be tracked and
    			// the heuristics of effects will be different vs if we had read the proxied
    			// object property before writing to that property.
    			if (s === undefined) {
    				if (!has || get_descriptor(target, prop)?.writable) {
    					s = with_parent(() => state(undefined));
    					set(s, proxy(value));

    					sources.set(prop, s);
    				}
    			} else {
    				has = s.v !== UNINITIALIZED;

    				var p = with_parent(() => proxy(value));
    				set(s, p);
    			}

    			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);

    			// Set the new value before updating any signals so that any listeners get the new value
    			if (descriptor?.set) {
    				descriptor.set.call(receiver, value);
    			}

    			if (!has) {
    				// If we have mutated an array directly, we might need to
    				// signal that length has also changed. Do it before updating metadata
    				// to ensure that iterating over the array as a result of a metadata update
    				// will not cause the length to be out of sync.
    				if (is_proxied_array && typeof prop === 'string') {
    					var ls = /** @type {Source<number>} */ (sources.get('length'));
    					var n = Number(prop);

    					if (Number.isInteger(n) && n >= ls.v) {
    						set(ls, n + 1);
    					}
    				}

    				increment(version);
    			}

    			return true;
    		},

    		ownKeys(target) {
    			get(version);

    			var own_keys = Reflect.ownKeys(target).filter((key) => {
    				var source = sources.get(key);
    				return source === undefined || source.v !== UNINITIALIZED;
    			});

    			for (var [key, source] of sources) {
    				if (source.v !== UNINITIALIZED && !(key in target)) {
    					own_keys.push(key);
    				}
    			}

    			return own_keys;
    		},

    		setPrototypeOf() {
    			state_prototype_fixed();
    		}
    	});
    }

    /**
     * @param {any} value
     */
    function get_proxied_value(value) {
    	try {
    		if (value !== null && typeof value === 'object' && STATE_SYMBOL in value) {
    			return value[STATE_SYMBOL];
    		}
    	} catch {
    		// the above if check can throw an error if the value in question
    		// is the contentWindow of an iframe on another domain, in which
    		// case we want to just return the value (because it's definitely
    		// not a proxied value) so we don't break any JavaScript interacting
    		// with that iframe (such as various payment companies client side
    		// JavaScript libraries interacting with their iframes on the same
    		// domain)
    	}

    	return value;
    }

    /**
     * @param {any} a
     * @param {any} b
     */
    function is(a, b) {
    	return Object.is(get_proxied_value(a), get_proxied_value(b));
    }

    /** @import { Effect, TemplateNode } from '#client' */

    // export these for reference in the compiled code, making global name deduplication unnecessary
    /** @type {Window} */
    var $window;

    /** @type {boolean} */
    var is_firefox;

    /** @type {() => Node | null} */
    var first_child_getter;
    /** @type {() => Node | null} */
    var next_sibling_getter;

    /**
     * Initialize these lazily to avoid issues when using the runtime in a server context
     * where these globals are not available while avoiding a separate server entry point
     */
    function init_operations() {
    	if ($window !== undefined) {
    		return;
    	}

    	$window = window;
    	is_firefox = /Firefox/.test(navigator.userAgent);

    	var element_prototype = Element.prototype;
    	var node_prototype = Node.prototype;
    	var text_prototype = Text.prototype;

    	// @ts-ignore
    	first_child_getter = get_descriptor(node_prototype, 'firstChild').get;
    	// @ts-ignore
    	next_sibling_getter = get_descriptor(node_prototype, 'nextSibling').get;

    	if (is_extensible(element_prototype)) {
    		// the following assignments improve perf of lookups on DOM nodes
    		// @ts-expect-error
    		element_prototype.__click = undefined;
    		// @ts-expect-error
    		element_prototype.__className = undefined;
    		// @ts-expect-error
    		element_prototype.__attributes = null;
    		// @ts-expect-error
    		element_prototype.__style = undefined;
    		// @ts-expect-error
    		element_prototype.__e = undefined;
    	}

    	if (is_extensible(text_prototype)) {
    		// @ts-expect-error
    		text_prototype.__t = undefined;
    	}
    }

    /**
     * @param {string} value
     * @returns {Text}
     */
    function create_text(value = '') {
    	return document.createTextNode(value);
    }

    /**
     * @template {Node} N
     * @param {N} node
     */
    /*@__NO_SIDE_EFFECTS__*/
    function get_first_child(node) {
    	return /** @type {TemplateNode | null} */ (first_child_getter.call(node));
    }

    /**
     * @template {Node} N
     * @param {N} node
     */
    /*@__NO_SIDE_EFFECTS__*/
    function get_next_sibling(node) {
    	return /** @type {TemplateNode | null} */ (next_sibling_getter.call(node));
    }

    /**
     * Don't mark this as side-effect-free, hydration needs to walk all nodes
     * @template {Node} N
     * @param {N} node
     * @param {boolean} is_text
     * @returns {TemplateNode | null}
     */
    function child(node, is_text) {
    	if (!hydrating) {
    		return get_first_child(node);
    	}

    	var child = get_first_child(hydrate_node);

    	// Child can be null if we have an element with a single child, like `<p>{text}</p>`, where `text` is empty
    	if (child === null) {
    		child = hydrate_node.appendChild(create_text());
    	} else if (is_text && child.nodeType !== TEXT_NODE) {
    		var text = create_text();
    		child?.before(text);
    		set_hydrate_node(text);
    		return text;
    	}

    	set_hydrate_node(child);
    	return child;
    }

    /**
     * Don't mark this as side-effect-free, hydration needs to walk all nodes
     * @param {TemplateNode} node
     * @param {boolean} [is_text]
     * @returns {TemplateNode | null}
     */
    function first_child(node, is_text = false) {
    	if (!hydrating) {
    		var first = get_first_child(node);

    		// TODO prevent user comments with the empty string when preserveComments is true
    		if (first instanceof Comment && first.data === '') return get_next_sibling(first);

    		return first;
    	}

    	// if an {expression} is empty during SSR, there might be no
    	// text node to hydrate — we must therefore create one
    	if (is_text && hydrate_node?.nodeType !== TEXT_NODE) {
    		var text = create_text();

    		hydrate_node?.before(text);
    		set_hydrate_node(text);
    		return text;
    	}

    	return hydrate_node;
    }

    /**
     * Don't mark this as side-effect-free, hydration needs to walk all nodes
     * @param {TemplateNode} node
     * @param {number} count
     * @param {boolean} is_text
     * @returns {TemplateNode | null}
     */
    function sibling(node, count = 1, is_text = false) {
    	let next_sibling = hydrating ? hydrate_node : node;
    	var last_sibling;

    	while (count--) {
    		last_sibling = next_sibling;
    		next_sibling = /** @type {TemplateNode} */ (get_next_sibling(next_sibling));
    	}

    	if (!hydrating) {
    		return next_sibling;
    	}

    	// if a sibling {expression} is empty during SSR, there might be no
    	// text node to hydrate — we must therefore create one
    	if (is_text && next_sibling?.nodeType !== TEXT_NODE) {
    		var text = create_text();
    		// If the next sibling is `null` and we're handling text then it's because
    		// the SSR content was empty for the text, so we need to generate a new text
    		// node and insert it after the last sibling
    		if (next_sibling === null) {
    			last_sibling?.after(text);
    		} else {
    			next_sibling.before(text);
    		}
    		set_hydrate_node(text);
    		return text;
    	}

    	set_hydrate_node(next_sibling);
    	return next_sibling;
    }

    /**
     * @template {Node} N
     * @param {N} node
     * @returns {void}
     */
    function clear_text_content(node) {
    	node.textContent = '';
    }

    /**
     * Returns `true` if we're updating the current block, for example `condition` in
     * an `{#if condition}` block just changed. In this case, the branch should be
     * appended (or removed) at the same time as other updates within the
     * current `<svelte:boundary>`
     */
    function should_defer_append() {
    	return false;
    }

    /**
     * @param {HTMLElement} dom
     * @param {boolean} value
     * @returns {void}
     */
    function autofocus(dom, value) {
    	if (value) {
    		const body = document.body;
    		dom.autofocus = true;

    		queue_micro_task(() => {
    			if (document.activeElement === body) {
    				dom.focus();
    			}
    		});
    	}
    }

    /**
     * The child of a textarea actually corresponds to the defaultValue property, so we need
     * to remove it upon hydration to avoid a bug when someone resets the form value.
     * @param {HTMLTextAreaElement} dom
     * @returns {void}
     */
    function remove_textarea_child(dom) {
    	if (hydrating && get_first_child(dom) !== null) {
    		clear_text_content(dom);
    	}
    }

    let listening_to_form_reset = false;

    function add_form_reset_listener() {
    	if (!listening_to_form_reset) {
    		listening_to_form_reset = true;
    		document.addEventListener(
    			'reset',
    			(evt) => {
    				// Needs to happen one tick later or else the dom properties of the form
    				// elements have not updated to their reset values yet
    				Promise.resolve().then(() => {
    					if (!evt.defaultPrevented) {
    						for (const e of /**@type {HTMLFormElement} */ (evt.target).elements) {
    							// @ts-expect-error
    							e.__on_r?.();
    						}
    					}
    				});
    			},
    			// In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    			{ capture: true }
    		);
    	}
    }

    /**
     * @template T
     * @param {() => T} fn
     */
    function without_reactive_context(fn) {
    	var previous_reaction = active_reaction;
    	var previous_effect = active_effect;
    	set_active_reaction(null);
    	set_active_effect(null);
    	try {
    		return fn();
    	} finally {
    		set_active_reaction(previous_reaction);
    		set_active_effect(previous_effect);
    	}
    }

    /** @import { ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */

    /**
     * @param {'$effect' | '$effect.pre' | '$inspect'} rune
     */
    function validate_effect(rune) {
    	if (active_effect === null) {
    		if (active_reaction === null) {
    			effect_orphan();
    		}

    		effect_in_unowned_derived();
    	}

    	if (is_destroying_effect) {
    		effect_in_teardown();
    	}
    }

    /**
     * @param {Effect} effect
     * @param {Effect} parent_effect
     */
    function push_effect(effect, parent_effect) {
    	var parent_last = parent_effect.last;
    	if (parent_last === null) {
    		parent_effect.last = parent_effect.first = effect;
    	} else {
    		parent_last.next = effect;
    		effect.prev = parent_last;
    		parent_effect.last = effect;
    	}
    }

    /**
     * @param {number} type
     * @param {null | (() => void | (() => void))} fn
     * @param {boolean} sync
     * @returns {Effect}
     */
    function create_effect(type, fn, sync) {
    	var parent = active_effect;

    	if (parent !== null && (parent.f & INERT) !== 0) {
    		type |= INERT;
    	}

    	/** @type {Effect} */
    	var effect = {
    		ctx: component_context,
    		deps: null,
    		nodes: null,
    		f: type | DIRTY | CONNECTED,
    		first: null,
    		fn,
    		last: null,
    		next: null,
    		parent,
    		b: parent && parent.b,
    		prev: null,
    		teardown: null,
    		wv: 0,
    		ac: null
    	};

    	if (sync) {
    		try {
    			update_effect(effect);
    			effect.f |= EFFECT_RAN;
    		} catch (e) {
    			destroy_effect(effect);
    			throw e;
    		}
    	} else if (fn !== null) {
    		schedule_effect(effect);
    	}

    	/** @type {Effect | null} */
    	var e = effect;

    	// if an effect has already ran and doesn't need to be kept in the tree
    	// (because it won't re-run, has no DOM, and has no teardown etc)
    	// then we skip it and go to its child (if any)
    	if (
    		sync &&
    		e.deps === null &&
    		e.teardown === null &&
    		e.nodes === null &&
    		e.first === e.last && // either `null`, or a singular child
    		(e.f & EFFECT_PRESERVED) === 0
    	) {
    		e = e.first;
    		if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
    			e.f |= EFFECT_TRANSPARENT;
    		}
    	}

    	if (e !== null) {
    		e.parent = parent;

    		if (parent !== null) {
    			push_effect(e, parent);
    		}

    		// if we're in a derived, add the effect there too
    		if (
    			active_reaction !== null &&
    			(active_reaction.f & DERIVED) !== 0 &&
    			(type & ROOT_EFFECT) === 0
    		) {
    			var derived = /** @type {Derived} */ (active_reaction);
    			(derived.effects ??= []).push(e);
    		}
    	}

    	return effect;
    }

    /**
     * Internal representation of `$effect.tracking()`
     * @returns {boolean}
     */
    function effect_tracking() {
    	return active_reaction !== null && !untracking;
    }

    /**
     * @param {() => void} fn
     */
    function teardown(fn) {
    	const effect = create_effect(RENDER_EFFECT, null, false);
    	set_signal_status(effect, CLEAN);
    	effect.teardown = fn;
    	return effect;
    }

    /**
     * Internal representation of `$effect(...)`
     * @param {() => void | (() => void)} fn
     */
    function user_effect(fn) {
    	validate_effect();

    	// Non-nested `$effect(...)` in a component should be deferred
    	// until the component is mounted
    	var flags = /** @type {Effect} */ (active_effect).f;
    	var defer = !active_reaction && (flags & BRANCH_EFFECT) !== 0 && (flags & EFFECT_RAN) === 0;

    	if (defer) {
    		// Top-level `$effect(...)` in an unmounted component — defer until mount
    		var context = /** @type {ComponentContext} */ (component_context);
    		(context.e ??= []).push(fn);
    	} else {
    		// Everything else — create immediately
    		return create_user_effect(fn);
    	}
    }

    /**
     * @param {() => void | (() => void)} fn
     */
    function create_user_effect(fn) {
    	return create_effect(EFFECT | USER_EFFECT, fn, false);
    }

    /**
     * Internal representation of `$effect.pre(...)`
     * @param {() => void | (() => void)} fn
     * @returns {Effect}
     */
    function user_pre_effect(fn) {
    	validate_effect();
    	return create_effect(RENDER_EFFECT | USER_EFFECT, fn, true);
    }

    /**
     * Internal representation of `$effect.root(...)`
     * @param {() => void | (() => void)} fn
     * @returns {() => void}
     */
    function effect_root(fn) {
    	Batch.ensure();
    	const effect = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);

    	return () => {
    		destroy_effect(effect);
    	};
    }

    /**
     * An effect root whose children can transition out
     * @param {() => void} fn
     * @returns {(options?: { outro?: boolean }) => Promise<void>}
     */
    function component_root(fn) {
    	Batch.ensure();
    	const effect = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn, true);

    	return (options = {}) => {
    		return new Promise((fulfil) => {
    			if (options.outro) {
    				pause_effect(effect, () => {
    					destroy_effect(effect);
    					fulfil(undefined);
    				});
    			} else {
    				destroy_effect(effect);
    				fulfil(undefined);
    			}
    		});
    	};
    }

    /**
     * @param {() => void | (() => void)} fn
     * @returns {Effect}
     */
    function effect(fn) {
    	return create_effect(EFFECT, fn, false);
    }

    /**
     * @param {() => void | (() => void)} fn
     * @returns {Effect}
     */
    function async_effect(fn) {
    	return create_effect(ASYNC | EFFECT_PRESERVED, fn, true);
    }

    /**
     * @param {() => void | (() => void)} fn
     * @returns {Effect}
     */
    function render_effect(fn, flags = 0) {
    	return create_effect(RENDER_EFFECT | flags, fn, true);
    }

    /**
     * @param {(...expressions: any) => void | (() => void)} fn
     * @param {Array<() => any>} sync
     * @param {Array<() => Promise<any>>} async
     * @param {Array<Promise<void>>} blockers
     */
    function template_effect(fn, sync = [], async = [], blockers = []) {
    	flatten(blockers, sync, async, (values) => {
    		create_effect(RENDER_EFFECT, () => fn(...values.map(get)), true);
    	});
    }

    /**
     * @param {(() => void)} fn
     * @param {number} flags
     */
    function block(fn, flags = 0) {
    	var effect = create_effect(BLOCK_EFFECT | flags, fn, true);
    	return effect;
    }

    /**
     * @param {(() => void)} fn
     * @param {number} flags
     */
    function managed(fn, flags = 0) {
    	var effect = create_effect(MANAGED_EFFECT | flags, fn, true);
    	return effect;
    }

    /**
     * @param {(() => void)} fn
     */
    function branch(fn) {
    	return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn, true);
    }

    /**
     * @param {Effect} effect
     */
    function execute_effect_teardown(effect) {
    	var teardown = effect.teardown;
    	if (teardown !== null) {
    		const previously_destroying_effect = is_destroying_effect;
    		const previous_reaction = active_reaction;
    		set_is_destroying_effect(true);
    		set_active_reaction(null);
    		try {
    			teardown.call(null);
    		} finally {
    			set_is_destroying_effect(previously_destroying_effect);
    			set_active_reaction(previous_reaction);
    		}
    	}
    }

    /**
     * @param {Effect} signal
     * @param {boolean} remove_dom
     * @returns {void}
     */
    function destroy_effect_children(signal, remove_dom = false) {
    	var effect = signal.first;
    	signal.first = signal.last = null;

    	while (effect !== null) {
    		const controller = effect.ac;

    		if (controller !== null) {
    			without_reactive_context(() => {
    				controller.abort(STALE_REACTION);
    			});
    		}

    		var next = effect.next;

    		if ((effect.f & ROOT_EFFECT) !== 0) {
    			// this is now an independent root
    			effect.parent = null;
    		} else {
    			destroy_effect(effect, remove_dom);
    		}

    		effect = next;
    	}
    }

    /**
     * @param {Effect} signal
     * @returns {void}
     */
    function destroy_block_effect_children(signal) {
    	var effect = signal.first;

    	while (effect !== null) {
    		var next = effect.next;
    		if ((effect.f & BRANCH_EFFECT) === 0) {
    			destroy_effect(effect);
    		}
    		effect = next;
    	}
    }

    /**
     * @param {Effect} effect
     * @param {boolean} [remove_dom]
     * @returns {void}
     */
    function destroy_effect(effect, remove_dom = true) {
    	var removed = false;

    	if (
    		(remove_dom || (effect.f & HEAD_EFFECT) !== 0) &&
    		effect.nodes !== null &&
    		effect.nodes.end !== null
    	) {
    		remove_effect_dom(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
    		removed = true;
    	}

    	destroy_effect_children(effect, remove_dom && !removed);
    	remove_reactions(effect, 0);
    	set_signal_status(effect, DESTROYED);

    	var transitions = effect.nodes && effect.nodes.t;

    	if (transitions !== null) {
    		for (const transition of transitions) {
    			transition.stop();
    		}
    	}

    	execute_effect_teardown(effect);

    	var parent = effect.parent;

    	// If the parent doesn't have any children, then skip this work altogether
    	if (parent !== null && parent.first !== null) {
    		unlink_effect(effect);
    	}

    	// `first` and `child` are nulled out in destroy_effect_children
    	// we don't null out `parent` so that error propagation can work correctly
    	effect.next =
    		effect.prev =
    		effect.teardown =
    		effect.ctx =
    		effect.deps =
    		effect.fn =
    		effect.nodes =
    		effect.ac =
    			null;
    }

    /**
     *
     * @param {TemplateNode | null} node
     * @param {TemplateNode} end
     */
    function remove_effect_dom(node, end) {
    	while (node !== null) {
    		/** @type {TemplateNode | null} */
    		var next = node === end ? null : get_next_sibling(node);

    		node.remove();
    		node = next;
    	}
    }

    /**
     * Detach an effect from the effect tree, freeing up memory and
     * reducing the amount of work that happens on subsequent traversals
     * @param {Effect} effect
     */
    function unlink_effect(effect) {
    	var parent = effect.parent;
    	var prev = effect.prev;
    	var next = effect.next;

    	if (prev !== null) prev.next = next;
    	if (next !== null) next.prev = prev;

    	if (parent !== null) {
    		if (parent.first === effect) parent.first = next;
    		if (parent.last === effect) parent.last = prev;
    	}
    }

    /**
     * When a block effect is removed, we don't immediately destroy it or yank it
     * out of the DOM, because it might have transitions. Instead, we 'pause' it.
     * It stays around (in memory, and in the DOM) until outro transitions have
     * completed, and if the state change is reversed then we _resume_ it.
     * A paused effect does not update, and the DOM subtree becomes inert.
     * @param {Effect} effect
     * @param {() => void} [callback]
     * @param {boolean} [destroy]
     */
    function pause_effect(effect, callback, destroy = true) {
    	/** @type {TransitionManager[]} */
    	var transitions = [];

    	pause_children(effect, transitions, true);

    	var fn = () => {
    		if (destroy) destroy_effect(effect);
    		if (callback) callback();
    	};

    	var remaining = transitions.length;
    	if (remaining > 0) {
    		var check = () => --remaining || fn();
    		for (var transition of transitions) {
    			transition.out(check);
    		}
    	} else {
    		fn();
    	}
    }

    /**
     * @param {Effect} effect
     * @param {TransitionManager[]} transitions
     * @param {boolean} local
     */
    function pause_children(effect, transitions, local) {
    	if ((effect.f & INERT) !== 0) return;
    	effect.f ^= INERT;

    	var t = effect.nodes && effect.nodes.t;

    	if (t !== null) {
    		for (const transition of t) {
    			if (transition.is_global || local) {
    				transitions.push(transition);
    			}
    		}
    	}

    	var child = effect.first;

    	while (child !== null) {
    		var sibling = child.next;
    		var transparent =
    			(child.f & EFFECT_TRANSPARENT) !== 0 ||
    			// If this is a branch effect without a block effect parent,
    			// it means the parent block effect was pruned. In that case,
    			// transparency information was transferred to the branch effect.
    			((child.f & BRANCH_EFFECT) !== 0 && (effect.f & BLOCK_EFFECT) !== 0);
    		// TODO we don't need to call pause_children recursively with a linked list in place
    		// it's slightly more involved though as we have to account for `transparent` changing
    		// through the tree.
    		pause_children(child, transitions, transparent ? local : false);
    		child = sibling;
    	}
    }

    /**
     * The opposite of `pause_effect`. We call this if (for example)
     * `x` becomes falsy then truthy: `{#if x}...{/if}`
     * @param {Effect} effect
     */
    function resume_effect(effect) {
    	resume_children(effect, true);
    }

    /**
     * @param {Effect} effect
     * @param {boolean} local
     */
    function resume_children(effect, local) {
    	if ((effect.f & INERT) === 0) return;
    	effect.f ^= INERT;

    	// If a dependency of this effect changed while it was paused,
    	// schedule the effect to update. we don't use `is_dirty`
    	// here because we don't want to eagerly recompute a derived like
    	// `{#if foo}{foo.bar()}{/if}` if `foo` is now `undefined
    	if ((effect.f & CLEAN) === 0) {
    		set_signal_status(effect, DIRTY);
    		schedule_effect(effect);
    	}

    	var child = effect.first;

    	while (child !== null) {
    		var sibling = child.next;
    		var transparent = (child.f & EFFECT_TRANSPARENT) !== 0 || (child.f & BRANCH_EFFECT) !== 0;
    		// TODO we don't need to call resume_children recursively with a linked list in place
    		// it's slightly more involved though as we have to account for `transparent` changing
    		// through the tree.
    		resume_children(child, transparent ? local : false);
    		child = sibling;
    	}

    	var t = effect.nodes && effect.nodes.t;

    	if (t !== null) {
    		for (const transition of t) {
    			if (transition.is_global || local) {
    				transition.in();
    			}
    		}
    	}
    }

    /**
     * @param {Effect} effect
     * @param {DocumentFragment} fragment
     */
    function move_effect(effect, fragment) {
    	if (!effect.nodes) return;

    	/** @type {TemplateNode | null} */
    	var node = effect.nodes.start;
    	var end = effect.nodes.end;

    	while (node !== null) {
    		/** @type {TemplateNode | null} */
    		var next = node === end ? null : get_next_sibling(node);

    		fragment.append(node);
    		node = next;
    	}
    }

    /** @import { Derived, Effect, Reaction, Signal, Source, Value } from '#client' */

    let is_updating_effect = false;

    /** @param {boolean} value */
    function set_is_updating_effect(value) {
    	is_updating_effect = value;
    }

    let is_destroying_effect = false;

    /** @param {boolean} value */
    function set_is_destroying_effect(value) {
    	is_destroying_effect = value;
    }

    /** @type {null | Reaction} */
    let active_reaction = null;

    let untracking = false;

    /** @param {null | Reaction} reaction */
    function set_active_reaction(reaction) {
    	active_reaction = reaction;
    }

    /** @type {null | Effect} */
    let active_effect = null;

    /** @param {null | Effect} effect */
    function set_active_effect(effect) {
    	active_effect = effect;
    }

    /**
     * When sources are created within a reaction, reading and writing
     * them within that reaction should not cause a re-run
     * @type {null | Source[]}
     */
    let current_sources = null;

    /** @param {Value} value */
    function push_reaction_value(value) {
    	if (active_reaction !== null && (true)) {
    		if (current_sources === null) {
    			current_sources = [value];
    		} else {
    			current_sources.push(value);
    		}
    	}
    }

    /**
     * The dependencies of the reaction that is currently being executed. In many cases,
     * the dependencies are unchanged between runs, and so this will be `null` unless
     * and until a new dependency is accessed — we track this via `skipped_deps`
     * @type {null | Value[]}
     */
    let new_deps = null;

    let skipped_deps = 0;

    /**
     * Tracks writes that the effect it's executed in doesn't listen to yet,
     * so that the dependency can be added to the effect later on if it then reads it
     * @type {null | Source[]}
     */
    let untracked_writes = null;

    /** @param {null | Source[]} value */
    function set_untracked_writes(value) {
    	untracked_writes = value;
    }

    /**
     * @type {number} Used by sources and deriveds for handling updates.
     * Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
     **/
    let write_version = 1;

    /** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
    let read_version = 0;

    let update_version = read_version;

    /** @param {number} value */
    function set_update_version(value) {
    	update_version = value;
    }

    function increment_write_version() {
    	return ++write_version;
    }

    /**
     * Determines whether a derived or effect is dirty.
     * If it is MAYBE_DIRTY, will set the status to CLEAN
     * @param {Reaction} reaction
     * @returns {boolean}
     */
    function is_dirty(reaction) {
    	var flags = reaction.f;

    	if ((flags & DIRTY) !== 0) {
    		return true;
    	}

    	if (flags & DERIVED) {
    		reaction.f &= ~WAS_MARKED;
    	}

    	if ((flags & MAYBE_DIRTY) !== 0) {
    		var dependencies = reaction.deps;

    		if (dependencies !== null) {
    			var length = dependencies.length;

    			for (var i = 0; i < length; i++) {
    				var dependency = dependencies[i];

    				if (is_dirty(/** @type {Derived} */ (dependency))) {
    					update_derived(/** @type {Derived} */ (dependency));
    				}

    				if (dependency.wv > reaction.wv) {
    					return true;
    				}
    			}
    		}

    		if (
    			(flags & CONNECTED) !== 0 &&
    			// During time traveling we don't want to reset the status so that
    			// traversal of the graph in the other batches still happens
    			batch_values === null
    		) {
    			set_signal_status(reaction, CLEAN);
    		}
    	}

    	return false;
    }

    /**
     * @param {Value} signal
     * @param {Effect} effect
     * @param {boolean} [root]
     */
    function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
    	var reactions = signal.reactions;
    	if (reactions === null) return;

    	if (current_sources?.includes(signal)) {
    		return;
    	}

    	for (var i = 0; i < reactions.length; i++) {
    		var reaction = reactions[i];

    		if ((reaction.f & DERIVED) !== 0) {
    			schedule_possible_effect_self_invalidation(/** @type {Derived} */ (reaction), effect, false);
    		} else if (effect === reaction) {
    			if (root) {
    				set_signal_status(reaction, DIRTY);
    			} else if ((reaction.f & CLEAN) !== 0) {
    				set_signal_status(reaction, MAYBE_DIRTY);
    			}
    			schedule_effect(/** @type {Effect} */ (reaction));
    		}
    	}
    }

    /** @param {Reaction} reaction */
    function update_reaction(reaction) {
    	var previous_deps = new_deps;
    	var previous_skipped_deps = skipped_deps;
    	var previous_untracked_writes = untracked_writes;
    	var previous_reaction = active_reaction;
    	var previous_sources = current_sources;
    	var previous_component_context = component_context;
    	var previous_untracking = untracking;
    	var previous_update_version = update_version;

    	var flags = reaction.f;

    	new_deps = /** @type {null | Value[]} */ (null);
    	skipped_deps = 0;
    	untracked_writes = null;
    	active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;

    	current_sources = null;
    	set_component_context(reaction.ctx);
    	untracking = false;
    	update_version = ++read_version;

    	if (reaction.ac !== null) {
    		without_reactive_context(() => {
    			/** @type {AbortController} */ (reaction.ac).abort(STALE_REACTION);
    		});

    		reaction.ac = null;
    	}

    	try {
    		reaction.f |= REACTION_IS_UPDATING;
    		var fn = /** @type {Function} */ (reaction.fn);
    		var result = fn();
    		var deps = reaction.deps;

    		if (new_deps !== null) {
    			var i;

    			remove_reactions(reaction, skipped_deps);

    			if (deps !== null && skipped_deps > 0) {
    				deps.length = skipped_deps + new_deps.length;
    				for (i = 0; i < new_deps.length; i++) {
    					deps[skipped_deps + i] = new_deps[i];
    				}
    			} else {
    				reaction.deps = deps = new_deps;
    			}

    			if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
    				for (i = skipped_deps; i < deps.length; i++) {
    					(deps[i].reactions ??= []).push(reaction);
    				}
    			}
    		} else if (deps !== null && skipped_deps < deps.length) {
    			remove_reactions(reaction, skipped_deps);
    			deps.length = skipped_deps;
    		}

    		// If we're inside an effect and we have untracked writes, then we need to
    		// ensure that if any of those untracked writes result in re-invalidation
    		// of the current effect, then that happens accordingly
    		if (
    			is_runes() &&
    			untracked_writes !== null &&
    			!untracking &&
    			deps !== null &&
    			(reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0
    		) {
    			for (i = 0; i < /** @type {Source[]} */ (untracked_writes).length; i++) {
    				schedule_possible_effect_self_invalidation(
    					untracked_writes[i],
    					/** @type {Effect} */ (reaction)
    				);
    			}
    		}

    		// If we are returning to an previous reaction then
    		// we need to increment the read version to ensure that
    		// any dependencies in this reaction aren't marked with
    		// the same version
    		if (previous_reaction !== null && previous_reaction !== reaction) {
    			read_version++;

    			if (untracked_writes !== null) {
    				if (previous_untracked_writes === null) {
    					previous_untracked_writes = untracked_writes;
    				} else {
    					previous_untracked_writes.push(.../** @type {Source[]} */ (untracked_writes));
    				}
    			}
    		}

    		if ((reaction.f & ERROR_VALUE) !== 0) {
    			reaction.f ^= ERROR_VALUE;
    		}

    		return result;
    	} catch (error) {
    		return handle_error(error);
    	} finally {
    		reaction.f ^= REACTION_IS_UPDATING;
    		new_deps = previous_deps;
    		skipped_deps = previous_skipped_deps;
    		untracked_writes = previous_untracked_writes;
    		active_reaction = previous_reaction;
    		current_sources = previous_sources;
    		set_component_context(previous_component_context);
    		untracking = previous_untracking;
    		update_version = previous_update_version;
    	}
    }

    /**
     * @template V
     * @param {Reaction} signal
     * @param {Value<V>} dependency
     * @returns {void}
     */
    function remove_reaction(signal, dependency) {
    	let reactions = dependency.reactions;
    	if (reactions !== null) {
    		var index = index_of.call(reactions, signal);
    		if (index !== -1) {
    			var new_length = reactions.length - 1;
    			if (new_length === 0) {
    				reactions = dependency.reactions = null;
    			} else {
    				// Swap with last element and then remove.
    				reactions[index] = reactions[new_length];
    				reactions.pop();
    			}
    		}
    	}

    	// If the derived has no reactions, then we can disconnect it from the graph,
    	// allowing it to either reconnect in the future, or be GC'd by the VM.
    	if (
    		reactions === null &&
    		(dependency.f & DERIVED) !== 0 &&
    		// Destroying a child effect while updating a parent effect can cause a dependency to appear
    		// to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    		// allows us to skip the expensive work of disconnecting and immediately reconnecting it
    		(new_deps === null || !new_deps.includes(dependency))
    	) {
    		set_signal_status(dependency, MAYBE_DIRTY);
    		// If we are working with a derived that is owned by an effect, then mark it as being
    		// disconnected and remove the mark flag, as it cannot be reliably removed otherwise
    		if ((dependency.f & CONNECTED) !== 0) {
    			dependency.f ^= CONNECTED;
    			dependency.f &= ~WAS_MARKED;
    		}
    		// Disconnect any reactions owned by this reaction
    		destroy_derived_effects(/** @type {Derived} **/ (dependency));
    		remove_reactions(/** @type {Derived} **/ (dependency), 0);
    	}
    }

    /**
     * @param {Reaction} signal
     * @param {number} start_index
     * @returns {void}
     */
    function remove_reactions(signal, start_index) {
    	var dependencies = signal.deps;
    	if (dependencies === null) return;

    	for (var i = start_index; i < dependencies.length; i++) {
    		remove_reaction(signal, dependencies[i]);
    	}
    }

    /**
     * @param {Effect} effect
     * @returns {void}
     */
    function update_effect(effect) {
    	var flags = effect.f;

    	if ((flags & DESTROYED) !== 0) {
    		return;
    	}

    	set_signal_status(effect, CLEAN);

    	var previous_effect = active_effect;
    	var was_updating_effect = is_updating_effect;

    	active_effect = effect;
    	is_updating_effect = true;

    	try {
    		if ((flags & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
    			destroy_block_effect_children(effect);
    		} else {
    			destroy_effect_children(effect);
    		}

    		execute_effect_teardown(effect);
    		var teardown = update_reaction(effect);
    		effect.teardown = typeof teardown === 'function' ? teardown : null;
    		effect.wv = write_version;

    		// In DEV, increment versions of any sources that were written to during the effect,
    		// so that they are correctly marked as dirty when the effect re-runs
    		var dep; if (DEV && tracing_mode_flag && (effect.f & DIRTY) !== 0 && effect.deps !== null) ;
    	} finally {
    		is_updating_effect = was_updating_effect;
    		active_effect = previous_effect;
    	}
    }

    /**
     * Returns a promise that resolves once any pending state changes have been applied.
     * @returns {Promise<void>}
     */
    async function tick() {

    	await Promise.resolve();

    	// By calling flushSync we guarantee that any pending state changes are applied after one tick.
    	// TODO look into whether we can make flushing subsequent updates synchronously in the future.
    	flushSync();
    }

    /**
     * @template V
     * @param {Value<V>} signal
     * @returns {V}
     */
    function get(signal) {
    	var flags = signal.f;
    	var is_derived = (flags & DERIVED) !== 0;

    	// Register the dependency on the current reaction signal.
    	if (active_reaction !== null && !untracking) {
    		// if we're in a derived that is being read inside an _async_ derived,
    		// it's possible that the effect was already destroyed. In this case,
    		// we don't add the dependency, because that would create a memory leak
    		var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;

    		if (!destroyed && !current_sources?.includes(signal)) {
    			var deps = active_reaction.deps;

    			if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
    				// we're in the effect init/update cycle
    				if (signal.rv < read_version) {
    					signal.rv = read_version;

    					// If the signal is accessing the same dependencies in the same
    					// order as it did last time, increment `skipped_deps`
    					// rather than updating `new_deps`, which creates GC cost
    					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
    						skipped_deps++;
    					} else if (new_deps === null) {
    						new_deps = [signal];
    					} else if (!new_deps.includes(signal)) {
    						new_deps.push(signal);
    					}
    				}
    			} else {
    				// we're adding a dependency outside the init/update cycle
    				// (i.e. after an `await`)
    				(active_reaction.deps ??= []).push(signal);

    				var reactions = signal.reactions;

    				if (reactions === null) {
    					signal.reactions = [active_reaction];
    				} else if (!reactions.includes(active_reaction)) {
    					reactions.push(active_reaction);
    				}
    			}
    		}
    	}

    	if (is_destroying_effect) {
    		if (old_values.has(signal)) {
    			return old_values.get(signal);
    		}

    		if (is_derived) {
    			var derived = /** @type {Derived} */ (signal);

    			var value = derived.v;

    			// if the derived is dirty and has reactions, or depends on the values that just changed, re-execute
    			// (a derived can be maybe_dirty due to the effect destroy removing its last reaction)
    			if (
    				((derived.f & CLEAN) === 0 && derived.reactions !== null) ||
    				depends_on_old_values(derived)
    			) {
    				value = execute_derived(derived);
    			}

    			old_values.set(derived, value);

    			return value;
    		}
    	} else if (
    		is_derived &&
    		(!batch_values?.has(signal) || (current_batch?.is_fork && !effect_tracking()))
    	) {
    		derived = /** @type {Derived} */ (signal);

    		if (is_dirty(derived)) {
    			update_derived(derived);
    		}

    		if (is_updating_effect && effect_tracking() && (derived.f & CONNECTED) === 0) {
    			reconnect(derived);
    		}
    	}

    	if (batch_values?.has(signal)) {
    		return batch_values.get(signal);
    	}

    	if ((signal.f & ERROR_VALUE) !== 0) {
    		throw signal.v;
    	}

    	return signal.v;
    }

    /**
     * (Re)connect a disconnected derived, so that it is notified
     * of changes in `mark_reactions`
     * @param {Derived} derived
     */
    function reconnect(derived) {
    	if (derived.deps === null) return;

    	derived.f ^= CONNECTED;

    	for (const dep of derived.deps) {
    		(dep.reactions ??= []).push(derived);

    		if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
    			reconnect(/** @type {Derived} */ (dep));
    		}
    	}
    }

    /** @param {Derived} derived */
    function depends_on_old_values(derived) {
    	if (derived.v === UNINITIALIZED) return true; // we don't know, so assume the worst
    	if (derived.deps === null) return false;

    	for (const dep of derived.deps) {
    		if (old_values.has(dep)) {
    			return true;
    		}

    		if ((dep.f & DERIVED) !== 0 && depends_on_old_values(/** @type {Derived} */ (dep))) {
    			return true;
    		}
    	}

    	return false;
    }

    /**
     * When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
     * any state read inside `fn` will not be treated as a dependency.
     *
     * ```ts
     * $effect(() => {
     *   // this will run when `data` changes, but not when `time` changes
     *   save(data, {
     *     timestamp: untrack(() => time)
     *   });
     * });
     * ```
     * @template T
     * @param {() => T} fn
     * @returns {T}
     */
    function untrack(fn) {
    	var previous_untracking = untracking;
    	try {
    		untracking = true;
    		return fn();
    	} finally {
    		untracking = previous_untracking;
    	}
    }

    const STATUS_MASK = -7169;

    /**
     * @param {Signal} signal
     * @param {number} status
     * @returns {void}
     */
    function set_signal_status(signal, status) {
    	signal.f = (signal.f & STATUS_MASK) | status;
    }

    /**
     * Possibly traverse an object and read all its properties so that they're all reactive in case this is `$state`.
     * Does only check first level of an object for performance reasons (heuristic should be good for 99% of all cases).
     * @param {any} value
     * @returns {void}
     */
    function deep_read_state(value) {
    	if (typeof value !== 'object' || !value || value instanceof EventTarget) {
    		return;
    	}

    	if (STATE_SYMBOL in value) {
    		deep_read(value);
    	} else if (!Array.isArray(value)) {
    		for (let key in value) {
    			const prop = value[key];
    			if (typeof prop === 'object' && prop && STATE_SYMBOL in prop) {
    				deep_read(prop);
    			}
    		}
    	}
    }

    /**
     * Deeply traverse an object and read all its properties
     * so that they're all reactive in case this is `$state`
     * @param {any} value
     * @param {Set<any>} visited
     * @returns {void}
     */
    function deep_read(value, visited = new Set()) {
    	if (
    		typeof value === 'object' &&
    		value !== null &&
    		// We don't want to traverse DOM elements
    		!(value instanceof EventTarget) &&
    		!visited.has(value)
    	) {
    		visited.add(value);
    		// When working with a possible SvelteDate, this
    		// will ensure we capture changes to it.
    		if (value instanceof Date) {
    			value.getTime();
    		}
    		for (let key in value) {
    			try {
    				deep_read(value[key], visited);
    			} catch (e) {
    				// continue
    			}
    		}
    		const proto = get_prototype_of(value);
    		if (
    			proto !== Object.prototype &&
    			proto !== Array.prototype &&
    			proto !== Map.prototype &&
    			proto !== Set.prototype &&
    			proto !== Date.prototype
    		) {
    			const descriptors = get_descriptors(proto);
    			for (let key in descriptors) {
    				const get = descriptors[key].get;
    				if (get) {
    					try {
    						get.call(value);
    					} catch (e) {
    						// continue
    					}
    				}
    			}
    		}
    	}
    }

    /** @type {Set<string>} */
    const all_registered_events = new Set();

    /** @type {Set<(events: Array<string>) => void>} */
    const root_event_handles = new Set();

    /**
     * @param {string} event_name
     * @param {EventTarget} dom
     * @param {EventListener} [handler]
     * @param {AddEventListenerOptions} [options]
     */
    function create_event(event_name, dom, handler, options = {}) {
    	/**
    	 * @this {EventTarget}
    	 */
    	function target_handler(/** @type {Event} */ event) {
    		if (!options.capture) {
    			// Only call in the bubble phase, else delegated events would be called before the capturing events
    			handle_event_propagation.call(dom, event);
    		}
    		if (!event.cancelBubble) {
    			return without_reactive_context(() => {
    				return handler?.call(this, event);
    			});
    		}
    	}

    	// Chrome has a bug where pointer events don't work when attached to a DOM element that has been cloned
    	// with cloneNode() and the DOM element is disconnected from the document. To ensure the event works, we
    	// defer the attachment till after it's been appended to the document. TODO: remove this once Chrome fixes
    	// this bug. The same applies to wheel events and touch events.
    	if (
    		event_name.startsWith('pointer') ||
    		event_name.startsWith('touch') ||
    		event_name === 'wheel'
    	) {
    		queue_micro_task(() => {
    			dom.addEventListener(event_name, target_handler, options);
    		});
    	} else {
    		dom.addEventListener(event_name, target_handler, options);
    	}

    	return target_handler;
    }

    /**
     * @param {string} event_name
     * @param {Element} dom
     * @param {EventListener} [handler]
     * @param {boolean} [capture]
     * @param {boolean} [passive]
     * @returns {void}
     */
    function event(event_name, dom, handler, capture, passive) {
    	var options = { capture, passive };
    	var target_handler = create_event(event_name, dom, handler, options);

    	if (
    		dom === document.body ||
    		// @ts-ignore
    		dom === window ||
    		// @ts-ignore
    		dom === document ||
    		// Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    		dom instanceof HTMLMediaElement
    	) {
    		teardown(() => {
    			dom.removeEventListener(event_name, target_handler, options);
    		});
    	}
    }

    /**
     * @param {Array<string>} events
     * @returns {void}
     */
    function delegate(events) {
    	for (var i = 0; i < events.length; i++) {
    		all_registered_events.add(events[i]);
    	}

    	for (var fn of root_event_handles) {
    		fn(events);
    	}
    }

    // used to store the reference to the currently propagated event
    // to prevent garbage collection between microtasks in Firefox
    // If the event object is GCed too early, the expando __root property
    // set on the event object is lost, causing the event delegation
    // to process the event twice
    let last_propagated_event = null;

    /**
     * @this {EventTarget}
     * @param {Event} event
     * @returns {void}
     */
    function handle_event_propagation(event) {
    	var handler_element = this;
    	var owner_document = /** @type {Node} */ (handler_element).ownerDocument;
    	var event_name = event.type;
    	var path = event.composedPath?.() || [];
    	var current_target = /** @type {null | Element} */ (path[0] || event.target);

    	last_propagated_event = event;

    	// composedPath contains list of nodes the event has propagated through.
    	// We check __root to skip all nodes below it in case this is a
    	// parent of the __root node, which indicates that there's nested
    	// mounted apps. In this case we don't want to trigger events multiple times.
    	var path_idx = 0;

    	// the `last_propagated_event === event` check is redundant, but
    	// without it the variable will be DCE'd and things will
    	// fail mysteriously in Firefox
    	// @ts-expect-error is added below
    	var handled_at = last_propagated_event === event && event.__root;

    	if (handled_at) {
    		var at_idx = path.indexOf(handled_at);
    		if (
    			at_idx !== -1 &&
    			(handler_element === document || handler_element === /** @type {any} */ (window))
    		) {
    			// This is the fallback document listener or a window listener, but the event was already handled
    			// -> ignore, but set handle_at to document/window so that we're resetting the event
    			// chain in case someone manually dispatches the same event object again.
    			// @ts-expect-error
    			event.__root = handler_element;
    			return;
    		}

    		// We're deliberately not skipping if the index is higher, because
    		// someone could create an event programmatically and emit it multiple times,
    		// in which case we want to handle the whole propagation chain properly each time.
    		// (this will only be a false negative if the event is dispatched multiple times and
    		// the fallback document listener isn't reached in between, but that's super rare)
    		var handler_idx = path.indexOf(handler_element);
    		if (handler_idx === -1) {
    			// handle_idx can theoretically be -1 (happened in some JSDOM testing scenarios with an event listener on the window object)
    			// so guard against that, too, and assume that everything was handled at this point.
    			return;
    		}

    		if (at_idx <= handler_idx) {
    			path_idx = at_idx;
    		}
    	}

    	current_target = /** @type {Element} */ (path[path_idx] || event.target);
    	// there can only be one delegated event per element, and we either already handled the current target,
    	// or this is the very first target in the chain which has a non-delegated listener, in which case it's safe
    	// to handle a possible delegated event on it later (through the root delegation listener for example).
    	if (current_target === handler_element) return;

    	// Proxy currentTarget to correct target
    	define_property(event, 'currentTarget', {
    		configurable: true,
    		get() {
    			return current_target || owner_document;
    		}
    	});

    	// This started because of Chromium issue https://chromestatus.com/feature/5128696823545856,
    	// where removal or moving of of the DOM can cause sync `blur` events to fire, which can cause logic
    	// to run inside the current `active_reaction`, which isn't what we want at all. However, on reflection,
    	// it's probably best that all event handled by Svelte have this behaviour, as we don't really want
    	// an event handler to run in the context of another reaction or effect.
    	var previous_reaction = active_reaction;
    	var previous_effect = active_effect;
    	set_active_reaction(null);
    	set_active_effect(null);

    	try {
    		/**
    		 * @type {unknown}
    		 */
    		var throw_error;
    		/**
    		 * @type {unknown[]}
    		 */
    		var other_errors = [];

    		while (current_target !== null) {
    			/** @type {null | Element} */
    			var parent_element =
    				current_target.assignedSlot ||
    				current_target.parentNode ||
    				/** @type {any} */ (current_target).host ||
    				null;

    			try {
    				// @ts-expect-error
    				var delegated = current_target['__' + event_name];

    				if (
    					delegated != null &&
    					(!(/** @type {any} */ (current_target).disabled) ||
    						// DOM could've been updated already by the time this is reached, so we check this as well
    						// -> the target could not have been disabled because it emits the event in the first place
    						event.target === current_target)
    				) {
    					delegated.call(current_target, event);
    				}
    			} catch (error) {
    				if (throw_error) {
    					other_errors.push(error);
    				} else {
    					throw_error = error;
    				}
    			}
    			if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
    				break;
    			}
    			current_target = parent_element;
    		}

    		if (throw_error) {
    			for (let error of other_errors) {
    				// Throw the rest of the errors, one-by-one on a microtask
    				queueMicrotask(() => {
    					throw error;
    				});
    			}
    			throw throw_error;
    		}
    	} finally {
    		// @ts-expect-error is used above
    		event.__root = handler_element;
    		// @ts-ignore remove proxy on currentTarget
    		delete event.currentTarget;
    		set_active_reaction(previous_reaction);
    		set_active_effect(previous_effect);
    	}
    }

    /** @param {string} html */
    function create_fragment_from_html(html) {
    	var elem = document.createElement('template');
    	elem.innerHTML = html.replaceAll('<!>', '<!---->'); // XHTML compliance
    	return elem.content;
    }

    /** @import { Effect, EffectNodes, TemplateNode } from '#client' */
    /** @import { TemplateStructure } from './types' */

    /**
     * @param {TemplateNode} start
     * @param {TemplateNode | null} end
     */
    function assign_nodes(start, end) {
    	var effect = /** @type {Effect} */ (active_effect);
    	if (effect.nodes === null) {
    		effect.nodes = { start, end, a: null, t: null };
    	}
    }

    /**
     * @param {string} content
     * @param {number} flags
     * @returns {() => Node | Node[]}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function from_html(content, flags) {
    	var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    	var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;

    	/** @type {Node} */
    	var node;

    	/**
    	 * Whether or not the first item is a text/element node. If not, we need to
    	 * create an additional comment node to act as `effect.nodes.start`
    	 */
    	var has_start = !content.startsWith('<!>');

    	return () => {
    		if (hydrating) {
    			assign_nodes(hydrate_node, null);
    			return hydrate_node;
    		}

    		if (node === undefined) {
    			node = create_fragment_from_html(has_start ? content : '<!>' + content);
    			if (!is_fragment) node = /** @type {TemplateNode} */ (get_first_child(node));
    		}

    		var clone = /** @type {TemplateNode} */ (
    			use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    		);

    		if (is_fragment) {
    			var start = /** @type {TemplateNode} */ (get_first_child(clone));
    			var end = /** @type {TemplateNode} */ (clone.lastChild);

    			assign_nodes(start, end);
    		} else {
    			assign_nodes(clone, clone);
    		}

    		return clone;
    	};
    }

    /**
     * @param {string} content
     * @param {number} flags
     * @param {'svg' | 'math'} ns
     * @returns {() => Node | Node[]}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function from_namespace(content, flags, ns = 'svg') {
    	/**
    	 * Whether or not the first item is a text/element node. If not, we need to
    	 * create an additional comment node to act as `effect.nodes.start`
    	 */
    	var has_start = !content.startsWith('<!>');
    	var wrapped = `<${ns}>${has_start ? content : '<!>' + content}</${ns}>`;

    	/** @type {Element | DocumentFragment} */
    	var node;

    	return () => {
    		if (hydrating) {
    			assign_nodes(hydrate_node, null);
    			return hydrate_node;
    		}

    		if (!node) {
    			var fragment = /** @type {DocumentFragment} */ (create_fragment_from_html(wrapped));
    			var root = /** @type {Element} */ (get_first_child(fragment));

    			{
    				node = /** @type {Element} */ (get_first_child(root));
    			}
    		}

    		var clone = /** @type {TemplateNode} */ (node.cloneNode(true));

    		{
    			assign_nodes(clone, clone);
    		}

    		return clone;
    	};
    }

    /**
     * @param {string} content
     * @param {number} flags
     */
    /*#__NO_SIDE_EFFECTS__*/
    function from_svg(content, flags) {
    	return from_namespace(content, flags, 'svg');
    }

    /**
     * Don't mark this as side-effect-free, hydration needs to walk all nodes
     * @param {any} value
     */
    function text(value = '') {
    	if (!hydrating) {
    		var t = create_text(value + '');
    		assign_nodes(t, t);
    		return t;
    	}

    	var node = hydrate_node;

    	if (node.nodeType !== TEXT_NODE) {
    		// if an {expression} is empty during SSR, we need to insert an empty text node
    		node.before((node = create_text()));
    		set_hydrate_node(node);
    	}

    	assign_nodes(node, node);
    	return node;
    }

    /**
     * @returns {TemplateNode | DocumentFragment}
     */
    function comment() {
    	// we're not delegating to `template` here for performance reasons
    	if (hydrating) {
    		assign_nodes(hydrate_node, null);
    		return hydrate_node;
    	}

    	var frag = document.createDocumentFragment();
    	var start = document.createComment('');
    	var anchor = create_text();
    	frag.append(start, anchor);

    	assign_nodes(start, anchor);

    	return frag;
    }

    /**
     * Assign the created (or in hydration mode, traversed) dom elements to the current block
     * and insert the elements into the dom (in client mode).
     * @param {Text | Comment | Element} anchor
     * @param {DocumentFragment | Element} dom
     */
    function append(anchor, dom) {
    	if (hydrating) {
    		var effect = /** @type {Effect & { nodes: EffectNodes }} */ (active_effect);

    		// When hydrating and outer component and an inner component is async, i.e. blocked on a promise,
    		// then by the time the inner resolves we have already advanced to the end of the hydrated nodes
    		// of the parent component. Check for defined for that reason to avoid rewinding the parent's end marker.
    		if ((effect.f & EFFECT_RAN) === 0 || effect.nodes.end === null) {
    			effect.nodes.end = hydrate_node;
    		}

    		hydrate_next();
    		return;
    	}

    	if (anchor === null) {
    		// edge case — void `<svelte:element>` with content
    		return;
    	}

    	anchor.before(/** @type {Node} */ (dom));
    }

    /**
     * @param {string} name
     */
    function is_capture_event(name) {
    	return name.endsWith('capture') && name !== 'gotpointercapture' && name !== 'lostpointercapture';
    }

    /** List of Element events that will be delegated */
    const DELEGATED_EVENTS = [
    	'beforeinput',
    	'click',
    	'change',
    	'dblclick',
    	'contextmenu',
    	'focusin',
    	'focusout',
    	'input',
    	'keydown',
    	'keyup',
    	'mousedown',
    	'mousemove',
    	'mouseout',
    	'mouseover',
    	'mouseup',
    	'pointerdown',
    	'pointermove',
    	'pointerout',
    	'pointerover',
    	'pointerup',
    	'touchend',
    	'touchmove',
    	'touchstart'
    ];

    /**
     * Returns `true` if `event_name` is a delegated event
     * @param {string} event_name
     */
    function can_delegate_event(event_name) {
    	return DELEGATED_EVENTS.includes(event_name);
    }

    /**
     * @type {Record<string, string>}
     * List of attribute names that should be aliased to their property names
     * because they behave differently between setting them as an attribute and
     * setting them as a property.
     */
    const ATTRIBUTE_ALIASES = {
    	// no `class: 'className'` because we handle that separately
    	formnovalidate: 'formNoValidate',
    	ismap: 'isMap',
    	nomodule: 'noModule',
    	playsinline: 'playsInline',
    	readonly: 'readOnly',
    	defaultvalue: 'defaultValue',
    	defaultchecked: 'defaultChecked',
    	srcobject: 'srcObject',
    	novalidate: 'noValidate',
    	allowfullscreen: 'allowFullscreen',
    	disablepictureinpicture: 'disablePictureInPicture',
    	disableremoteplayback: 'disableRemotePlayback'
    };

    /**
     * @param {string} name
     */
    function normalize_attribute(name) {
    	name = name.toLowerCase();
    	return ATTRIBUTE_ALIASES[name] ?? name;
    }

    /**
     * Subset of delegated events which should be passive by default.
     * These two are already passive via browser defaults on window, document and body.
     * But since
     * - we're delegating them
     * - they happen often
     * - they apply to mobile which is generally less performant
     * we're marking them as passive by default for other elements, too.
     */
    const PASSIVE_EVENTS = ['touchstart', 'touchmove'];

    /**
     * Returns `true` if `name` is a passive event
     * @param {string} name
     */
    function is_passive_event(name) {
    	return PASSIVE_EVENTS.includes(name);
    }

    /** @import { ComponentContext, Effect, EffectNodes, TemplateNode } from '#client' */
    /** @import { Component, ComponentType, SvelteComponent, MountOptions } from '../../index.js' */

    /**
     * This is normally true — block effects should run their intro transitions —
     * but is false during hydration (unless `options.intro` is `true`) and
     * when creating the children of a `<svelte:element>` that just changed tag
     */
    let should_intro = true;

    /**
     * @param {Element} text
     * @param {string} value
     * @returns {void}
     */
    function set_text(text, value) {
    	// For objects, we apply string coercion (which might make things like $state array references in the template reactive) before diffing
    	var str = value == null ? '' : typeof value === 'object' ? value + '' : value;
    	// @ts-expect-error
    	if (str !== (text.__t ??= text.nodeValue)) {
    		// @ts-expect-error
    		text.__t = str;
    		text.nodeValue = str + '';
    	}
    }

    /**
     * Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
     * Transitions will play during the initial render unless the `intro` option is set to `false`.
     *
     * @template {Record<string, any>} Props
     * @template {Record<string, any>} Exports
     * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
     * @param {MountOptions<Props>} options
     * @returns {Exports}
     */
    function mount(component, options) {
    	return _mount(component, options);
    }

    /**
     * Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
     *
     * @template {Record<string, any>} Props
     * @template {Record<string, any>} Exports
     * @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
     * @param {{} extends Props ? {
     * 		target: Document | Element | ShadowRoot;
     * 		props?: Props;
     * 		events?: Record<string, (e: any) => any>;
     *  	context?: Map<any, any>;
     * 		intro?: boolean;
     * 		recover?: boolean;
     * 	} : {
     * 		target: Document | Element | ShadowRoot;
     * 		props: Props;
     * 		events?: Record<string, (e: any) => any>;
     *  	context?: Map<any, any>;
     * 		intro?: boolean;
     * 		recover?: boolean;
     * 	}} options
     * @returns {Exports}
     */
    function hydrate(component, options) {
    	init_operations();
    	options.intro = options.intro ?? false;
    	const target = options.target;
    	const was_hydrating = hydrating;
    	const previous_hydrate_node = hydrate_node;

    	try {
    		var anchor = get_first_child(target);

    		while (
    			anchor &&
    			(anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */ (anchor).data !== HYDRATION_START)
    		) {
    			anchor = get_next_sibling(anchor);
    		}

    		if (!anchor) {
    			throw HYDRATION_ERROR;
    		}

    		set_hydrating(true);
    		set_hydrate_node(/** @type {Comment} */ (anchor));

    		const instance = _mount(component, { ...options, anchor });

    		set_hydrating(false);

    		return /**  @type {Exports} */ (instance);
    	} catch (error) {
    		// re-throw Svelte errors - they are certainly not related to hydration
    		if (
    			error instanceof Error &&
    			error.message.split('\n').some((line) => line.startsWith('https://svelte.dev/e/'))
    		) {
    			throw error;
    		}
    		if (error !== HYDRATION_ERROR) {
    			// eslint-disable-next-line no-console
    			console.warn('Failed to hydrate: ', error);
    		}

    		if (options.recover === false) {
    			hydration_failed();
    		}

    		// If an error occurred above, the operations might not yet have been initialised.
    		init_operations();
    		clear_text_content(target);

    		set_hydrating(false);
    		return mount(component, options);
    	} finally {
    		set_hydrating(was_hydrating);
    		set_hydrate_node(previous_hydrate_node);
    	}
    }

    /** @type {Map<string, number>} */
    const document_listeners = new Map();

    /**
     * @template {Record<string, any>} Exports
     * @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
     * @param {MountOptions} options
     * @returns {Exports}
     */
    function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
    	init_operations();

    	/** @type {Set<string>} */
    	var registered_events = new Set();

    	/** @param {Array<string>} events */
    	var event_handle = (events) => {
    		for (var i = 0; i < events.length; i++) {
    			var event_name = events[i];

    			if (registered_events.has(event_name)) continue;
    			registered_events.add(event_name);

    			var passive = is_passive_event(event_name);

    			// Add the event listener to both the container and the document.
    			// The container listener ensures we catch events from within in case
    			// the outer content stops propagation of the event.
    			target.addEventListener(event_name, handle_event_propagation, { passive });

    			var n = document_listeners.get(event_name);

    			if (n === undefined) {
    				// The document listener ensures we catch events that originate from elements that were
    				// manually moved outside of the container (e.g. via manual portals).
    				document.addEventListener(event_name, handle_event_propagation, { passive });
    				document_listeners.set(event_name, 1);
    			} else {
    				document_listeners.set(event_name, n + 1);
    			}
    		}
    	};

    	event_handle(array_from(all_registered_events));
    	root_event_handles.add(event_handle);

    	/** @type {Exports} */
    	// @ts-expect-error will be defined because the render effect runs synchronously
    	var component = undefined;

    	var unmount = component_root(() => {
    		var anchor_node = anchor ?? target.appendChild(create_text());

    		boundary(
    			/** @type {TemplateNode} */ (anchor_node),
    			{
    				pending: () => {}
    			},
    			(anchor_node) => {
    				if (context) {
    					push({});
    					var ctx = /** @type {ComponentContext} */ (component_context);
    					ctx.c = context;
    				}

    				if (events) {
    					// We can't spread the object or else we'd lose the state proxy stuff, if it is one
    					/** @type {any} */ (props).$$events = events;
    				}

    				if (hydrating) {
    					assign_nodes(/** @type {TemplateNode} */ (anchor_node), null);
    				}

    				should_intro = intro;
    				// @ts-expect-error the public typings are not what the actual function looks like
    				component = Component(anchor_node, props) || {};
    				should_intro = true;

    				if (hydrating) {
    					/** @type {Effect & { nodes: EffectNodes }} */ (active_effect).nodes.end = hydrate_node;

    					if (
    						hydrate_node === null ||
    						hydrate_node.nodeType !== COMMENT_NODE ||
    						/** @type {Comment} */ (hydrate_node).data !== HYDRATION_END
    					) {
    						hydration_mismatch();
    						throw HYDRATION_ERROR;
    					}
    				}

    				if (context) {
    					pop();
    				}
    			}
    		);

    		return () => {
    			for (var event_name of registered_events) {
    				target.removeEventListener(event_name, handle_event_propagation);

    				var n = /** @type {number} */ (document_listeners.get(event_name));

    				if (--n === 0) {
    					document.removeEventListener(event_name, handle_event_propagation);
    					document_listeners.delete(event_name);
    				} else {
    					document_listeners.set(event_name, n);
    				}
    			}

    			root_event_handles.delete(event_handle);

    			if (anchor_node !== anchor) {
    				anchor_node.parentNode?.removeChild(anchor_node);
    			}
    		};
    	});

    	mounted_components.set(component, unmount);
    	return component;
    }

    /**
     * References of the components that were mounted or hydrated.
     * Uses a `WeakMap` to avoid memory leaks.
     */
    let mounted_components = new WeakMap();

    /**
     * Unmounts a component that was previously mounted using `mount` or `hydrate`.
     *
     * Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
     *
     * Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
     *
     * ```js
     * import { mount, unmount } from 'svelte';
     * import App from './App.svelte';
     *
     * const app = mount(App, { target: document.body });
     *
     * // later...
     * unmount(app, { outro: true });
     * ```
     * @param {Record<string, any>} component
     * @param {{ outro?: boolean }} [options]
     * @returns {Promise<void>}
     */
    function unmount(component, options) {
    	const fn = mounted_components.get(component);

    	if (fn) {
    		mounted_components.delete(component);
    		return fn(options);
    	}

    	return Promise.resolve();
    }

    /** @import { Effect, TemplateNode } from '#client' */

    /**
     * @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
     */

    /**
     * @template Key
     */
    class BranchManager {
    	/** @type {TemplateNode} */
    	anchor;

    	/** @type {Map<Batch, Key>} */
    	#batches = new Map();

    	/**
    	 * Map of keys to effects that are currently rendered in the DOM.
    	 * These effects are visible and actively part of the document tree.
    	 * Example:
    	 * ```
    	 * {#if condition}
    	 * 	foo
    	 * {:else}
    	 * 	bar
    	 * {/if}
    	 * ```
    	 * Can result in the entries `true->Effect` and `false->Effect`
    	 * @type {Map<Key, Effect>}
    	 */
    	#onscreen = new Map();

    	/**
    	 * Similar to #onscreen with respect to the keys, but contains branches that are not yet
    	 * in the DOM, because their insertion is deferred.
    	 * @type {Map<Key, Branch>}
    	 */
    	#offscreen = new Map();

    	/**
    	 * Keys of effects that are currently outroing
    	 * @type {Set<Key>}
    	 */
    	#outroing = new Set();

    	/**
    	 * Whether to pause (i.e. outro) on change, or destroy immediately.
    	 * This is necessary for `<svelte:element>`
    	 */
    	#transition = true;

    	/**
    	 * @param {TemplateNode} anchor
    	 * @param {boolean} transition
    	 */
    	constructor(anchor, transition = true) {
    		this.anchor = anchor;
    		this.#transition = transition;
    	}

    	#commit = () => {
    		var batch = /** @type {Batch} */ (current_batch);

    		// if this batch was made obsolete, bail
    		if (!this.#batches.has(batch)) return;

    		var key = /** @type {Key} */ (this.#batches.get(batch));

    		var onscreen = this.#onscreen.get(key);

    		if (onscreen) {
    			// effect is already in the DOM — abort any current outro
    			resume_effect(onscreen);
    			this.#outroing.delete(key);
    		} else {
    			// effect is currently offscreen. put it in the DOM
    			var offscreen = this.#offscreen.get(key);

    			if (offscreen) {
    				this.#onscreen.set(key, offscreen.effect);
    				this.#offscreen.delete(key);

    				// remove the anchor...
    				/** @type {TemplateNode} */ (offscreen.fragment.lastChild).remove();

    				// ...and append the fragment
    				this.anchor.before(offscreen.fragment);
    				onscreen = offscreen.effect;
    			}
    		}

    		for (const [b, k] of this.#batches) {
    			this.#batches.delete(b);

    			if (b === batch) {
    				// keep values for newer batches
    				break;
    			}

    			const offscreen = this.#offscreen.get(k);

    			if (offscreen) {
    				// for older batches, destroy offscreen effects
    				// as they will never be committed
    				destroy_effect(offscreen.effect);
    				this.#offscreen.delete(k);
    			}
    		}

    		// outro/destroy all onscreen effects...
    		for (const [k, effect] of this.#onscreen) {
    			// ...except the one that was just committed
    			//    or those that are already outroing (else the transition is aborted and the effect destroyed right away)
    			if (k === key || this.#outroing.has(k)) continue;

    			const on_destroy = () => {
    				const keys = Array.from(this.#batches.values());

    				if (keys.includes(k)) {
    					// keep the effect offscreen, as another batch will need it
    					var fragment = document.createDocumentFragment();
    					move_effect(effect, fragment);

    					fragment.append(create_text()); // TODO can we avoid this?

    					this.#offscreen.set(k, { effect, fragment });
    				} else {
    					destroy_effect(effect);
    				}

    				this.#outroing.delete(k);
    				this.#onscreen.delete(k);
    			};

    			if (this.#transition || !onscreen) {
    				this.#outroing.add(k);
    				pause_effect(effect, on_destroy, false);
    			} else {
    				on_destroy();
    			}
    		}
    	};

    	/**
    	 * @param {Batch} batch
    	 */
    	#discard = (batch) => {
    		this.#batches.delete(batch);

    		const keys = Array.from(this.#batches.values());

    		for (const [k, branch] of this.#offscreen) {
    			if (!keys.includes(k)) {
    				destroy_effect(branch.effect);
    				this.#offscreen.delete(k);
    			}
    		}
    	};

    	/**
    	 *
    	 * @param {any} key
    	 * @param {null | ((target: TemplateNode) => void)} fn
    	 */
    	ensure(key, fn) {
    		var batch = /** @type {Batch} */ (current_batch);
    		var defer = should_defer_append();

    		if (fn && !this.#onscreen.has(key) && !this.#offscreen.has(key)) {
    			if (defer) {
    				var fragment = document.createDocumentFragment();
    				var target = create_text();

    				fragment.append(target);

    				this.#offscreen.set(key, {
    					effect: branch(() => fn(target)),
    					fragment
    				});
    			} else {
    				this.#onscreen.set(
    					key,
    					branch(() => fn(this.anchor))
    				);
    			}
    		}

    		this.#batches.set(batch, key);

    		if (defer) {
    			for (const [k, effect] of this.#onscreen) {
    				if (k === key) {
    					batch.skipped_effects.delete(effect);
    				} else {
    					batch.skipped_effects.add(effect);
    				}
    			}

    			for (const [k, branch] of this.#offscreen) {
    				if (k === key) {
    					batch.skipped_effects.delete(branch.effect);
    				} else {
    					batch.skipped_effects.add(branch.effect);
    				}
    			}

    			batch.oncommit(this.#commit);
    			batch.ondiscard(this.#discard);
    		} else {
    			if (hydrating) {
    				this.anchor = hydrate_node;
    			}

    			this.#commit();
    		}
    	}
    }

    /** @import { ComponentContext, ComponentContextLegacy } from '#client' */
    /** @import { EventDispatcher } from './index.js' */
    /** @import { NotFunction } from './internal/types.js' */

    /**
     * `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
     * Unlike `$effect`, the provided function only runs once.
     *
     * It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
     * it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
     * it will be called when the component is unmounted.
     *
     * `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
     *
     * @template T
     * @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
     * @returns {void}
     */
    function onMount(fn) {
    	if (component_context === null) {
    		lifecycle_outside_component();
    	}

    	if (legacy_mode_flag && component_context.l !== null) {
    		init_update_callbacks(component_context).m.push(fn);
    	} else {
    		user_effect(() => {
    			const cleanup = untrack(fn);
    			if (typeof cleanup === 'function') return /** @type {() => void} */ (cleanup);
    		});
    	}
    }

    /**
     * Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
     * @param {ComponentContext} context
     */
    function init_update_callbacks(context) {
    	var l = /** @type {ComponentContextLegacy} */ (context).l;
    	return (l.u ??= { a: [], b: [], m: [] });
    }

    /** @import { TemplateNode } from '#client' */

    // TODO reinstate https://github.com/sveltejs/svelte/pull/15250

    /**
     * @param {TemplateNode} node
     * @param {(branch: (fn: (anchor: Node) => void, flag?: boolean) => void) => void} fn
     * @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
     * @returns {void}
     */
    function if_block(node, fn, elseif = false) {
    	if (hydrating) {
    		hydrate_next();
    	}

    	var branches = new BranchManager(node);
    	var flags = elseif ? EFFECT_TRANSPARENT : 0;

    	/**
    	 * @param {boolean} condition,
    	 * @param {null | ((anchor: Node) => void)} fn
    	 */
    	function update_branch(condition, fn) {
    		if (hydrating) {
    			const is_else = read_hydration_instruction(node) === HYDRATION_START_ELSE;

    			if (condition === is_else) {
    				// Hydration mismatch: remove everything inside the anchor and start fresh.
    				// This could happen with `{#if browser}...{/if}`, for example
    				var anchor = skip_nodes();

    				set_hydrate_node(anchor);
    				branches.anchor = anchor;

    				set_hydrating(false);
    				branches.ensure(condition, fn);
    				set_hydrating(true);

    				return;
    			}
    		}

    		branches.ensure(condition, fn);
    	}

    	block(() => {
    		var has_branch = false;

    		fn((fn, flag = true) => {
    			has_branch = true;
    			update_branch(flag, fn);
    		});

    		if (!has_branch) {
    			update_branch(false, null);
    		}
    	}, flags);
    }

    /** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
    /** @import { Batch } from '../../reactivity/batch.js'; */

    // When making substantive changes to this file, validate them with the each block stress test:
    // https://svelte.dev/playground/1972b2cf46564476ad8c8c6405b23b7b
    // This test also exists in this repo, as `packages/svelte/tests/manual/each-stress-test`

    /**
     * @param {any} _
     * @param {number} i
     */
    function index(_, i) {
    	return i;
    }

    /**
     * Pause multiple effects simultaneously, and coordinate their
     * subsequent destruction. Used in each blocks
     * @param {EachState} state
     * @param {Effect[]} to_destroy
     * @param {null | Node} controlled_anchor
     */
    function pause_effects(state, to_destroy, controlled_anchor) {
    	/** @type {TransitionManager[]} */
    	var transitions = [];
    	var length = to_destroy.length;

    	/** @type {EachOutroGroup} */
    	var group;
    	var remaining = to_destroy.length;

    	for (var i = 0; i < length; i++) {
    		let effect = to_destroy[i];

    		pause_effect(
    			effect,
    			() => {
    				if (group) {
    					group.pending.delete(effect);
    					group.done.add(effect);

    					if (group.pending.size === 0) {
    						var groups = /** @type {Set<EachOutroGroup>} */ (state.outrogroups);

    						destroy_effects(array_from(group.done));
    						groups.delete(group);

    						if (groups.size === 0) {
    							state.outrogroups = null;
    						}
    					}
    				} else {
    					remaining -= 1;
    				}
    			},
    			false
    		);
    	}

    	if (remaining === 0) {
    		// If we're in a controlled each block (i.e. the block is the only child of an
    		// element), and we are removing all items, _and_ there are no out transitions,
    		// we can use the fast path — emptying the element and replacing the anchor
    		var fast_path = transitions.length === 0 && controlled_anchor !== null;

    		if (fast_path) {
    			var anchor = /** @type {Element} */ (controlled_anchor);
    			var parent_node = /** @type {Element} */ (anchor.parentNode);

    			clear_text_content(parent_node);
    			parent_node.append(anchor);

    			state.items.clear();
    		}

    		destroy_effects(to_destroy, !fast_path);
    	} else {
    		group = {
    			pending: new Set(to_destroy),
    			done: new Set()
    		};

    		(state.outrogroups ??= new Set()).add(group);
    	}
    }

    /**
     * @param {Effect[]} to_destroy
     * @param {boolean} remove_dom
     */
    function destroy_effects(to_destroy, remove_dom = true) {
    	// TODO only destroy effects if no pending batch needs them. otherwise,
    	// just re-add the `EFFECT_OFFSCREEN` flag
    	for (var i = 0; i < to_destroy.length; i++) {
    		destroy_effect(to_destroy[i], remove_dom);
    	}
    }

    /** @type {TemplateNode} */
    var offscreen_anchor;

    /**
     * @template V
     * @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
     * @param {number} flags
     * @param {() => V[]} get_collection
     * @param {(value: V, index: number) => any} get_key
     * @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
     * @param {null | ((anchor: Node) => void)} fallback_fn
     * @returns {void}
     */
    function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    	var anchor = node;

    	/** @type {Map<any, EachItem>} */
    	var items = new Map();

    	var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;

    	if (is_controlled) {
    		var parent_node = /** @type {Element} */ (node);

    		anchor = hydrating
    			? set_hydrate_node(get_first_child(parent_node))
    			: parent_node.appendChild(create_text());
    	}

    	if (hydrating) {
    		hydrate_next();
    	}

    	/** @type {Effect | null} */
    	var fallback = null;

    	// TODO: ideally we could use derived for runes mode but because of the ability
    	// to use a store which can be mutated, we can't do that here as mutating a store
    	// will still result in the collection array being the same from the store
    	var each_array = derived_safe_equal(() => {
    		var collection = get_collection();

    		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
    	});

    	/** @type {V[]} */
    	var array;

    	var first_run = true;

    	function commit() {
    		state.fallback = fallback;
    		reconcile(state, array, anchor, flags, get_key);

    		if (fallback !== null) {
    			if (array.length === 0) {
    				if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
    					resume_effect(fallback);
    				} else {
    					fallback.f ^= EFFECT_OFFSCREEN;
    					move(fallback, null, anchor);
    				}
    			} else {
    				pause_effect(fallback, () => {
    					// TODO only null out if no pending batch needs it,
    					// otherwise re-add `fallback.fragment` and move the
    					// effect into it
    					fallback = null;
    				});
    			}
    		}
    	}

    	var effect = block(() => {
    		array = /** @type {V[]} */ (get(each_array));
    		var length = array.length;

    		/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
    		let mismatch = false;

    		if (hydrating) {
    			var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;

    			if (is_else !== (length === 0)) {
    				// hydration mismatch — remove the server-rendered DOM and start over
    				anchor = skip_nodes();

    				set_hydrate_node(anchor);
    				set_hydrating(false);
    				mismatch = true;
    			}
    		}

    		var keys = new Set();
    		var batch = /** @type {Batch} */ (current_batch);
    		var defer = should_defer_append();

    		for (var index = 0; index < length; index += 1) {
    			if (
    				hydrating &&
    				hydrate_node.nodeType === COMMENT_NODE &&
    				/** @type {Comment} */ (hydrate_node).data === HYDRATION_END
    			) {
    				// The server rendered fewer items than expected,
    				// so break out and continue appending non-hydrated items
    				anchor = /** @type {Comment} */ (hydrate_node);
    				mismatch = true;
    				set_hydrating(false);
    			}

    			var value = array[index];
    			var key = get_key(value, index);

    			var item = first_run ? null : items.get(key);

    			if (item) {
    				// update before reconciliation, to trigger any async updates
    				if (item.v) internal_set(item.v, value);
    				if (item.i) internal_set(item.i, index);

    				if (defer) {
    					batch.skipped_effects.delete(item.e);
    				}
    			} else {
    				item = create_item(
    					items,
    					first_run ? anchor : (offscreen_anchor ??= create_text()),
    					value,
    					key,
    					index,
    					render_fn,
    					flags,
    					get_collection
    				);

    				if (!first_run) {
    					item.e.f |= EFFECT_OFFSCREEN;
    				}

    				items.set(key, item);
    			}

    			keys.add(key);
    		}

    		if (length === 0 && fallback_fn && !fallback) {
    			if (first_run) {
    				fallback = branch(() => fallback_fn(anchor));
    			} else {
    				fallback = branch(() => fallback_fn((offscreen_anchor ??= create_text())));
    				fallback.f |= EFFECT_OFFSCREEN;
    			}
    		}

    		// remove excess nodes
    		if (hydrating && length > 0) {
    			set_hydrate_node(skip_nodes());
    		}

    		if (!first_run) {
    			if (defer) {
    				for (const [key, item] of items) {
    					if (!keys.has(key)) {
    						batch.skipped_effects.add(item.e);
    					}
    				}

    				batch.oncommit(commit);
    				batch.ondiscard(() => {
    					// TODO presumably we need to do something here?
    				});
    			} else {
    				commit();
    			}
    		}

    		if (mismatch) {
    			// continue in hydration mode
    			set_hydrating(true);
    		}

    		// When we mount the each block for the first time, the collection won't be
    		// connected to this effect as the effect hasn't finished running yet and its deps
    		// won't be assigned. However, it's possible that when reconciling the each block
    		// that a mutation occurred and it's made the collection MAYBE_DIRTY, so reading the
    		// collection again can provide consistency to the reactive graph again as the deriveds
    		// will now be `CLEAN`.
    		get(each_array);
    	});

    	/** @type {EachState} */
    	var state = { effect, items, outrogroups: null, fallback };

    	first_run = false;

    	if (hydrating) {
    		anchor = hydrate_node;
    	}
    }

    /**
     * Add, remove, or reorder items output by an each block as its input changes
     * @template V
     * @param {EachState} state
     * @param {Array<V>} array
     * @param {Element | Comment | Text} anchor
     * @param {number} flags
     * @param {(value: V, index: number) => any} get_key
     * @returns {void}
     */
    function reconcile(state, array, anchor, flags, get_key) {
    	var is_animated = (flags & EACH_IS_ANIMATED) !== 0;

    	var length = array.length;
    	var items = state.items;
    	var current = state.effect.first;

    	/** @type {undefined | Set<Effect>} */
    	var seen;

    	/** @type {Effect | null} */
    	var prev = null;

    	/** @type {undefined | Set<Effect>} */
    	var to_animate;

    	/** @type {Effect[]} */
    	var matched = [];

    	/** @type {Effect[]} */
    	var stashed = [];

    	/** @type {V} */
    	var value;

    	/** @type {any} */
    	var key;

    	/** @type {Effect | undefined} */
    	var effect;

    	/** @type {number} */
    	var i;

    	if (is_animated) {
    		for (i = 0; i < length; i += 1) {
    			value = array[i];
    			key = get_key(value, i);
    			effect = /** @type {EachItem} */ (items.get(key)).e;

    			// offscreen == coming in now, no animation in that case,
    			// else this would happen https://github.com/sveltejs/svelte/issues/17181
    			if ((effect.f & EFFECT_OFFSCREEN) === 0) {
    				effect.nodes?.a?.measure();
    				(to_animate ??= new Set()).add(effect);
    			}
    		}
    	}

    	for (i = 0; i < length; i += 1) {
    		value = array[i];
    		key = get_key(value, i);

    		effect = /** @type {EachItem} */ (items.get(key)).e;

    		if (state.outrogroups !== null) {
    			for (const group of state.outrogroups) {
    				group.pending.delete(effect);
    				group.done.delete(effect);
    			}
    		}

    		if ((effect.f & EFFECT_OFFSCREEN) !== 0) {
    			effect.f ^= EFFECT_OFFSCREEN;

    			if (effect === current) {
    				move(effect, null, anchor);
    			} else {
    				var next = prev ? prev.next : current;

    				if (effect === state.effect.last) {
    					state.effect.last = effect.prev;
    				}

    				if (effect.prev) effect.prev.next = effect.next;
    				if (effect.next) effect.next.prev = effect.prev;
    				link(state, prev, effect);
    				link(state, effect, next);

    				move(effect, next, anchor);
    				prev = effect;

    				matched = [];
    				stashed = [];

    				current = prev.next;
    				continue;
    			}
    		}

    		if ((effect.f & INERT) !== 0) {
    			resume_effect(effect);
    			if (is_animated) {
    				effect.nodes?.a?.unfix();
    				(to_animate ??= new Set()).delete(effect);
    			}
    		}

    		if (effect !== current) {
    			if (seen !== undefined && seen.has(effect)) {
    				if (matched.length < stashed.length) {
    					// more efficient to move later items to the front
    					var start = stashed[0];
    					var j;

    					prev = start.prev;

    					var a = matched[0];
    					var b = matched[matched.length - 1];

    					for (j = 0; j < matched.length; j += 1) {
    						move(matched[j], start, anchor);
    					}

    					for (j = 0; j < stashed.length; j += 1) {
    						seen.delete(stashed[j]);
    					}

    					link(state, a.prev, b.next);
    					link(state, prev, a);
    					link(state, b, start);

    					current = start;
    					prev = b;
    					i -= 1;

    					matched = [];
    					stashed = [];
    				} else {
    					// more efficient to move earlier items to the back
    					seen.delete(effect);
    					move(effect, current, anchor);

    					link(state, effect.prev, effect.next);
    					link(state, effect, prev === null ? state.effect.first : prev.next);
    					link(state, prev, effect);

    					prev = effect;
    				}

    				continue;
    			}

    			matched = [];
    			stashed = [];

    			while (current !== null && current !== effect) {
    				(seen ??= new Set()).add(current);
    				stashed.push(current);
    				current = current.next;
    			}

    			if (current === null) {
    				continue;
    			}
    		}

    		if ((effect.f & EFFECT_OFFSCREEN) === 0) {
    			matched.push(effect);
    		}

    		prev = effect;
    		current = effect.next;
    	}

    	if (state.outrogroups !== null) {
    		for (const group of state.outrogroups) {
    			if (group.pending.size === 0) {
    				destroy_effects(array_from(group.done));
    				state.outrogroups?.delete(group);
    			}
    		}

    		if (state.outrogroups.size === 0) {
    			state.outrogroups = null;
    		}
    	}

    	if (current !== null || seen !== undefined) {
    		/** @type {Effect[]} */
    		var to_destroy = [];

    		if (seen !== undefined) {
    			for (effect of seen) {
    				if ((effect.f & INERT) === 0) {
    					to_destroy.push(effect);
    				}
    			}
    		}

    		while (current !== null) {
    			// If the each block isn't inert, then inert effects are currently outroing and will be removed once the transition is finished
    			if ((current.f & INERT) === 0 && current !== state.fallback) {
    				to_destroy.push(current);
    			}

    			current = current.next;
    		}

    		var destroy_length = to_destroy.length;

    		if (destroy_length > 0) {
    			var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;

    			if (is_animated) {
    				for (i = 0; i < destroy_length; i += 1) {
    					to_destroy[i].nodes?.a?.measure();
    				}

    				for (i = 0; i < destroy_length; i += 1) {
    					to_destroy[i].nodes?.a?.fix();
    				}
    			}

    			pause_effects(state, to_destroy, controlled_anchor);
    		}
    	}

    	if (is_animated) {
    		queue_micro_task(() => {
    			if (to_animate === undefined) return;
    			for (effect of to_animate) {
    				effect.nodes?.a?.apply();
    			}
    		});
    	}
    }

    /**
     * @template V
     * @param {Map<any, EachItem>} items
     * @param {Node} anchor
     * @param {V} value
     * @param {unknown} key
     * @param {number} index
     * @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
     * @param {number} flags
     * @param {() => V[]} get_collection
     * @returns {EachItem}
     */
    function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
    	var v =
    		(flags & EACH_ITEM_REACTIVE) !== 0
    			? (flags & EACH_ITEM_IMMUTABLE) === 0
    				? mutable_source(value, false, false)
    				: source(value)
    			: null;

    	var i = (flags & EACH_INDEX_REACTIVE) !== 0 ? source(index) : null;

    	return {
    		v,
    		i,
    		e: branch(() => {
    			render_fn(anchor, v ?? value, i ?? index, get_collection);

    			return () => {
    				items.delete(key);
    			};
    		})
    	};
    }

    /**
     * @param {Effect} effect
     * @param {Effect | null} next
     * @param {Text | Element | Comment} anchor
     */
    function move(effect, next, anchor) {
    	if (!effect.nodes) return;

    	var node = effect.nodes.start;
    	var end = effect.nodes.end;

    	var dest =
    		next && (next.f & EFFECT_OFFSCREEN) === 0
    			? /** @type {EffectNodes} */ (next.nodes).start
    			: anchor;

    	while (node !== null) {
    		var next_node = /** @type {TemplateNode} */ (get_next_sibling(node));
    		dest.before(node);

    		if (node === end) {
    			return;
    		}

    		node = next_node;
    	}
    }

    /**
     * @param {EachState} state
     * @param {Effect | null} prev
     * @param {Effect | null} next
     */
    function link(state, prev, next) {
    	if (prev === null) {
    		state.effect.first = next;
    	} else {
    		prev.next = next;
    	}

    	if (next === null) {
    		state.effect.last = prev;
    	} else {
    		next.prev = prev;
    	}
    }

    /** @import { Effect, TemplateNode } from '#client' */

    /**
     * @param {Element | Text | Comment} node
     * @param {() => string} get_value
     * @param {boolean} [svg]
     * @param {boolean} [mathml]
     * @param {boolean} [skip_warning]
     * @returns {void}
     */
    function html(node, get_value, svg = false, mathml = false, skip_warning = false) {
    	var anchor = node;

    	var value = '';

    	template_effect(() => {
    		var effect = /** @type {Effect} */ (active_effect);

    		if (value === (value = get_value() ?? '')) {
    			if (hydrating) hydrate_next();
    			return;
    		}

    		if (effect.nodes !== null) {
    			remove_effect_dom(effect.nodes.start, /** @type {TemplateNode} */ (effect.nodes.end));
    			effect.nodes = null;
    		}

    		if (value === '') return;

    		if (hydrating) {
    			// We're deliberately not trying to repair mismatches between server and client,
    			// as it's costly and error-prone (and it's an edge case to have a mismatch anyway)
    			/** @type {Comment} */ (hydrate_node).data;

    			/** @type {TemplateNode | null} */
    			var next = hydrate_next();
    			var last = next;

    			while (
    				next !== null &&
    				(next.nodeType !== COMMENT_NODE || /** @type {Comment} */ (next).data !== '')
    			) {
    				last = next;
    				next = get_next_sibling(next);
    			}

    			if (next === null) {
    				hydration_mismatch();
    				throw HYDRATION_ERROR;
    			}

    			assign_nodes(hydrate_node, last);
    			anchor = set_hydrate_node(next);
    			return;
    		}

    		var html = value + '';
    		if (svg) html = `<svg>${html}</svg>`;
    		else if (mathml) html = `<math>${html}</math>`;

    		// Don't use create_fragment_with_script_from_html here because that would mean script tags are executed.
    		// @html is basically `.innerHTML = ...` and that doesn't execute scripts either due to security reasons.
    		/** @type {DocumentFragment | Element} */
    		var node = create_fragment_from_html(html);

    		if (svg || mathml) {
    			node = /** @type {Element} */ (get_first_child(node));
    		}

    		assign_nodes(
    			/** @type {TemplateNode} */ (get_first_child(node)),
    			/** @type {TemplateNode} */ (node.lastChild)
    		);

    		if (svg || mathml) {
    			while (get_first_child(node)) {
    				anchor.before(/** @type {TemplateNode} */ (get_first_child(node)));
    			}
    		} else {
    			anchor.before(node);
    		}
    	});
    }

    /**
     * @param {Comment} anchor
     * @param {Record<string, any>} $$props
     * @param {string} name
     * @param {Record<string, unknown>} slot_props
     * @param {null | ((anchor: Comment) => void)} fallback_fn
     */
    function slot(anchor, $$props, name, slot_props, fallback_fn) {
    	if (hydrating) {
    		hydrate_next();
    	}

    	var slot_fn = $$props.$$slots?.[name];
    	// Interop: Can use snippets to fill slots
    	var is_interop = false;
    	if (slot_fn === true) {
    		slot_fn = $$props['children' ];
    		is_interop = true;
    	}

    	if (slot_fn === undefined) ; else {
    		slot_fn(anchor, is_interop ? () => slot_props : slot_props);
    	}
    }

    /** @import { TemplateNode, Dom } from '#client' */

    /**
     * @template P
     * @template {(props: P) => void} C
     * @param {TemplateNode} node
     * @param {() => C} get_component
     * @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
     * @returns {void}
     */
    function component(node, get_component, render_fn) {
    	if (hydrating) {
    		hydrate_next();
    	}

    	var branches = new BranchManager(node);

    	block(() => {
    		var component = get_component() ?? null;
    		branches.ensure(component, component && ((target) => render_fn(target, component)));
    	}, EFFECT_TRANSPARENT);
    }

    /** @import { Raf } from '#client' */

    const now = () => performance.now() ;

    /** @type {Raf} */
    const raf = {
    	// don't access requestAnimationFrame eagerly outside method
    	// this allows basic testing of user code without JSDOM
    	// bunder will eval and remove ternary when the user's app is built
    	tick: /** @param {any} _ */ (_) => (requestAnimationFrame )(_),
    	now: () => now(),
    	tasks: new Set()
    };

    /** @import { TaskCallback, Task, TaskEntry } from '#client' */

    // TODO move this into timing.js where it probably belongs

    /**
     * @returns {void}
     */
    function run_tasks() {
    	// use `raf.now()` instead of the `requestAnimationFrame` callback argument, because
    	// otherwise things can get wonky https://github.com/sveltejs/svelte/pull/14541
    	const now = raf.now();

    	raf.tasks.forEach((task) => {
    		if (!task.c(now)) {
    			raf.tasks.delete(task);
    			task.f();
    		}
    	});

    	if (raf.tasks.size !== 0) {
    		raf.tick(run_tasks);
    	}
    }

    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     * @param {TaskCallback} callback
     * @returns {Task}
     */
    function loop(callback) {
    	/** @type {TaskEntry} */
    	let task;

    	if (raf.tasks.size === 0) {
    		raf.tick(run_tasks);
    	}

    	return {
    		promise: new Promise((fulfill) => {
    			raf.tasks.add((task = { c: callback, f: fulfill }));
    		}),
    		abort() {
    			raf.tasks.delete(task);
    		}
    	};
    }

    /** @import { AnimateFn, Animation, AnimationConfig, EachItem, Effect, EffectNodes, TransitionFn, TransitionManager } from '#client' */

    /**
     * @param {Element} element
     * @param {'introstart' | 'introend' | 'outrostart' | 'outroend'} type
     * @returns {void}
     */
    function dispatch_event(element, type) {
    	without_reactive_context(() => {
    		element.dispatchEvent(new CustomEvent(type));
    	});
    }

    /**
     * Converts a property to the camel-case format expected by Element.animate(), KeyframeEffect(), and KeyframeEffect.setKeyframes().
     * @param {string} style
     * @returns {string}
     */
    function css_property_to_camelcase(style) {
    	// in compliance with spec
    	if (style === 'float') return 'cssFloat';
    	if (style === 'offset') return 'cssOffset';

    	// do not rename custom @properties
    	if (style.startsWith('--')) return style;

    	const parts = style.split('-');
    	if (parts.length === 1) return parts[0];
    	return (
    		parts[0] +
    		parts
    			.slice(1)
    			.map(/** @param {any} word */ (word) => word[0].toUpperCase() + word.slice(1))
    			.join('')
    	);
    }

    /**
     * @param {string} css
     * @returns {Keyframe}
     */
    function css_to_keyframe(css) {
    	/** @type {Keyframe} */
    	const keyframe = {};
    	const parts = css.split(';');
    	for (const part of parts) {
    		const [property, value] = part.split(':');
    		if (!property || value === undefined) break;

    		const formatted_property = css_property_to_camelcase(property.trim());
    		keyframe[formatted_property] = value.trim();
    	}
    	return keyframe;
    }

    /** @param {number} t */
    const linear$1 = (t) => t;

    /**
     * Called inside keyed `{#each ...}` blocks (as `$.animation(...)`). This creates an animation manager
     * and attaches it to the block, so that moves can be animated following reconciliation.
     * @template P
     * @param {Element} element
     * @param {() => AnimateFn<P | undefined>} get_fn
     * @param {(() => P) | null} get_params
     */
    function animation(element, get_fn, get_params) {
    	var effect = /** @type {Effect} */ (active_effect);
    	var nodes = /** @type {EffectNodes} */ (effect.nodes);

    	/** @type {DOMRect} */
    	var from;

    	/** @type {DOMRect} */
    	var to;

    	/** @type {Animation | undefined} */
    	var animation;

    	/** @type {null | { position: string, width: string, height: string, transform: string }} */
    	var original_styles = null;

    	nodes.a ??= {
    		element,
    		measure() {
    			from = this.element.getBoundingClientRect();
    		},
    		apply() {
    			animation?.abort();

    			to = this.element.getBoundingClientRect();

    			if (
    				from.left !== to.left ||
    				from.right !== to.right ||
    				from.top !== to.top ||
    				from.bottom !== to.bottom
    			) {
    				const options = get_fn()(this.element, { from, to }, get_params?.());

    				animation = animate(this.element, options, undefined, 1, () => {
    					animation?.abort();
    					animation = undefined;
    				});
    			}
    		},
    		fix() {
    			// If an animation is already running, transforming the element is likely to fail,
    			// because the styles applied by the animation take precedence. In the case of crossfade,
    			// that means the `translate(...)` of the crossfade transition overrules the `translate(...)`
    			// we would apply below, leading to the element jumping somewhere to the top left.
    			if (element.getAnimations().length) return;

    			// It's important to destructure these to get fixed values - the object itself has getters,
    			// and changing the style to 'absolute' can for example influence the width.
    			var { position, width, height } = getComputedStyle(element);

    			if (position !== 'absolute' && position !== 'fixed') {
    				var style = /** @type {HTMLElement | SVGElement} */ (element).style;

    				original_styles = {
    					position: style.position,
    					width: style.width,
    					height: style.height,
    					transform: style.transform
    				};

    				style.position = 'absolute';
    				style.width = width;
    				style.height = height;
    				var to = element.getBoundingClientRect();

    				if (from.left !== to.left || from.top !== to.top) {
    					var transform = `translate(${from.left - to.left}px, ${from.top - to.top}px)`;
    					style.transform = style.transform ? `${style.transform} ${transform}` : transform;
    				}
    			}
    		},
    		unfix() {
    			if (original_styles) {
    				var style = /** @type {HTMLElement | SVGElement} */ (element).style;

    				style.position = original_styles.position;
    				style.width = original_styles.width;
    				style.height = original_styles.height;
    				style.transform = original_styles.transform;
    			}
    		}
    	};

    	// in the case of a `<svelte:element>`, it's possible for `$.animation(...)` to be called
    	// when an animation manager already exists, if the tag changes. in that case, we need to
    	// swap out the element rather than creating a new manager, in case it happened at the same
    	// moment as a reconciliation
    	nodes.a.element = element;
    }

    /**
     * Called inside block effects as `$.transition(...)`. This creates a transition manager and
     * attaches it to the current effect — later, inside `pause_effect` and `resume_effect`, we
     * use this to create `intro` and `outro` transitions.
     * @template P
     * @param {number} flags
     * @param {HTMLElement} element
     * @param {() => TransitionFn<P | undefined>} get_fn
     * @param {(() => P) | null} get_params
     * @returns {void}
     */
    function transition(flags, element, get_fn, get_params) {
    	var is_intro = (flags & TRANSITION_IN) !== 0;
    	var is_outro = (flags & TRANSITION_OUT) !== 0;
    	var is_both = is_intro && is_outro;
    	var is_global = (flags & TRANSITION_GLOBAL) !== 0;

    	/** @type {'in' | 'out' | 'both'} */
    	var direction = is_both ? 'both' : is_intro ? 'in' : 'out';

    	/** @type {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig) | undefined} */
    	var current_options;

    	var inert = element.inert;

    	/**
    	 * The default overflow style, stashed so we can revert changes during the transition
    	 * that are necessary to work around a Safari <18 bug
    	 * TODO 6.0 remove this, if older versions of Safari have died out enough
    	 */
    	var overflow = element.style.overflow;

    	/** @type {Animation | undefined} */
    	var intro;

    	/** @type {Animation | undefined} */
    	var outro;

    	function get_options() {
    		return without_reactive_context(() => {
    			// If a transition is still ongoing, we use the existing options rather than generating
    			// new ones. This ensures that reversible transitions reverse smoothly, rather than
    			// jumping to a new spot because (for example) a different `duration` was used
    			return (current_options ??= get_fn()(element, get_params?.() ?? /** @type {P} */ ({}), {
    				direction
    			}));
    		});
    	}

    	/** @type {TransitionManager} */
    	var transition = {
    		is_global,
    		in() {
    			element.inert = inert;

    			if (!is_intro) {
    				outro?.abort();
    				outro?.reset?.();
    				return;
    			}

    			if (!is_outro) {
    				// if we intro then outro then intro again, we want to abort the first intro,
    				// if it's not a bidirectional transition
    				intro?.abort();
    			}

    			dispatch_event(element, 'introstart');

    			intro = animate(element, get_options(), outro, 1, () => {
    				dispatch_event(element, 'introend');

    				// Ensure we cancel the animation to prevent leaking
    				intro?.abort();
    				intro = current_options = undefined;

    				element.style.overflow = overflow;
    			});
    		},
    		out(fn) {
    			if (!is_outro) {
    				fn?.();
    				current_options = undefined;
    				return;
    			}

    			element.inert = true;

    			dispatch_event(element, 'outrostart');

    			outro = animate(element, get_options(), intro, 0, () => {
    				dispatch_event(element, 'outroend');
    				fn?.();
    			});
    		},
    		stop: () => {
    			intro?.abort();
    			outro?.abort();
    		}
    	};

    	var e = /** @type {Effect & { nodes: EffectNodes }} */ (active_effect);

    	(e.nodes.t ??= []).push(transition);

    	// if this is a local transition, we only want to run it if the parent (branch) effect's
    	// parent (block) effect is where the state change happened. we can determine that by
    	// looking at whether the block effect is currently initializing
    	if (is_intro && should_intro) {
    		var run = is_global;

    		if (!run) {
    			var block = /** @type {Effect | null} */ (e.parent);

    			// skip over transparent blocks (e.g. snippets, else-if blocks)
    			while (block && (block.f & EFFECT_TRANSPARENT) !== 0) {
    				while ((block = block.parent)) {
    					if ((block.f & BLOCK_EFFECT) !== 0) break;
    				}
    			}

    			run = !block || (block.f & EFFECT_RAN) !== 0;
    		}

    		if (run) {
    			effect(() => {
    				untrack(() => transition.in());
    			});
    		}
    	}
    }

    /**
     * Animates an element, according to the provided configuration
     * @param {Element} element
     * @param {AnimationConfig | ((opts: { direction: 'in' | 'out' }) => AnimationConfig)} options
     * @param {Animation | undefined} counterpart The corresponding intro/outro to this outro/intro
     * @param {number} t2 The target `t` value — `1` for intro, `0` for outro
     * @param {(() => void)} on_finish Called after successfully completing the animation
     * @returns {Animation}
     */
    function animate(element, options, counterpart, t2, on_finish) {
    	var is_intro = t2 === 1;

    	if (is_function(options)) {
    		// In the case of a deferred transition (such as `crossfade`), `option` will be
    		// a function rather than an `AnimationConfig`. We need to call this function
    		// once the DOM has been updated...
    		/** @type {Animation} */
    		var a;
    		var aborted = false;

    		queue_micro_task(() => {
    			if (aborted) return;
    			var o = options({ direction: is_intro ? 'in' : 'out' });
    			a = animate(element, o, counterpart, t2, on_finish);
    		});

    		// ...but we want to do so without using `async`/`await` everywhere, so
    		// we return a facade that allows everything to remain synchronous
    		return {
    			abort: () => {
    				aborted = true;
    				a?.abort();
    			},
    			deactivate: () => a.deactivate(),
    			reset: () => a.reset(),
    			t: () => a.t()
    		};
    	}

    	counterpart?.deactivate();

    	if (!options?.duration) {
    		on_finish();

    		return {
    			abort: noop,
    			deactivate: noop,
    			reset: noop,
    			t: () => t2
    		};
    	}

    	const { delay = 0, css, tick, easing = linear$1 } = options;

    	var keyframes = [];

    	if (is_intro && counterpart === undefined) {
    		if (tick) {
    			tick(0, 1); // TODO put in nested effect, to avoid interleaved reads/writes?
    		}

    		if (css) {
    			var styles = css_to_keyframe(css(0, 1));
    			keyframes.push(styles, styles);
    		}
    	}

    	var get_t = () => 1 - t2;

    	// create a dummy animation that lasts as long as the delay (but with whatever devtools
    	// multiplier is in effect). in the common case that it is `0`, we keep it anyway so that
    	// the CSS keyframes aren't created until the DOM is updated
    	//
    	// fill forwards to prevent the element from rendering without styles applied
    	// see https://github.com/sveltejs/svelte/issues/14732
    	var animation = element.animate(keyframes, { duration: delay, fill: 'forwards' });

    	animation.onfinish = () => {
    		// remove dummy animation from the stack to prevent conflict with main animation
    		animation.cancel();

    		// for bidirectional transitions, we start from the current position,
    		// rather than doing a full intro/outro
    		var t1 = counterpart?.t() ?? 1 - t2;
    		counterpart?.abort();

    		var delta = t2 - t1;
    		var duration = /** @type {number} */ (options.duration) * Math.abs(delta);
    		var keyframes = [];

    		if (duration > 0) {
    			/**
    			 * Whether or not the CSS includes `overflow: hidden`, in which case we need to
    			 * add it as an inline style to work around a Safari <18 bug
    			 * TODO 6.0 remove this, if possible
    			 */
    			var needs_overflow_hidden = false;

    			if (css) {
    				var n = Math.ceil(duration / (1000 / 60)); // `n` must be an integer, or we risk missing the `t2` value

    				for (var i = 0; i <= n; i += 1) {
    					var t = t1 + delta * easing(i / n);
    					var styles = css_to_keyframe(css(t, 1 - t));
    					keyframes.push(styles);

    					needs_overflow_hidden ||= styles.overflow === 'hidden';
    				}
    			}

    			if (needs_overflow_hidden) {
    				/** @type {HTMLElement} */ (element).style.overflow = 'hidden';
    			}

    			get_t = () => {
    				var time = /** @type {number} */ (
    					/** @type {globalThis.Animation} */ (animation).currentTime
    				);

    				return t1 + delta * easing(time / duration);
    			};

    			if (tick) {
    				loop(() => {
    					if (animation.playState !== 'running') return false;

    					var t = get_t();
    					tick(t, 1 - t);

    					return true;
    				});
    			}
    		}

    		animation = element.animate(keyframes, { duration, fill: 'forwards' });

    		animation.onfinish = () => {
    			get_t = () => t2;
    			tick?.(t2, 1 - t2);
    			on_finish();
    		};
    	};

    	return {
    		abort: () => {
    			if (animation) {
    				animation.cancel();
    				// This prevents memory leaks in Chromium
    				animation.effect = null;
    				// This prevents onfinish to be launched after cancel(),
    				// which can happen in some rare cases
    				// see https://github.com/sveltejs/svelte/issues/13681
    				animation.onfinish = noop;
    			}
    		},
    		deactivate: () => {
    			on_finish = noop;
    		},
    		reset: () => {
    			if (t2 === 0) {
    				tick?.(1, 0);
    			}
    		},
    		t: () => get_t()
    	};
    }

    /**
     * @param {Node} anchor
     * @param {{ hash: string, code: string }} css
     */
    function append_styles$1(anchor, css) {
    	// Use `queue_micro_task` to ensure `anchor` is in the DOM, otherwise getRootNode() will yield wrong results
    	effect(() => {
    		var root = anchor.getRootNode();

    		var target = /** @type {ShadowRoot} */ (root).host
    			? /** @type {ShadowRoot} */ (root)
    			: /** @type {Document} */ (root).head ?? /** @type {Document} */ (root.ownerDocument).head;

    		// Always querying the DOM is roughly the same perf as additionally checking for presence in a map first assuming
    		// that you'll get cache hits half of the time, so we just always query the dom for simplicity and code savings.
    		if (!target.querySelector('#' + css.hash)) {
    			const style = document.createElement('style');
    			style.id = css.hash;
    			style.textContent = css.code;

    			target.appendChild(style);
    		}
    	});
    }

    /** @import { Effect } from '#client' */

    // TODO in 6.0 or 7.0, when we remove legacy mode, we can simplify this by
    // getting rid of the block/branch stuff and just letting the effect rip.
    // see https://github.com/sveltejs/svelte/pull/15962

    /**
     * @param {Element} node
     * @param {() => (node: Element) => void} get_fn
     */
    function attach(node, get_fn) {
    	/** @type {false | undefined | ((node: Element) => void)} */
    	var fn = undefined;

    	/** @type {Effect | null} */
    	var e;

    	managed(() => {
    		if (fn !== (fn = get_fn())) {
    			if (e) {
    				destroy_effect(e);
    				e = null;
    			}

    			if (fn) {
    				e = branch(() => {
    					effect(() => /** @type {(node: Element) => void} */ (fn)(node));
    				});
    			}
    		}
    	});
    }

    function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx$1(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

    /**
     * Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
     * TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
     * @param  {any} value
     */
    function clsx(value) {
    	if (typeof value === 'object') {
    		return clsx$1(value);
    	} else {
    		return value ?? '';
    	}
    }

    const whitespace = [...' \t\n\r\f\u00a0\u000b\ufeff'];

    /**
     * @param {any} value
     * @param {string | null} [hash]
     * @param {Record<string, boolean>} [directives]
     * @returns {string | null}
     */
    function to_class(value, hash, directives) {
    	var classname = value == null ? '' : '' + value;

    	if (hash) {
    		classname = classname ? classname + ' ' + hash : hash;
    	}

    	if (directives) {
    		for (var key in directives) {
    			if (directives[key]) {
    				classname = classname ? classname + ' ' + key : key;
    			} else if (classname.length) {
    				var len = key.length;
    				var a = 0;

    				while ((a = classname.indexOf(key, a)) >= 0) {
    					var b = a + len;

    					if (
    						(a === 0 || whitespace.includes(classname[a - 1])) &&
    						(b === classname.length || whitespace.includes(classname[b]))
    					) {
    						classname = (a === 0 ? '' : classname.substring(0, a)) + classname.substring(b + 1);
    					} else {
    						a = b;
    					}
    				}
    			}
    		}
    	}

    	return classname === '' ? null : classname;
    }

    /**
     *
     * @param {Record<string,any>} styles
     * @param {boolean} important
     */
    function append_styles(styles, important = false) {
    	var separator = important ? ' !important;' : ';';
    	var css = '';

    	for (var key in styles) {
    		var value = styles[key];
    		if (value != null && value !== '') {
    			css += ' ' + key + ': ' + value + separator;
    		}
    	}

    	return css;
    }

    /**
     * @param {string} name
     * @returns {string}
     */
    function to_css_name(name) {
    	if (name[0] !== '-' || name[1] !== '-') {
    		return name.toLowerCase();
    	}
    	return name;
    }

    /**
     * @param {any} value
     * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
     * @returns {string | null}
     */
    function to_style(value, styles) {
    	if (styles) {
    		var new_style = '';

    		/** @type {Record<string,any> | undefined} */
    		var normal_styles;

    		/** @type {Record<string,any> | undefined} */
    		var important_styles;

    		if (Array.isArray(styles)) {
    			normal_styles = styles[0];
    			important_styles = styles[1];
    		} else {
    			normal_styles = styles;
    		}

    		if (value) {
    			value = String(value)
    				.replaceAll(/\s*\/\*.*?\*\/\s*/g, '')
    				.trim();

    			/** @type {boolean | '"' | "'"} */
    			var in_str = false;
    			var in_apo = 0;
    			var in_comment = false;

    			var reserved_names = [];

    			if (normal_styles) {
    				reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
    			}
    			if (important_styles) {
    				reserved_names.push(...Object.keys(important_styles).map(to_css_name));
    			}

    			var start_index = 0;
    			var name_index = -1;

    			const len = value.length;
    			for (var i = 0; i < len; i++) {
    				var c = value[i];

    				if (in_comment) {
    					if (c === '/' && value[i - 1] === '*') {
    						in_comment = false;
    					}
    				} else if (in_str) {
    					if (in_str === c) {
    						in_str = false;
    					}
    				} else if (c === '/' && value[i + 1] === '*') {
    					in_comment = true;
    				} else if (c === '"' || c === "'") {
    					in_str = c;
    				} else if (c === '(') {
    					in_apo++;
    				} else if (c === ')') {
    					in_apo--;
    				}

    				if (!in_comment && in_str === false && in_apo === 0) {
    					if (c === ':' && name_index === -1) {
    						name_index = i;
    					} else if (c === ';' || i === len - 1) {
    						if (name_index !== -1) {
    							var name = to_css_name(value.substring(start_index, name_index).trim());

    							if (!reserved_names.includes(name)) {
    								if (c !== ';') {
    									i++;
    								}

    								var property = value.substring(start_index, i).trim();
    								new_style += ' ' + property + ';';
    							}
    						}

    						start_index = i + 1;
    						name_index = -1;
    					}
    				}
    			}
    		}

    		if (normal_styles) {
    			new_style += append_styles(normal_styles);
    		}

    		if (important_styles) {
    			new_style += append_styles(important_styles, true);
    		}

    		new_style = new_style.trim();
    		return new_style === '' ? null : new_style;
    	}

    	return value == null ? null : String(value);
    }

    /**
     * @param {Element} dom
     * @param {boolean | number} is_html
     * @param {string | null} value
     * @param {string} [hash]
     * @param {Record<string, any>} [prev_classes]
     * @param {Record<string, any>} [next_classes]
     * @returns {Record<string, boolean> | undefined}
     */
    function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    	// @ts-expect-error need to add __className to patched prototype
    	var prev = dom.__className;

    	if (
    		hydrating ||
    		prev !== value ||
    		prev === undefined // for edge case of `class={undefined}`
    	) {
    		var next_class_name = to_class(value, hash, next_classes);

    		if (!hydrating || next_class_name !== dom.getAttribute('class')) {
    			// Removing the attribute when the value is only an empty string causes
    			// performance issues vs simply making the className an empty string. So
    			// we should only remove the class if the value is nullish
    			// and there no hash/directives :
    			if (next_class_name == null) {
    				dom.removeAttribute('class');
    			} else if (is_html) {
    				dom.className = next_class_name;
    			} else {
    				dom.setAttribute('class', next_class_name);
    			}
    		}

    		// @ts-expect-error need to add __className to patched prototype
    		dom.__className = value;
    	} else if (next_classes && prev_classes !== next_classes) {
    		for (var key in next_classes) {
    			var is_present = !!next_classes[key];

    			if (prev_classes == null || is_present !== !!prev_classes[key]) {
    				dom.classList.toggle(key, is_present);
    			}
    		}
    	}

    	return next_classes;
    }

    /**
     * @param {Element & ElementCSSInlineStyle} dom
     * @param {Record<string, any>} prev
     * @param {Record<string, any>} next
     * @param {string} [priority]
     */
    function update_styles(dom, prev = {}, next, priority) {
    	for (var key in next) {
    		var value = next[key];

    		if (prev[key] !== value) {
    			if (next[key] == null) {
    				dom.style.removeProperty(key);
    			} else {
    				dom.style.setProperty(key, value, priority);
    			}
    		}
    	}
    }

    /**
     * @param {Element & ElementCSSInlineStyle} dom
     * @param {string | null} value
     * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
     * @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
     */
    function set_style(dom, value, prev_styles, next_styles) {
    	// @ts-expect-error
    	var prev = dom.__style;

    	if (hydrating || prev !== value) {
    		var next_style_attr = to_style(value, next_styles);

    		if (!hydrating || next_style_attr !== dom.getAttribute('style')) {
    			if (next_style_attr == null) {
    				dom.removeAttribute('style');
    			} else {
    				dom.style.cssText = next_style_attr;
    			}
    		}

    		// @ts-expect-error
    		dom.__style = value;
    	} else if (next_styles) {
    		if (Array.isArray(next_styles)) {
    			update_styles(dom, prev_styles?.[0], next_styles[0]);
    			update_styles(dom, prev_styles?.[1], next_styles[1], 'important');
    		} else {
    			update_styles(dom, prev_styles, next_styles);
    		}
    	}

    	return next_styles;
    }

    /**
     * Selects the correct option(s) (depending on whether this is a multiple select)
     * @template V
     * @param {HTMLSelectElement} select
     * @param {V} value
     * @param {boolean} mounting
     */
    function select_option(select, value, mounting = false) {
    	if (select.multiple) {
    		// If value is null or undefined, keep the selection as is
    		if (value == undefined) {
    			return;
    		}

    		// If not an array, warn and keep the selection as is
    		if (!is_array(value)) {
    			return select_multiple_invalid_value();
    		}

    		// Otherwise, update the selection
    		for (var option of select.options) {
    			option.selected = value.includes(get_option_value(option));
    		}

    		return;
    	}

    	for (option of select.options) {
    		var option_value = get_option_value(option);
    		if (is(option_value, value)) {
    			option.selected = true;
    			return;
    		}
    	}

    	if (!mounting || value !== undefined) {
    		select.selectedIndex = -1; // no option should be selected
    	}
    }

    /**
     * Selects the correct option(s) if `value` is given,
     * and then sets up a mutation observer to sync the
     * current selection to the dom when it changes. Such
     * changes could for example occur when options are
     * inside an `#each` block.
     * @param {HTMLSelectElement} select
     */
    function init_select(select) {
    	var observer = new MutationObserver(() => {
    		// @ts-ignore
    		select_option(select, select.__value);
    		// Deliberately don't update the potential binding value,
    		// the model should be preserved unless explicitly changed
    	});

    	observer.observe(select, {
    		// Listen to option element changes
    		childList: true,
    		subtree: true, // because of <optgroup>
    		// Listen to option element value attribute changes
    		// (doesn't get notified of select value changes,
    		// because that property is not reflected as an attribute)
    		attributes: true,
    		attributeFilter: ['value']
    	});

    	teardown(() => {
    		observer.disconnect();
    	});
    }

    /** @param {HTMLOptionElement} option */
    function get_option_value(option) {
    	// __value only exists if the <option> has a value attribute
    	if ('__value' in option) {
    		return option.__value;
    	} else {
    		return option.value;
    	}
    }

    /** @import { Effect } from '#client' */

    const CLASS = Symbol('class');
    const STYLE = Symbol('style');

    const IS_CUSTOM_ELEMENT = Symbol('is custom element');
    const IS_HTML = Symbol('is html');

    /**
     * The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
     * to remove it upon hydration to avoid a bug when someone resets the form value.
     * @param {HTMLInputElement} input
     * @returns {void}
     */
    function remove_input_defaults(input) {
    	if (!hydrating) return;

    	var already_removed = false;

    	// We try and remove the default attributes later, rather than sync during hydration.
    	// Doing it sync during hydration has a negative impact on performance, but deferring the
    	// work in an idle task alleviates this greatly. If a form reset event comes in before
    	// the idle callback, then we ensure the input defaults are cleared just before.
    	var remove_defaults = () => {
    		if (already_removed) return;
    		already_removed = true;

    		// Remove the attributes but preserve the values
    		if (input.hasAttribute('value')) {
    			var value = input.value;
    			set_attribute(input, 'value', null);
    			input.value = value;
    		}

    		if (input.hasAttribute('checked')) {
    			var checked = input.checked;
    			set_attribute(input, 'checked', null);
    			input.checked = checked;
    		}
    	};

    	// @ts-expect-error
    	input.__on_r = remove_defaults;
    	queue_micro_task(remove_defaults);
    	add_form_reset_listener();
    }

    /**
     * @param {Element} element
     * @param {any} value
     */
    function set_value(element, value) {
    	var attributes = get_attributes(element);

    	if (
    		attributes.value ===
    			(attributes.value =
    				// treat null and undefined the same for the initial value
    				value ?? undefined) ||
    		// @ts-expect-error
    		// `progress` elements always need their value set when it's `0`
    		(element.value === value && (value !== 0 || element.nodeName !== 'PROGRESS'))
    	) {
    		return;
    	}

    	// @ts-expect-error
    	element.value = value ?? '';
    }

    /**
     * @param {Element} element
     * @param {boolean} checked
     */
    function set_checked(element, checked) {
    	var attributes = get_attributes(element);

    	if (
    		attributes.checked ===
    		(attributes.checked =
    			// treat null and undefined the same for the initial value
    			checked ?? undefined)
    	) {
    		return;
    	}

    	// @ts-expect-error
    	element.checked = checked;
    }

    /**
     * Sets the `selected` attribute on an `option` element.
     * Not set through the property because that doesn't reflect to the DOM,
     * which means it wouldn't be taken into account when a form is reset.
     * @param {HTMLOptionElement} element
     * @param {boolean} selected
     */
    function set_selected(element, selected) {
    	if (selected) {
    		// The selected option could've changed via user selection, and
    		// setting the value without this check would set it back.
    		if (!element.hasAttribute('selected')) {
    			element.setAttribute('selected', '');
    		}
    	} else {
    		element.removeAttribute('selected');
    	}
    }

    /**
     * @param {Element} element
     * @param {string} attribute
     * @param {string | null} value
     * @param {boolean} [skip_warning]
     */
    function set_attribute(element, attribute, value, skip_warning) {
    	var attributes = get_attributes(element);

    	if (hydrating) {
    		attributes[attribute] = element.getAttribute(attribute);

    		if (
    			attribute === 'src' ||
    			attribute === 'srcset' ||
    			(attribute === 'href' && element.nodeName === 'LINK')
    		) {

    			// If we reset these attributes, they would result in another network request, which we want to avoid.
    			// We assume they are the same between client and server as checking if they are equal is expensive
    			// (we can't just compare the strings as they can be different between client and server but result in the
    			// same url, so we would need to create hidden anchor elements to compare them)
    			return;
    		}
    	}

    	if (attributes[attribute] === (attributes[attribute] = value)) return;

    	if (attribute === 'loading') {
    		// @ts-expect-error
    		element[LOADING_ATTR_SYMBOL] = value;
    	}

    	if (value == null) {
    		element.removeAttribute(attribute);
    	} else if (typeof value !== 'string' && get_setters(element).includes(attribute)) {
    		// @ts-ignore
    		element[attribute] = value;
    	} else {
    		element.setAttribute(attribute, value);
    	}
    }

    /**
     * Spreads attributes onto a DOM element, taking into account the currently set attributes
     * @param {Element & ElementCSSInlineStyle} element
     * @param {Record<string | symbol, any> | undefined} prev
     * @param {Record<string | symbol, any>} next New attributes - this function mutates this object
     * @param {string} [css_hash]
     * @param {boolean} [should_remove_defaults]
     * @param {boolean} [skip_warning]
     * @returns {Record<string, any>}
     */
    function set_attributes(
    	element,
    	prev,
    	next,
    	css_hash,
    	should_remove_defaults = false,
    	skip_warning = false
    ) {
    	if (hydrating && should_remove_defaults && element.tagName === 'INPUT') {
    		var input = /** @type {HTMLInputElement} */ (element);
    		var attribute = input.type === 'checkbox' ? 'defaultChecked' : 'defaultValue';

    		if (!(attribute in next)) {
    			remove_input_defaults(input);
    		}
    	}

    	var attributes = get_attributes(element);

    	var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
    	var preserve_attribute_case = !attributes[IS_HTML];

    	// If we're hydrating but the custom element is from Svelte, and it already scaffolded,
    	// then it might run block logic in hydration mode, which we have to prevent.
    	let is_hydrating_custom_element = hydrating && is_custom_element;
    	if (is_hydrating_custom_element) {
    		set_hydrating(false);
    	}

    	var current = prev || {};
    	var is_option_element = element.tagName === 'OPTION';

    	for (var key in prev) {
    		if (!(key in next)) {
    			next[key] = null;
    		}
    	}

    	if (next.class) {
    		next.class = clsx(next.class);
    	} else if (next[CLASS]) {
    		next.class = null; /* force call to set_class() */
    	}

    	if (next[STYLE]) {
    		next.style ??= null; /* force call to set_style() */
    	}

    	var setters = get_setters(element);

    	// since key is captured we use const
    	for (const key in next) {
    		// let instead of var because referenced in a closure
    		let value = next[key];

    		// Up here because we want to do this for the initial value, too, even if it's undefined,
    		// and this wouldn't be reached in case of undefined because of the equality check below
    		if (is_option_element && key === 'value' && value == null) {
    			// The <option> element is a special case because removing the value attribute means
    			// the value is set to the text content of the option element, and setting the value
    			// to null or undefined means the value is set to the string "null" or "undefined".
    			// To align with how we handle this case in non-spread-scenarios, this logic is needed.
    			// There's a super-edge-case bug here that is left in in favor of smaller code size:
    			// Because of the "set missing props to null" logic above, we can't differentiate
    			// between a missing value and an explicitly set value of null or undefined. That means
    			// that once set, the value attribute of an <option> element can't be removed. This is
    			// a very rare edge case, and removing the attribute altogether isn't possible either
    			// for the <option value={undefined}> case, so we're not losing any functionality here.
    			// @ts-ignore
    			element.value = element.__value = '';
    			current[key] = value;
    			continue;
    		}

    		if (key === 'class') {
    			var is_html = element.namespaceURI === 'http://www.w3.org/1999/xhtml';
    			set_class(element, is_html, value, css_hash, prev?.[CLASS], next[CLASS]);
    			current[key] = value;
    			current[CLASS] = next[CLASS];
    			continue;
    		}

    		if (key === 'style') {
    			set_style(element, value, prev?.[STYLE], next[STYLE]);
    			current[key] = value;
    			current[STYLE] = next[STYLE];
    			continue;
    		}

    		var prev_value = current[key];

    		// Skip if value is unchanged, unless it's `undefined` and the element still has the attribute
    		if (value === prev_value && !(value === undefined && element.hasAttribute(key))) {
    			continue;
    		}

    		current[key] = value;

    		var prefix = key[0] + key[1]; // this is faster than key.slice(0, 2)
    		if (prefix === '$$') continue;

    		if (prefix === 'on') {
    			/** @type {{ capture?: true }} */
    			const opts = {};
    			const event_handle_key = '$$' + key;
    			let event_name = key.slice(2);
    			var delegated = can_delegate_event(event_name);

    			if (is_capture_event(event_name)) {
    				event_name = event_name.slice(0, -7);
    				opts.capture = true;
    			}

    			if (!delegated && prev_value) {
    				// Listening to same event but different handler -> our handle function below takes care of this
    				// If we were to remove and add listeners in this case, it could happen that the event is "swallowed"
    				// (the browser seems to not know yet that a new one exists now) and doesn't reach the handler
    				// https://github.com/sveltejs/svelte/issues/11903
    				if (value != null) continue;

    				element.removeEventListener(event_name, current[event_handle_key], opts);
    				current[event_handle_key] = null;
    			}

    			if (value != null) {
    				if (!delegated) {
    					/**
    					 * @this {any}
    					 * @param {Event} evt
    					 */
    					function handle(evt) {
    						current[key].call(this, evt);
    					}

    					current[event_handle_key] = create_event(event_name, element, handle, opts);
    				} else {
    					// @ts-ignore
    					element[`__${event_name}`] = value;
    					delegate([event_name]);
    				}
    			} else if (delegated) {
    				// @ts-ignore
    				element[`__${event_name}`] = undefined;
    			}
    		} else if (key === 'style') {
    			// avoid using the setter
    			set_attribute(element, key, value);
    		} else if (key === 'autofocus') {
    			autofocus(/** @type {HTMLElement} */ (element), Boolean(value));
    		} else if (!is_custom_element && (key === '__value' || (key === 'value' && value != null))) {
    			// @ts-ignore We're not running this for custom elements because __value is actually
    			// how Lit stores the current value on the element, and messing with that would break things.
    			element.value = element.__value = value;
    		} else if (key === 'selected' && is_option_element) {
    			set_selected(/** @type {HTMLOptionElement} */ (element), value);
    		} else {
    			var name = key;
    			if (!preserve_attribute_case) {
    				name = normalize_attribute(name);
    			}

    			var is_default = name === 'defaultValue' || name === 'defaultChecked';

    			if (value == null && !is_custom_element && !is_default) {
    				attributes[key] = null;

    				if (name === 'value' || name === 'checked') {
    					// removing value/checked also removes defaultValue/defaultChecked — preserve
    					let input = /** @type {HTMLInputElement} */ (element);
    					const use_default = prev === undefined;
    					if (name === 'value') {
    						let previous = input.defaultValue;
    						input.removeAttribute(name);
    						input.defaultValue = previous;
    						// @ts-ignore
    						input.value = input.__value = use_default ? previous : null;
    					} else {
    						let previous = input.defaultChecked;
    						input.removeAttribute(name);
    						input.defaultChecked = previous;
    						input.checked = use_default ? previous : false;
    					}
    				} else {
    					element.removeAttribute(key);
    				}
    			} else if (
    				is_default ||
    				(setters.includes(name) && (is_custom_element || typeof value !== 'string'))
    			) {
    				// @ts-ignore
    				element[name] = value;
    				// remove it from attributes's cache
    				if (name in attributes) attributes[name] = UNINITIALIZED;
    			} else if (typeof value !== 'function') {
    				set_attribute(element, name, value);
    			}
    		}
    	}

    	if (is_hydrating_custom_element) {
    		set_hydrating(true);
    	}

    	return current;
    }

    /**
     * @param {Element & ElementCSSInlineStyle} element
     * @param {(...expressions: any) => Record<string | symbol, any>} fn
     * @param {Array<() => any>} sync
     * @param {Array<() => Promise<any>>} async
     * @param {Array<Promise<void>>} blockers
     * @param {string} [css_hash]
     * @param {boolean} [should_remove_defaults]
     * @param {boolean} [skip_warning]
     */
    function attribute_effect(
    	element,
    	fn,
    	sync = [],
    	async = [],
    	blockers = [],
    	css_hash,
    	should_remove_defaults = false,
    	skip_warning = false
    ) {
    	flatten(blockers, sync, async, (values) => {
    		/** @type {Record<string | symbol, any> | undefined} */
    		var prev = undefined;

    		/** @type {Record<symbol, Effect>} */
    		var effects = {};

    		var is_select = element.nodeName === 'SELECT';
    		var inited = false;

    		managed(() => {
    			var next = fn(...values.map(get));
    			/** @type {Record<string | symbol, any>} */
    			var current = set_attributes(
    				element,
    				prev,
    				next,
    				css_hash,
    				should_remove_defaults,
    				skip_warning
    			);

    			if (inited && is_select && 'value' in next) {
    				select_option(/** @type {HTMLSelectElement} */ (element), next.value);
    			}

    			for (let symbol of Object.getOwnPropertySymbols(effects)) {
    				if (!next[symbol]) destroy_effect(effects[symbol]);
    			}

    			for (let symbol of Object.getOwnPropertySymbols(next)) {
    				var n = next[symbol];

    				if (symbol.description === ATTACHMENT_KEY && (!prev || n !== prev[symbol])) {
    					if (effects[symbol]) destroy_effect(effects[symbol]);
    					effects[symbol] = branch(() => attach(element, () => n));
    				}

    				current[symbol] = n;
    			}

    			prev = current;
    		});

    		if (is_select) {
    			var select = /** @type {HTMLSelectElement} */ (element);

    			effect(() => {
    				select_option(select, /** @type {Record<string | symbol, any>} */ (prev).value, true);
    				init_select(select);
    			});
    		}

    		inited = true;
    	});
    }

    /**
     *
     * @param {Element} element
     */
    function get_attributes(element) {
    	return /** @type {Record<string | symbol, unknown>} **/ (
    		// @ts-expect-error
    		element.__attributes ??= {
    			[IS_CUSTOM_ELEMENT]: element.nodeName.includes('-'),
    			[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
    		}
    	);
    }

    /** @type {Map<string, string[]>} */
    var setters_cache = new Map();

    /** @param {Element} element */
    function get_setters(element) {
    	var cache_key = element.getAttribute('is') || element.nodeName;
    	var setters = setters_cache.get(cache_key);
    	if (setters) return setters;
    	setters_cache.set(cache_key, (setters = []));

    	var descriptors;
    	var proto = element; // In the case of custom elements there might be setters on the instance
    	var element_proto = Element.prototype;

    	// Stop at Element, from there on there's only unnecessary setters we're not interested in
    	// Do not use contructor.name here as that's unreliable in some browser environments
    	while (element_proto !== proto) {
    		descriptors = get_descriptors(proto);

    		for (var key in descriptors) {
    			if (descriptors[key].set) {
    				setters.push(key);
    			}
    		}

    		proto = get_prototype_of(proto);
    	}

    	return setters;
    }

    /**
     * Resize observer singleton.
     * One listener per element only!
     * https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ
     */
    class ResizeObserverSingleton {
    	/** */
    	#listeners = new WeakMap();

    	/** @type {ResizeObserver | undefined} */
    	#observer;

    	/** @type {ResizeObserverOptions} */
    	#options;

    	/** @static */
    	static entries = new WeakMap();

    	/** @param {ResizeObserverOptions} options */
    	constructor(options) {
    		this.#options = options;
    	}

    	/**
    	 * @param {Element} element
    	 * @param {(entry: ResizeObserverEntry) => any} listener
    	 */
    	observe(element, listener) {
    		var listeners = this.#listeners.get(element) || new Set();
    		listeners.add(listener);

    		this.#listeners.set(element, listeners);
    		this.#getObserver().observe(element, this.#options);

    		return () => {
    			var listeners = this.#listeners.get(element);
    			listeners.delete(listener);

    			if (listeners.size === 0) {
    				this.#listeners.delete(element);
    				/** @type {ResizeObserver} */ (this.#observer).unobserve(element);
    			}
    		};
    	}

    	#getObserver() {
    		return (
    			this.#observer ??
    			(this.#observer = new ResizeObserver(
    				/** @param {any} entries */ (entries) => {
    					for (var entry of entries) {
    						ResizeObserverSingleton.entries.set(entry.target, entry);
    						for (var listener of this.#listeners.get(entry.target) || []) {
    							listener(entry);
    						}
    					}
    				}
    			))
    		);
    	}
    }

    var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton({
    	box: 'border-box'
    });

    /**
     * @param {HTMLElement} element
     * @param {'clientWidth' | 'clientHeight' | 'offsetWidth' | 'offsetHeight'} type
     * @param {(size: number) => void} set
     */
    function bind_element_size(element, type, set) {
    	var unsub = resize_observer_border_box.observe(element, () => set(element[type]));

    	effect(() => {
    		// The update could contain reads which should be ignored
    		untrack(() => set(element[type]));
    		return unsub;
    	});
    }

    /**
     * @param {any} bound_value
     * @param {Element} element_or_component
     * @returns {boolean}
     */
    function is_bound_this(bound_value, element_or_component) {
    	return (
    		bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component
    	);
    }

    /**
     * @param {any} element_or_component
     * @param {(value: unknown, ...parts: unknown[]) => void} update
     * @param {(...parts: unknown[]) => unknown} get_value
     * @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
     * 										returns all the parts of the each block context that are used in the expression
     * @returns {void}
     */
    function bind_this(element_or_component = {}, update, get_value, get_parts) {
    	effect(() => {
    		/** @type {unknown[]} */
    		var old_parts;

    		/** @type {unknown[]} */
    		var parts;

    		render_effect(() => {
    			old_parts = parts;
    			// We only track changes to the parts, not the value itself to avoid unnecessary reruns.
    			parts = [];

    			untrack(() => {
    				if (element_or_component !== get_value(...parts)) {
    					update(element_or_component, ...parts);
    					// If this is an effect rerun (cause: each block context changes), then nullify the binding at
    					// the previous position if it isn't already taken over by a different effect.
    					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
    						update(null, ...old_parts);
    					}
    				}
    			});
    		});

    		return () => {
    			// We cannot use effects in the teardown phase, we we use a microtask instead.
    			queue_micro_task(() => {
    				if (parts && is_bound_this(get_value(...parts), element_or_component)) {
    					update(null, ...parts);
    				}
    			});
    		};
    	});

    	return element_or_component;
    }

    /** @import { ComponentContextLegacy } from '#client' */

    /**
     * Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
     * @param {boolean} [immutable]
     */
    function init(immutable = false) {
    	const context = /** @type {ComponentContextLegacy} */ (component_context);

    	const callbacks = context.l.u;
    	if (!callbacks) return;

    	let props = () => deep_read_state(context.s);

    	if (immutable) {
    		let version = 0;
    		let prev = /** @type {Record<string, any>} */ ({});

    		// In legacy immutable mode, before/afterUpdate only fire if the object identity of a prop changes
    		const d = derived(() => {
    			let changed = false;
    			const props = context.s;
    			for (const key in props) {
    				if (props[key] !== prev[key]) {
    					prev[key] = props[key];
    					changed = true;
    				}
    			}
    			if (changed) version++;
    			return version;
    		});

    		props = () => get(d);
    	}

    	// beforeUpdate
    	if (callbacks.b.length) {
    		user_pre_effect(() => {
    			observe_all(context, props);
    			run_all(callbacks.b);
    		});
    	}

    	// onMount (must run before afterUpdate)
    	user_effect(() => {
    		const fns = untrack(() => callbacks.m.map(run));
    		return () => {
    			for (const fn of fns) {
    				if (typeof fn === 'function') {
    					fn();
    				}
    			}
    		};
    	});

    	// afterUpdate
    	if (callbacks.a.length) {
    		user_effect(() => {
    			observe_all(context, props);
    			run_all(callbacks.a);
    		});
    	}
    }

    /**
     * Invoke the getter of all signals associated with a component
     * so they can be registered to the effect this function is called in.
     * @param {ComponentContextLegacy} context
     * @param {(() => void)} props
     */
    function observe_all(context, props) {
    	if (context.l.s) {
    		for (const signal of context.l.s) get(signal);
    	}

    	props();
    }

    /** @import { StoreReferencesContainer } from '#client' */
    /** @import { Store } from '#shared' */

    /**
     * Whether or not the prop currently being read is a store binding, as in
     * `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
     * runes mode, and skip `binding_property_non_reactive` validation
     */
    let is_store_binding = false;

    /**
     * Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
     * Used to prevent `binding_property_non_reactive` validation false positives and
     * ensure that these props are treated as mutable even in runes mode
     * @template T
     * @param {() => T} fn
     * @returns {[T, boolean]}
     */
    function capture_store_binding(fn) {
    	var previous_is_store_binding = is_store_binding;

    	try {
    		is_store_binding = false;
    		return [fn(), is_store_binding];
    	} finally {
    		is_store_binding = previous_is_store_binding;
    	}
    }

    /** @import { Effect, Source } from './types.js' */

    /**
     * The proxy handler for rest props (i.e. `const { x, ...rest } = $props()`).
     * Is passed the full `$$props` object and excludes the named props.
     * @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Array<string | symbol>, name?: string }>}}
     */
    const rest_props_handler = {
    	get(target, key) {
    		if (target.exclude.includes(key)) return;
    		return target.props[key];
    	},
    	set(target, key) {

    		return false;
    	},
    	getOwnPropertyDescriptor(target, key) {
    		if (target.exclude.includes(key)) return;
    		if (key in target.props) {
    			return {
    				enumerable: true,
    				configurable: true,
    				value: target.props[key]
    			};
    		}
    	},
    	has(target, key) {
    		if (target.exclude.includes(key)) return false;
    		return key in target.props;
    	},
    	ownKeys(target) {
    		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
    	}
    };

    /**
     * @param {Record<string, unknown>} props
     * @param {string[]} exclude
     * @param {string} [name]
     * @returns {Record<string, unknown>}
     */
    /*#__NO_SIDE_EFFECTS__*/
    function rest_props(props, exclude, name) {
    	return new Proxy(
    		{ props, exclude },
    		rest_props_handler
    	);
    }

    /**
     * This function is responsible for synchronizing a possibly bound prop with the inner component state.
     * It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
     * @template V
     * @param {Record<string, unknown>} props
     * @param {string} key
     * @param {number} flags
     * @param {V | (() => V)} [fallback]
     * @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
     */
    function prop(props, key, flags, fallback) {
    	var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
    	var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
    	var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;

    	var fallback_value = /** @type {V} */ (fallback);
    	var fallback_dirty = true;

    	var get_fallback = () => {
    		if (fallback_dirty) {
    			fallback_dirty = false;

    			fallback_value = lazy
    				? untrack(/** @type {() => V} */ (fallback))
    				: /** @type {V} */ (fallback);
    		}

    		return fallback_value;
    	};

    	/** @type {((v: V) => void) | undefined} */
    	var setter;

    	if (bindable) {
    		// Can be the case when someone does `mount(Component, props)` with `let props = $state({...})`
    		// or `createClassComponent(Component, props)`
    		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;

    		setter =
    			get_descriptor(props, key)?.set ??
    			(is_entry_props && key in props ? (v) => (props[key] = v) : undefined);
    	}

    	var initial_value;
    	var is_store_sub = false;

    	if (bindable) {
    		[initial_value, is_store_sub] = capture_store_binding(() => /** @type {V} */ (props[key]));
    	} else {
    		initial_value = /** @type {V} */ (props[key]);
    	}

    	if (initial_value === undefined && fallback !== undefined) {
    		initial_value = get_fallback();

    		if (setter) {
    			if (runes) props_invalid_value();
    			setter(initial_value);
    		}
    	}

    	/** @type {() => V} */
    	var getter;

    	if (runes) {
    		getter = () => {
    			var value = /** @type {V} */ (props[key]);
    			if (value === undefined) return get_fallback();
    			fallback_dirty = true;
    			return value;
    		};
    	} else {
    		getter = () => {
    			var value = /** @type {V} */ (props[key]);

    			if (value !== undefined) {
    				// in legacy mode, we don't revert to the fallback value
    				// if the prop goes from defined to undefined. The easiest
    				// way to model this is to make the fallback undefined
    				// as soon as the prop has a value
    				fallback_value = /** @type {V} */ (undefined);
    			}

    			return value === undefined ? fallback_value : value;
    		};
    	}

    	// prop is never written to — we only need a getter
    	if (runes && (flags & PROPS_IS_UPDATED) === 0) {
    		return getter;
    	}

    	// prop is written to, but the parent component had `bind:foo` which
    	// means we can just call `$$props.foo = value` directly
    	if (setter) {
    		var legacy_parent = props.$$legacy;
    		return /** @type {() => V} */ (
    			function (/** @type {V} */ value, /** @type {boolean} */ mutation) {
    				if (arguments.length > 0) {
    					// We don't want to notify if the value was mutated and the parent is in runes mode.
    					// In that case the state proxy (if it exists) should take care of the notification.
    					// If the parent is not in runes mode, we need to notify on mutation, too, that the prop
    					// has changed because the parent will not be able to detect the change otherwise.
    					if (!runes || !mutation || legacy_parent || is_store_sub) {
    						/** @type {Function} */ (setter)(mutation ? getter() : value);
    					}

    					return value;
    				}

    				return getter();
    			}
    		);
    	}

    	// Either prop is written to, but there's no binding, which means we
    	// create a derived that we can write to locally.
    	// Or we are in legacy mode where we always create a derived to replicate that
    	// Svelte 4 did not trigger updates when a primitive value was updated to the same value.
    	var overridden = false;

    	var d = ((flags & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
    		overridden = false;
    		return getter();
    	});

    	// Capture the initial value if it's bindable
    	if (bindable) get(d);

    	var parent_effect = /** @type {Effect} */ (active_effect);

    	return /** @type {() => V} */ (
    		function (/** @type {any} */ value, /** @type {boolean} */ mutation) {
    			if (arguments.length > 0) {
    				const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;

    				set(d, new_value);
    				overridden = true;

    				if (fallback_value !== undefined) {
    					fallback_value = new_value;
    				}

    				return value;
    			}

    			// special case — avoid recalculating the derived if we're in a
    			// teardown function and the prop was overridden locally, or the
    			// component was already destroyed (this latter part is necessary
    			// because `bind:this` can read props after the component has
    			// been destroyed. TODO simplify `bind:this`
    			if ((is_destroying_effect && overridden) || (parent_effect.f & DESTROYED) !== 0) {
    				return d.v;
    			}

    			return get(d);
    		}
    	);
    }

    /** @import { ComponentConstructorOptions, ComponentType, SvelteComponent, Component } from 'svelte' */

    /**
     * Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.
     *
     * @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
     *
     * @template {Record<string, any>} Props
     * @template {Record<string, any>} Exports
     * @template {Record<string, any>} Events
     * @template {Record<string, any>} Slots
     *
     * @param {ComponentConstructorOptions<Props> & {
     * 	component: ComponentType<SvelteComponent<Props, Events, Slots>> | Component<Props>;
     * }} options
     * @returns {SvelteComponent<Props, Events, Slots> & Exports}
     */
    function createClassComponent(options) {
    	// @ts-expect-error $$prop_def etc are not actually defined
    	return new Svelte4Component(options);
    }

    /**
     * Support using the component as both a class and function during the transition period
     * @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
     */

    class Svelte4Component {
    	/** @type {any} */
    	#events;

    	/** @type {Record<string, any>} */
    	#instance;

    	/**
    	 * @param {ComponentConstructorOptions & {
    	 *  component: any;
    	 * }} options
    	 */
    	constructor(options) {
    		var sources = new Map();

    		/**
    		 * @param {string | symbol} key
    		 * @param {unknown} value
    		 */
    		var add_source = (key, value) => {
    			var s = mutable_source(value, false, false);
    			sources.set(key, s);
    			return s;
    		};

    		// Replicate coarse-grained props through a proxy that has a version source for
    		// each property, which is incremented on updates to the property itself. Do not
    		// use our $state proxy because that one has fine-grained reactivity.
    		const props = new Proxy(
    			{ ...(options.props || {}), $$events: {} },
    			{
    				get(target, prop) {
    					return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
    				},
    				has(target, prop) {
    					// Necessary to not throw "invalid binding" validation errors on the component side
    					if (prop === LEGACY_PROPS) return true;

    					get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
    					return Reflect.has(target, prop);
    				},
    				set(target, prop, value) {
    					set(sources.get(prop) ?? add_source(prop, value), value);
    					return Reflect.set(target, prop, value);
    				}
    			}
    		);

    		this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
    			target: options.target,
    			anchor: options.anchor,
    			props,
    			context: options.context,
    			intro: options.intro ?? false,
    			recover: options.recover
    		});

    		// We don't flushSync for custom element wrappers or if the user doesn't want it,
    		// or if we're in async mode since `flushSync()` will fail
    		if ((!options?.props?.$$host || options.sync === false)) {
    			flushSync();
    		}

    		this.#events = props.$$events;

    		for (const key of Object.keys(this.#instance)) {
    			if (key === '$set' || key === '$destroy' || key === '$on') continue;
    			define_property(this, key, {
    				get() {
    					return this.#instance[key];
    				},
    				/** @param {any} value */
    				set(value) {
    					this.#instance[key] = value;
    				},
    				enumerable: true
    			});
    		}

    		this.#instance.$set = /** @param {Record<string, any>} next */ (next) => {
    			Object.assign(props, next);
    		};

    		this.#instance.$destroy = () => {
    			unmount(this.#instance);
    		};
    	}

    	/** @param {Record<string, any>} props */
    	$set(props) {
    		this.#instance.$set(props);
    	}

    	/**
    	 * @param {string} event
    	 * @param {(...args: any[]) => any} callback
    	 * @returns {any}
    	 */
    	$on(event, callback) {
    		this.#events[event] = this.#events[event] || [];

    		/** @param {any[]} args */
    		const cb = (...args) => callback.call(this, ...args);
    		this.#events[event].push(cb);
    		return () => {
    			this.#events[event] = this.#events[event].filter(/** @param {any} fn */ (fn) => fn !== cb);
    		};
    	}

    	$destroy() {
    		this.#instance.$destroy();
    	}
    }

    /**
     * @typedef {Object} CustomElementPropDefinition
     * @property {string} [attribute]
     * @property {boolean} [reflect]
     * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
     */

    /** @type {any} */
    let SvelteElement;

    if (typeof HTMLElement === 'function') {
    	SvelteElement = class extends HTMLElement {
    		/** The Svelte component constructor */
    		$$ctor;
    		/** Slots */
    		$$s;
    		/** @type {any} The Svelte component instance */
    		$$c;
    		/** Whether or not the custom element is connected */
    		$$cn = false;
    		/** @type {Record<string, any>} Component props data */
    		$$d = {};
    		/** `true` if currently in the process of reflecting component props back to attributes */
    		$$r = false;
    		/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    		$$p_d = {};
    		/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    		$$l = {};
    		/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    		$$l_u = new Map();
    		/** @type {any} The managed render effect for reflecting attributes */
    		$$me;

    		/**
    		 * @param {*} $$componentCtor
    		 * @param {*} $$slots
    		 * @param {*} use_shadow_dom
    		 */
    		constructor($$componentCtor, $$slots, use_shadow_dom) {
    			super();
    			this.$$ctor = $$componentCtor;
    			this.$$s = $$slots;
    			if (use_shadow_dom) {
    				this.attachShadow({ mode: 'open' });
    			}
    		}

    		/**
    		 * @param {string} type
    		 * @param {EventListenerOrEventListenerObject} listener
    		 * @param {boolean | AddEventListenerOptions} [options]
    		 */
    		addEventListener(type, listener, options) {
    			// We can't determine upfront if the event is a custom event or not, so we have to
    			// listen to both. If someone uses a custom event with the same name as a regular
    			// browser event, this fires twice - we can't avoid that.
    			this.$$l[type] = this.$$l[type] || [];
    			this.$$l[type].push(listener);
    			if (this.$$c) {
    				const unsub = this.$$c.$on(type, listener);
    				this.$$l_u.set(listener, unsub);
    			}
    			super.addEventListener(type, listener, options);
    		}

    		/**
    		 * @param {string} type
    		 * @param {EventListenerOrEventListenerObject} listener
    		 * @param {boolean | AddEventListenerOptions} [options]
    		 */
    		removeEventListener(type, listener, options) {
    			super.removeEventListener(type, listener, options);
    			if (this.$$c) {
    				const unsub = this.$$l_u.get(listener);
    				if (unsub) {
    					unsub();
    					this.$$l_u.delete(listener);
    				}
    			}
    		}

    		async connectedCallback() {
    			this.$$cn = true;
    			if (!this.$$c) {
    				// We wait one tick to let possible child slot elements be created/mounted
    				await Promise.resolve();
    				if (!this.$$cn || this.$$c) {
    					return;
    				}
    				/** @param {string} name */
    				function create_slot(name) {
    					/**
    					 * @param {Element} anchor
    					 */
    					return (anchor) => {
    						const slot = document.createElement('slot');
    						if (name !== 'default') slot.name = name;

    						append(anchor, slot);
    					};
    				}
    				/** @type {Record<string, any>} */
    				const $$slots = {};
    				const existing_slots = get_custom_elements_slots(this);
    				for (const name of this.$$s) {
    					if (name in existing_slots) {
    						if (name === 'default' && !this.$$d.children) {
    							this.$$d.children = create_slot(name);
    							$$slots.default = true;
    						} else {
    							$$slots[name] = create_slot(name);
    						}
    					}
    				}
    				for (const attribute of this.attributes) {
    					// this.$$data takes precedence over this.attributes
    					const name = this.$$g_p(attribute.name);
    					if (!(name in this.$$d)) {
    						this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, 'toProp');
    					}
    				}
    				// Port over props that were set programmatically before ce was initialized
    				for (const key in this.$$p_d) {
    					// @ts-expect-error
    					if (!(key in this.$$d) && this[key] !== undefined) {
    						// @ts-expect-error
    						this.$$d[key] = this[key]; // don't transform, these were set through JavaScript
    						// @ts-expect-error
    						delete this[key]; // remove the property that shadows the getter/setter
    					}
    				}
    				this.$$c = createClassComponent({
    					component: this.$$ctor,
    					target: this.shadowRoot || this,
    					props: {
    						...this.$$d,
    						$$slots,
    						$$host: this
    					}
    				});

    				// Reflect component props as attributes
    				this.$$me = effect_root(() => {
    					render_effect(() => {
    						this.$$r = true;
    						for (const key of object_keys(this.$$c)) {
    							if (!this.$$p_d[key]?.reflect) continue;
    							this.$$d[key] = this.$$c[key];
    							const attribute_value = get_custom_element_value(
    								key,
    								this.$$d[key],
    								this.$$p_d,
    								'toAttribute'
    							);
    							if (attribute_value == null) {
    								this.removeAttribute(this.$$p_d[key].attribute || key);
    							} else {
    								this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
    							}
    						}
    						this.$$r = false;
    					});
    				});

    				for (const type in this.$$l) {
    					for (const listener of this.$$l[type]) {
    						const unsub = this.$$c.$on(type, listener);
    						this.$$l_u.set(listener, unsub);
    					}
    				}
    				this.$$l = {};
    			}
    		}

    		// We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    		// and setting attributes through setAttribute etc, this is helpful

    		/**
    		 * @param {string} attr
    		 * @param {string} _oldValue
    		 * @param {string} newValue
    		 */
    		attributeChangedCallback(attr, _oldValue, newValue) {
    			if (this.$$r) return;
    			attr = this.$$g_p(attr);
    			this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, 'toProp');
    			this.$$c?.$set({ [attr]: this.$$d[attr] });
    		}

    		disconnectedCallback() {
    			this.$$cn = false;
    			// In a microtask, because this could be a move within the DOM
    			Promise.resolve().then(() => {
    				if (!this.$$cn && this.$$c) {
    					this.$$c.$destroy();
    					this.$$me();
    					this.$$c = undefined;
    				}
    			});
    		}

    		/**
    		 * @param {string} attribute_name
    		 */
    		$$g_p(attribute_name) {
    			return (
    				object_keys(this.$$p_d).find(
    					(key) =>
    						this.$$p_d[key].attribute === attribute_name ||
    						(!this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)
    				) || attribute_name
    			);
    		}
    	};
    }

    /**
     * @param {string} prop
     * @param {any} value
     * @param {Record<string, CustomElementPropDefinition>} props_definition
     * @param {'toAttribute' | 'toProp'} [transform]
     */
    function get_custom_element_value(prop, value, props_definition, transform) {
    	const type = props_definition[prop]?.type;
    	value = type === 'Boolean' && typeof value !== 'boolean' ? value != null : value;
    	if (!transform || !props_definition[prop]) {
    		return value;
    	} else if (transform === 'toAttribute') {
    		switch (type) {
    			case 'Object':
    			case 'Array':
    				return value == null ? null : JSON.stringify(value);
    			case 'Boolean':
    				return value ? '' : null;
    			case 'Number':
    				return value == null ? null : value;
    			default:
    				return value;
    		}
    	} else {
    		switch (type) {
    			case 'Object':
    			case 'Array':
    				return value && JSON.parse(value);
    			case 'Boolean':
    				return value; // conversion already handled above
    			case 'Number':
    				return value != null ? +value : value;
    			default:
    				return value;
    		}
    	}
    }

    /**
     * @param {HTMLElement} element
     */
    function get_custom_elements_slots(element) {
    	/** @type {Record<string, true>} */
    	const result = {};
    	element.childNodes.forEach((node) => {
    		result[/** @type {Element} node */ (node).slot || 'default'] = true;
    	});
    	return result;
    }

    /**
     * @internal
     *
     * Turn a Svelte component into a custom element.
     * @param {any} Component  A Svelte component function
     * @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
     * @param {string[]} slots  The slots to create
     * @param {string[]} exports  Explicitly exported values, other than props
     * @param {boolean} use_shadow_dom  Whether to use shadow DOM
     * @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
     */
    function create_custom_element(
    	Component,
    	props_definition,
    	slots,
    	exports,
    	use_shadow_dom,
    	extend
    ) {
    	let Class = class extends SvelteElement {
    		constructor() {
    			super(Component, slots, use_shadow_dom);
    			this.$$p_d = props_definition;
    		}
    		static get observedAttributes() {
    			return object_keys(props_definition).map((key) =>
    				(props_definition[key].attribute || key).toLowerCase()
    			);
    		}
    	};
    	object_keys(props_definition).forEach((prop) => {
    		define_property(Class.prototype, prop, {
    			get() {
    				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
    			},
    			set(value) {
    				value = get_custom_element_value(prop, value, props_definition);
    				this.$$d[prop] = value;
    				var component = this.$$c;

    				if (component) {
    					// // If the instance has an accessor, use that instead
    					var setter = get_descriptor(component, prop)?.get;

    					if (setter) {
    						component[prop] = value;
    					} else {
    						component.$set({ [prop]: value });
    					}
    				}
    			}
    		});
    	});
    	exports.forEach((property) => {
    		define_property(Class.prototype, property, {
    			get() {
    				return this.$$c?.[property];
    			}
    		});
    	});
    	Component.element = /** @type {any} */ Class;
    	return Class;
    }

    const RUNTIME_CALLBACKS_CTX = Symbol('cv-runtime-callbacks');

    /* icon-settings-store.svelte.ts generated by Svelte v5.46.1 */

    const COLLAPSED_KEY = 'cv-settings-icon-collapsed';
    const OFFSET_KEY = 'cv-settings-icon-offset';

    const ICON_SETTINGS_CTX = Symbol('icon-settings');

    class IconSettingsStore {
    	persistence;
    	#isCollapsed = state(false);

    	get isCollapsed() {
    		return get(this.#isCollapsed);
    	}

    	set isCollapsed(value) {
    		set(this.#isCollapsed, value, true);
    	}

    	#offset = state(0);

    	get offset() {
    		return get(this.#offset);
    	}

    	set offset(value) {
    		set(this.#offset, value, true);
    	}

    	#isDismissed = state(false);

    	get isDismissed() {
    		return get(this.#isDismissed);
    	}

    	set isDismissed(value) {
    		set(this.#isDismissed, value, true);
    	}

    	constructor(persistence) {
    		this.persistence = persistence;

    		const savedCollapsed = persistence.getItem(COLLAPSED_KEY);

    		if (savedCollapsed !== null) {
    			this.isCollapsed = savedCollapsed === 'true';
    		} else if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    			this.isCollapsed = true;
    		}

    		// Parse offset safely
    		const savedOffset = persistence.getItem(OFFSET_KEY);

    		if (savedOffset !== null) {
    			const parsedOffset = parseFloat(savedOffset);

    			if (Number.isFinite(parsedOffset)) {
    				this.offset = parsedOffset;
    			} else {
    				// Corrupted value; clear it out.
    				this.offset = 0;

    				persistence.removeItem(OFFSET_KEY);
    			}
    		}
    	}

    	setCollapsed(value) {
    		this.isCollapsed = value;
    		this.persistence.setItem(COLLAPSED_KEY, value.toString());
    	}

    	setOffset(value) {
    		this.offset = value;
    		this.persistence.setItem(OFFSET_KEY, value.toString());
    	}

    	resetPositionAndCollapseState() {
    		this.offset = 0;
    		this.persistence.removeItem(OFFSET_KEY);
    		this.persistence.removeItem(COLLAPSED_KEY);

    		if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    			this.isCollapsed = true;
    		} else {
    			this.isCollapsed = false;
    		}

    		this.isDismissed = false;
    	}

    	dismiss() {
    		this.isDismissed = true;
    	}
    }

    /** @import { Source } from '#client' */

    var read_methods = ['forEach', 'isDisjointFrom', 'isSubsetOf', 'isSupersetOf'];
    var set_like_methods = ['difference', 'intersection', 'symmetricDifference', 'union'];

    var inited = false;

    /**
     * A reactive version of the built-in [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object.
     * Reading contents of the set (by iterating, or by reading `set.size` or calling `set.has(...)` as in the [example](https://svelte.dev/playground/53438b51194b4882bcc18cddf9f96f15) below) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
     * will cause it to be re-evaluated as necessary when the set is updated.
     *
     * Note that values in a reactive set are _not_ made [deeply reactive](https://svelte.dev/docs/svelte/$state#Deep-state).
     *
     * ```svelte
     * <script>
     * 	import { SvelteSet } from 'svelte/reactivity';
     * 	let monkeys = new SvelteSet();
     *
     * 	function toggle(monkey) {
     * 		if (monkeys.has(monkey)) {
     * 			monkeys.delete(monkey);
     * 		} else {
     * 			monkeys.add(monkey);
     * 		}
     * 	}
     * </script>
     *
     * {#each ['🙈', '🙉', '🙊'] as monkey}
     * 	<button onclick={() => toggle(monkey)}>{monkey}</button>
     * {/each}
     *
     * <button onclick={() => monkeys.clear()}>clear</button>
     *
     * {#if monkeys.has('🙈')}<p>see no evil</p>{/if}
     * {#if monkeys.has('🙉')}<p>hear no evil</p>{/if}
     * {#if monkeys.has('🙊')}<p>speak no evil</p>{/if}
     * ```
     *
     * @template T
     * @extends {Set<T>}
     */
    class SvelteSet extends Set {
    	/** @type {Map<T, Source<boolean>>} */
    	#sources = new Map();
    	#version = state(0);
    	#size = state(0);
    	#update_version = update_version || -1;

    	/**
    	 * @param {Iterable<T> | null | undefined} [value]
    	 */
    	constructor(value) {
    		super();

    		if (value) {
    			for (var element of value) {
    				super.add(element);
    			}
    			this.#size.v = super.size;
    		}

    		if (!inited) this.#init();
    	}

    	/**
    	 * If the source is being created inside the same reaction as the SvelteSet instance,
    	 * we use `state` so that it will not be a dependency of the reaction. Otherwise we
    	 * use `source` so it will be.
    	 *
    	 * @template T
    	 * @param {T} value
    	 * @returns {Source<T>}
    	 */
    	#source(value) {
    		return update_version === this.#update_version ? state(value) : source(value);
    	}

    	// We init as part of the first instance so that we can treeshake this class
    	#init() {
    		inited = true;

    		var proto = SvelteSet.prototype;
    		var set_proto = Set.prototype;

    		for (const method of read_methods) {
    			// @ts-ignore
    			proto[method] = function (...v) {
    				get(this.#version);
    				// @ts-ignore
    				return set_proto[method].apply(this, v);
    			};
    		}

    		for (const method of set_like_methods) {
    			// @ts-ignore
    			proto[method] = function (...v) {
    				get(this.#version);
    				// @ts-ignore
    				var set = /** @type {Set<T>} */ (set_proto[method].apply(this, v));
    				return new SvelteSet(set);
    			};
    		}
    	}

    	/** @param {T} value */
    	has(value) {
    		var has = super.has(value);
    		var sources = this.#sources;
    		var s = sources.get(value);

    		if (s === undefined) {
    			if (!has) {
    				// If the value doesn't exist, track the version in case it's added later
    				// but don't create sources willy-nilly to track all possible values
    				get(this.#version);
    				return false;
    			}

    			s = this.#source(true);

    			sources.set(value, s);
    		}

    		get(s);
    		return has;
    	}

    	/** @param {T} value */
    	add(value) {
    		if (!super.has(value)) {
    			super.add(value);
    			set(this.#size, super.size);
    			increment(this.#version);
    		}

    		return this;
    	}

    	/** @param {T} value */
    	delete(value) {
    		var deleted = super.delete(value);
    		var sources = this.#sources;
    		var s = sources.get(value);

    		if (s !== undefined) {
    			sources.delete(value);
    			set(s, false);
    		}

    		if (deleted) {
    			set(this.#size, super.size);
    			increment(this.#version);
    		}

    		return deleted;
    	}

    	clear() {
    		if (super.size === 0) {
    			return;
    		}
    		// Clear first, so we get nice console.log outputs with $inspect
    		super.clear();
    		var sources = this.#sources;

    		for (var s of sources.values()) {
    			set(s, false);
    		}

    		sources.clear();
    		set(this.#size, 0);
    		increment(this.#version);
    	}

    	keys() {
    		return this.values();
    	}

    	values() {
    		get(this.#version);
    		return super.values();
    	}

    	entries() {
    		get(this.#version);
    		return super.entries();
    	}

    	[Symbol.iterator]() {
    		return this.keys();
    	}

    	get size() {
    		return get(this.#size);
    	}
    }

    /** @import { Source } from '#client' */

    /**
     * A reactive version of the built-in [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.
     * Reading contents of the map (by iterating, or by reading `map.size` or calling `map.get(...)` or `map.has(...)` as in the [tic-tac-toe example](https://svelte.dev/playground/0b0ff4aa49c9443f9b47fe5203c78293) below) in an [effect](https://svelte.dev/docs/svelte/$effect) or [derived](https://svelte.dev/docs/svelte/$derived)
     * will cause it to be re-evaluated as necessary when the map is updated.
     *
     * Note that values in a reactive map are _not_ made [deeply reactive](https://svelte.dev/docs/svelte/$state#Deep-state).
     *
     * ```svelte
     * <script>
     * 	import { SvelteMap } from 'svelte/reactivity';
     * 	import { result } from './game.js';
     *
     * 	let board = new SvelteMap();
     * 	let player = $state('x');
     * 	let winner = $derived(result(board));
     *
     * 	function reset() {
     * 		player = 'x';
     * 		board.clear();
     * 	}
     * </script>
     *
     * <div class="board">
     * 	{#each Array(9), i}
     * 		<button
     * 			disabled={board.has(i) || winner}
     * 			onclick={() => {
     * 				board.set(i, player);
     * 				player = player === 'x' ? 'o' : 'x';
     * 			}}
     * 		>{board.get(i)}</button>
     * 	{/each}
     * </div>
     *
     * {#if winner}
     * 	<p>{winner} wins!</p>
     * 	<button onclick={reset}>reset</button>
     * {:else}
     * 	<p>{player} is next</p>
     * {/if}
     * ```
     *
     * @template K
     * @template V
     * @extends {Map<K, V>}
     */
    class SvelteMap extends Map {
    	/** @type {Map<K, Source<number>>} */
    	#sources = new Map();
    	#version = state(0);
    	#size = state(0);
    	#update_version = update_version || -1;

    	/**
    	 * @param {Iterable<readonly [K, V]> | null | undefined} [value]
    	 */
    	constructor(value) {
    		super();

    		if (value) {
    			for (var [key, v] of value) {
    				super.set(key, v);
    			}
    			this.#size.v = super.size;
    		}
    	}

    	/**
    	 * If the source is being created inside the same reaction as the SvelteMap instance,
    	 * we use `state` so that it will not be a dependency of the reaction. Otherwise we
    	 * use `source` so it will be.
    	 *
    	 * @template T
    	 * @param {T} value
    	 * @returns {Source<T>}
    	 */
    	#source(value) {
    		return update_version === this.#update_version ? state(value) : source(value);
    	}

    	/** @param {K} key */
    	has(key) {
    		var sources = this.#sources;
    		var s = sources.get(key);

    		if (s === undefined) {
    			var ret = super.get(key);
    			if (ret !== undefined) {
    				s = this.#source(0);

    				sources.set(key, s);
    			} else {
    				// We should always track the version in case
    				// the Set ever gets this value in the future.
    				get(this.#version);
    				return false;
    			}
    		}

    		get(s);
    		return true;
    	}

    	/**
    	 * @param {(value: V, key: K, map: Map<K, V>) => void} callbackfn
    	 * @param {any} [this_arg]
    	 */
    	forEach(callbackfn, this_arg) {
    		this.#read_all();
    		super.forEach(callbackfn, this_arg);
    	}

    	/** @param {K} key */
    	get(key) {
    		var sources = this.#sources;
    		var s = sources.get(key);

    		if (s === undefined) {
    			var ret = super.get(key);
    			if (ret !== undefined) {
    				s = this.#source(0);

    				sources.set(key, s);
    			} else {
    				// We should always track the version in case
    				// the Set ever gets this value in the future.
    				get(this.#version);
    				return undefined;
    			}
    		}

    		get(s);
    		return super.get(key);
    	}

    	/**
    	 * @param {K} key
    	 * @param {V} value
    	 * */
    	set(key, value) {
    		var sources = this.#sources;
    		var s = sources.get(key);
    		var prev_res = super.get(key);
    		var res = super.set(key, value);
    		var version = this.#version;

    		if (s === undefined) {
    			s = this.#source(0);

    			sources.set(key, s);
    			set(this.#size, super.size);
    			increment(version);
    		} else if (prev_res !== value) {
    			increment(s);

    			// if not every reaction of s is a reaction of version we need to also include version
    			var v_reactions = version.reactions === null ? null : new Set(version.reactions);
    			var needs_version_increase =
    				v_reactions === null ||
    				!s.reactions?.every((r) =>
    					/** @type {NonNullable<typeof v_reactions>} */ (v_reactions).has(r)
    				);
    			if (needs_version_increase) {
    				increment(version);
    			}
    		}

    		return res;
    	}

    	/** @param {K} key */
    	delete(key) {
    		var sources = this.#sources;
    		var s = sources.get(key);
    		var res = super.delete(key);

    		if (s !== undefined) {
    			sources.delete(key);
    			set(this.#size, super.size);
    			set(s, -1);
    			increment(this.#version);
    		}

    		return res;
    	}

    	clear() {
    		if (super.size === 0) {
    			return;
    		}
    		// Clear first, so we get nice console.log outputs with $inspect
    		super.clear();
    		var sources = this.#sources;
    		set(this.#size, 0);
    		for (var s of sources.values()) {
    			set(s, -1);
    		}
    		increment(this.#version);
    		sources.clear();
    	}

    	#read_all() {
    		get(this.#version);

    		var sources = this.#sources;
    		if (this.#size.v !== sources.size) {
    			for (var key of super.keys()) {
    				if (!sources.has(key)) {
    					var s = this.#source(0);

    					sources.set(key, s);
    				}
    			}
    		}

    		for ([, s] of this.#sources) {
    			get(s);
    		}
    	}

    	keys() {
    		get(this.#version);
    		return super.keys();
    	}

    	values() {
    		this.#read_all();
    		return super.values();
    	}

    	entries() {
    		this.#read_all();
    		return super.entries();
    	}

    	[Symbol.iterator]() {
    		return this.entries();
    	}

    	get size() {
    		get(this.#size);
    		return super.size;
    	}
    }

    /* placeholder-registry-store.svelte.ts generated by Svelte v5.46.1 */

    class PlaceholderRegistryStore {
    	// Reactivity: Map is deeply reactive in Svelte 5 with $state
    	_definitions = new SvelteMap();

    	// Public getter for array access
    	get definitions() {
    		return Array.from(this._definitions.values());
    	}

    	register(def) {
    		if (this._definitions.has(def.name)) {
    			this.updateExisting(def);
    		} else {
    			this.addNew(def);
    		}
    	}

    	get(name) {
    		return this._definitions.get(name);
    	}

    	has(name) {
    		return this._definitions.has(name);
    	}

    	updateExisting(newDef) {
    		const existing = this._definitions.get(newDef.name);

    		if (existing && this.hasChanged(existing, newDef)) {
    			this._definitions.set(newDef.name, newDef);
    		}
    	}

    	addNew(def) {
    		this._definitions.set(def.name, def);
    	}

    	hasChanged(existing, newDef) {
    		return existing.settingsLabel !== newDef.settingsLabel || existing.settingsHint !== newDef.settingsHint || existing.defaultValue !== newDef.defaultValue || existing.hiddenFromSettings !== newDef.hiddenFromSettings || existing.isLocal !== newDef.isLocal;
    	}
    }

    const placeholderRegistryStore = new PlaceholderRegistryStore();

    class PlaceholderManager {
        /**
         * Registers global placeholders defined in the configuration.
         * Source is marked as 'config'.
         */
        registerConfigPlaceholders(config) {
            if (config.placeholders) {
                config.placeholders.forEach((def) => {
                    placeholderRegistryStore.register({
                        ...def,
                        // adaptationPlaceholder implies hidden from user-facing settings
                        hiddenFromSettings: def.adaptationPlaceholder ? true : def.hiddenFromSettings,
                        source: 'config',
                    });
                });
            }
        }
        /**
         * Registers placeholders defined implicitly via Tab Groups.
         * Source is marked as 'tabgroup'.
         *
         * Should be called AFTER registerConfigPlaceholders to ensure config precedence.
         */
        registerTabGroupPlaceholders(config) {
            if (config.tabGroups) {
                config.tabGroups.forEach((group) => {
                    this.registerPlaceholderFromTabGroup(group);
                });
            }
        }
        /**
         * Calculates the placeholder value based on the active tab selection in a group.
         *
         * @param tabgroupId The ID of the tab group
         * @param tabId The ID of the currently active tab
         * @param config The full application configuration
         * @returns An object containing the placeholder key and value, or null if nothing to update.
         */
        calculatePlaceholderFromTabSelected(tabgroupId, tabId, config) {
            const groupConfig = config.tabGroups?.find((g) => g.groupId === tabgroupId);
            if (!groupConfig || !groupConfig.placeholderId)
                return null;
            if (!placeholderRegistryStore.has(groupConfig.placeholderId))
                return null;
            const tabConfig = groupConfig.tabs.find((t) => t.tabId === tabId);
            if (!tabConfig)
                return null;
            const placeholderValue = tabConfig.placeholderValue ?? '';
            return { key: groupConfig.placeholderId, value: placeholderValue };
        }
        /**
         * Filters a record of incoming placeholders to only those registered in the registry.
         * Warns and skips unregistered keys to prevent arbitrary key injection.
         *
         * @param placeholders Raw key-value record to validate (e.g. from a URL delta or persistence).
         * @returns A filtered record containing only registered placeholder keys.
         */
        filterValidPlaceholders(placeholders = {}) {
            const valid = {};
            for (const [key, value] of Object.entries(placeholders)) {
                if (placeholderRegistryStore.has(key)) {
                    valid[key] = value;
                }
                else {
                    console.warn(`[CustardUI] Placeholder "${key}" is not registered and will be ignored.`);
                }
            }
            return valid;
        }
        /**
         * Filters a record of incoming placeholders to only those that can be set by users.
         * Extends filterValidPlaceholders() by also excluding adaptation-only placeholders.
         * Use this for persistence loads and URL delta application.
         */
        filterUserSettablePlaceholders(placeholders = {}) {
            const valid = this.filterValidPlaceholders(placeholders);
            const userSettable = {};
            for (const [key, value] of Object.entries(valid)) {
                const def = placeholderRegistryStore.get(key);
                if (def?.adaptationPlaceholder) {
                    // Silently skip — adaptation-only placeholders cannot be user-set
                    continue;
                }
                userSettable[key] = value;
            }
            return userSettable;
        }
        // --- Internal Helpers ---
        registerPlaceholderFromTabGroup(groupConfig) {
            if (!groupConfig.placeholderId)
                return;
            const id = groupConfig.placeholderId;
            const existing = placeholderRegistryStore.get(id);
            if (existing) {
                if (existing.source === 'config') {
                    console.warn(`[CustardUI] Tab group "${groupConfig.groupId}" is binding to placeholder "${id}", ` +
                        `which is already explicitly defined in placeholders config. ` +
                        `To avoid unexpected behavior, placeholders should have a single source of truth.`);
                }
                else if (existing.source === 'tabgroup' &&
                    existing.ownerTabGroupId !== groupConfig.groupId) {
                    console.warn(`[CustardUI] Multiple tab groups are binding to the same placeholderId: "${id}". ` +
                        `Current group: "${groupConfig.groupId}", Existing group: "${existing.ownerTabGroupId}". ` +
                        `This will cause race conditions as both groups compete for the same value.`);
                }
                return;
            }
            placeholderRegistryStore.register({
                name: id,
                settingsLabel: groupConfig.label ?? groupConfig.groupId,
                hiddenFromSettings: true,
                source: 'tabgroup',
                ownerTabGroupId: groupConfig.groupId,
            });
            // We do not return the initial value here, as registration happens during config load
            // and we let the ActiveStateStore handle initial state setup.
        }
    }
    const placeholderManager = new PlaceholderManager();

    const CONFIG_SECTION_KEYS = ['toggles', 'tabGroups', 'placeholders'];
    function isValidConfigSection(key) {
        return CONFIG_SECTION_KEYS.includes(key);
    }

    /* active-state-store.svelte.ts generated by Svelte v5.46.1 */

    class ActiveStateStore {
    	#config = /**
    	 * Static configuration loaded at startup.
    	 */
    	state(proxy({}));

    	get config() {
    		return get(this.#config);
    	}

    	set config(value) {
    		set(this.#config, value, true);
    	}

    	#configSectionOrder = state(proxy([]));

    	get configSectionOrder() {
    		return get(this.#configSectionOrder);
    	}

    	set configSectionOrder(value) {
    		set(this.#configSectionOrder, value, true);
    	}

    	#state = state(proxy({
    		shownToggles: [],
    		peekToggles: [],
    		tabs: {},
    		placeholders: {}
    	}));

    	get state() {
    		return get(this.#state);
    	}

    	set state(value) {
    		set(this.#state, value, true);
    	}

    	constructor(initialConfig = {}) {
    		if (Object.keys(initialConfig).length > 0) {
    			this.init(initialConfig);
    		} else {
    			this.state = this.computeDefaultState();
    		}
    	}

    	/**
    	 * Initialize with real configuration.
    	 */
    	init(config) {
    		Object.assign(this.config, config);
    		this.configSectionOrder = Object.keys(config).filter(isValidConfigSection);

    		// Compute new defaults and merge
    		const newState = this.computeDefaultState();

    		// Reset state to computed defaults.
    		// Overriding with URL state happens later via applyDifferenceInState().
    		this.state.shownToggles = newState.shownToggles ?? [];

    		this.state.peekToggles = newState.peekToggles ?? [];
    		this.state.tabs = newState.tabs ?? {};
    		this.state.placeholders = newState.placeholders ?? {};
    	}

    	// --- Actions ---
    	/**
    	 * Set the marked tab for a specific tab group.
    	 * This syncs across all tab groups with the same ID.
    	 * @param groupId The ID of the tab group.
    	 * @param tabId The ID of the tab to mark.
    	 */
    	setMarkedTab(groupId, tabId) {
    		if (!this.state.tabs) this.state.tabs = {};

    		this.state.tabs[groupId] = tabId;

    		const phUpdate = placeholderManager.calculatePlaceholderFromTabSelected(groupId, tabId, this.config);

    		if (phUpdate) {
    			this.setPlaceholder(phUpdate.key, phUpdate.value);
    		}
    	}

    	/**
    	 * Update the visibility of toggles.
    	 * @param shown List of IDs for toggles in "Show" state.
    	 * @param peek List of IDs for toggles in "Peek" state.
    	 */
    	setToggles(shown, peek) {
    		this.state.shownToggles = shown;
    		this.state.peekToggles = peek;
    	}

    	/**
    	 * Update the visibility state of a specific toggle.
    	 * Handled internally so UI components (like Modal) don't need to mutate arrays directly.
    	 * @param toggleId The ID of the toggle.
    	 * @param value The new visibility state.
    	 */
    	updateToggleState(toggleId, value) {
    		const currentShown = this.state.shownToggles || [];
    		const currentPeek = this.state.peekToggles || [];
    		const newShown = currentShown.filter((id) => id !== toggleId);
    		const newPeek = currentPeek.filter((id) => id !== toggleId);

    		if (value === 'show') newShown.push(toggleId);
    		if (value === 'peek') newPeek.push(toggleId);

    		this.setToggles(newShown, newPeek);
    	}

    	/**
    	 * Set a specific placeholder value.
    	 * @param key The ID/name of the placeholder.
    	 * @param value The value to set.
    	 */
    	setPlaceholder(key, value) {
    		if (!this.state.placeholders) this.state.placeholders = {};

    		this.state.placeholders[key] = value;
    	}

    	// --- State Application ---
    	/**
    	 * Replaces the full application state (e.g. from persistence).
    	 *
    	 * Precedence model:
    	 * 1. Start from computed defaults for toggles and tabs.
    	 * 2. Layer in the incoming `newState`, sanitizing toggles, tabs, and user-settable placeholders.
    	 * 3. For placeholders, use the CURRENT state as the base (preserving adaptation defaults)
    	 *    and merge user-persisted values on top.
    	 * 4. Sync any tab-group-derived placeholders that weren't explicitly set.
    	 *
    	 * @param newState The persisted state to restore.
    	 */
    	applyState(newState) {
    		const defaults = this.computeDefaultState();
    		const validatedTabs = this.filterValidTabs(newState.tabs ?? {});
    		const validatedPlaceholders = placeholderManager.filterUserSettablePlaceholders(newState.placeholders ?? {});
    		const validatedShownToggles = this.filterValidToggles(newState.shownToggles ?? defaults.shownToggles ?? []);
    		const validatedPeekToggles = this.filterValidToggles(newState.peekToggles ?? defaults.peekToggles ?? []);

    		this.state = {
    			shownToggles: validatedShownToggles,
    			peekToggles: validatedPeekToggles,
    			tabs: { ...defaults.tabs ?? {}, ...validatedTabs },

    			// Use current state as base so adaptation defaults (layered before this call)
    			// are preserved; user-persisted values still win on top.
    			placeholders: { ...this.state.placeholders ?? {}, ...validatedPlaceholders }
    		};

    		// Sync derived placeholders for any tabs that shifted (and aren't explicitly overridden).
    		this.syncPlaceholdersFromTabs(validatedPlaceholders);
    	}

    	/**
    	 * Applies a sparse delta on top of the current state (e.g. from URL parameters).
    	 *
    	 * Semantics:
    	 * - Only toggles explicitly mentioned in the delta are affected;
    	 *   unmentioned toggles retain their current visibility.
    	 * - Tab and placeholder entries in the delta are merged into (not replacing) current state.
    	 * - Incoming tab IDs are validated against the config; invalid entries are dropped.
    	 * - Incoming placeholder keys are validated against the registry; invalid keys are dropped.
    	 * - After tab merges, tab-group-derived placeholders are automatically synced
    	 *   unless the delta explicitly provides a value for them.
    	 *
    	 * @param deltaState Partial state describing only the changes to apply.
    	 */
    	applyDifferenceInState(deltaState) {
    		this.applyToggleDelta(deltaState);
    		this.applyTabsDelta(deltaState.tabs ?? {});
    		this.applyPlaceholdersDelta(deltaState.placeholders ?? {});
    	}

    	/**
    	 * Applies adaptation defaults on top of the config defaults, before persisted state.
    	 * User choices applied later via applyState() will override these.
    	 *
    	 * @param defaults The defaults section from the adaptation config
    	 */
    	applyAdaptationDefaults(defaults) {
    		if (!defaults) return;

    		if (defaults.toggles) {
    			this.applyToggleMap(defaults.toggles);
    		}

    		if (defaults.placeholders) {
    			const validated = placeholderManager.filterValidPlaceholders(defaults.placeholders);

    			if (!this.state.placeholders) this.state.placeholders = {};

    			Object.assign(this.state.placeholders, validated);
    		}
    	}

    	/**
    	 * Resets the application state to the computed defaults.
    	 */
    	reset() {
    		this.state = this.computeDefaultState();
    	}

    	computeDefaultState() {
    		const shownToggles = [];
    		const peekToggles = [];
    		const tabs = {};
    		const placeholders = {};

    		// 1. Process toggles
    		for (const toggle of this.config.toggles ?? []) {
    			if (toggle.default === 'peek') {
    				peekToggles.push(toggle.toggleId);
    			} else if (toggle.default === 'hide') ; else {
    				shownToggles.push(toggle.toggleId);
    			}
    		}

    		// 2. Process tab groups
    		for (const group of this.config.tabGroups ?? []) {
    			let defaultTabId = group.default;

    			if (!defaultTabId) {
    				defaultTabId = group.tabs?.[0]?.tabId;
    			}

    			if (!defaultTabId) continue;

    			tabs[group.groupId] = defaultTabId;

    			if (!group.placeholderId) continue;

    			// Priority: config-owned placeholders (source: 'config') always win.
    			// Even if they have no defaultValue, they should not be seeded from a tab.
    			const definition = placeholderRegistryStore.get(group.placeholderId);

    			if (definition?.source === 'config') continue;

    			const tabConfig = group.tabs.find((t) => t.tabId === defaultTabId);

    			if (tabConfig && placeholders[group.placeholderId] === undefined) {
    				placeholders[group.placeholderId] = tabConfig.placeholderValue ?? '';
    			}
    		}

    		// 3. Seed author-controlled (adaptationPlaceholder) defaults.
    		// These are set by adaptations when active, and fall back to defaultValue when no adaptation is active.
    		// This is intentionally separate from regular user-settable placeholder defaults (see PR #206).
    		for (const def of placeholderRegistryStore.definitions) {
    			if (def.adaptationPlaceholder && def.defaultValue !== undefined && def.defaultValue !== '') {
    				placeholders[def.name] = def.defaultValue;
    			}
    		}

    		return { shownToggles, peekToggles, tabs, placeholders };
    	}

    	// --- Private Helpers ---
    	/**
    	 * Finds a toggle in the configuration using a case-insensitive ID match.
    	 * @param toggleId The ID to search for.
    	 * @returns The matched toggle configuration, or undefined if not found.
    	 */
    	getToggleConfigFromConfig(toggleId) {
    		return this.config.toggles?.find((t) => t.toggleId.toLowerCase() === toggleId.toLowerCase());
    	}

    	/**
    	 * Applies a map of toggleId → visibility to the current state.
    	 * Removes each mentioned toggle from both lists, then re-adds to the correct one.
    	 * Warns and drops unknown IDs (consistent with filterValidToggles).
    	 */
    	applyToggleMap(toggleMap) {
    		for (const [toggleId, visibility] of Object.entries(toggleMap)) {
    			const match = this.getToggleConfigFromConfig(toggleId);

    			if (!match) {
    				console.warn(`[CustardUI] Toggle "${toggleId}" is not in the config and will be ignored.`);

    				continue;
    			}

    			const canonical = match.toggleId;

    			// Remove from both lists
    			this.state.shownToggles = (this.state.shownToggles ?? []).filter((id) => id !== canonical);

    			this.state.peekToggles = (this.state.peekToggles ?? []).filter((id) => id !== canonical);

    			// Re-add to correct list
    			if (visibility === 'show') {
    				this.state.shownToggles.push(canonical);
    			} else if (visibility === 'peek') {
    				this.state.peekToggles.push(canonical);
    			}

    			// 'hide' means absent from both lists — already handled above
    		}
    	}

    	/**
    	 * Applies the toggle portion of a delta state.
    	 * Toggles explicitly reassigned in the delta are moved to their new state;
    	 * all others retain their current visibility.
    	 */
    	applyToggleDelta(deltaState) {
    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const toShow = new Set(this.filterValidToggles(deltaState.shownToggles ?? []));

    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const toPeek = new Set(this.filterValidToggles(deltaState.peekToggles ?? []));

    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const toHide = new Set(this.filterValidToggles(deltaState.hiddenToggles ?? []));

    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const allMentioned = new Set([...toShow, ...toPeek, ...toHide]);

    		const newShown = (this.state.shownToggles ?? []).filter((id) => !allMentioned.has(id));
    		const newPeek = (this.state.peekToggles ?? []).filter((id) => !allMentioned.has(id));

    		newShown.push(...toShow);
    		newPeek.push(...toPeek);

    		// Hidden toggles are simply absent from both shown and peek lists
    		this.state.shownToggles = newShown;

    		this.state.peekToggles = newPeek;
    	}

    	/**
    	 * Merges a tab delta into the current state.
    	 * Validates each incoming groupId and tabId against the configuration.
    	 * Invalid entries are dropped with a warning; valid entries override the current selection.
    	 * After merging, tab-group-derived placeholders are synced.
    	 */
    	applyTabsDelta(deltaTabs) {
    		const validatedTabs = this.filterValidTabs(deltaTabs);

    		if (!this.state.tabs) this.state.tabs = {};

    		Object.assign(this.state.tabs, validatedTabs);

    		// Sync tab-derived placeholders for any tabs that changed.
    		// Placeholders are NOT passed as explicit overrides here, so all tab-derived ones will sync.
    		this.syncPlaceholdersFromTabs({});
    	}

    	/**
    	 * Merges a placeholder delta into the current state.
    	 * Only registered placeholder keys are accepted; others are dropped with a warning.
    	 * Explicit placeholder values override any tab-derived value (winning over syncPlaceholdersFromTabs).
    	 */
    	applyPlaceholdersDelta(deltaPlaceholders) {
    		const validatedPlaceholders = placeholderManager.filterUserSettablePlaceholders(deltaPlaceholders);

    		if (!this.state.placeholders) this.state.placeholders = {};

    		Object.assign(this.state.placeholders, validatedPlaceholders);
    	}

    	/**
    	 * Validates an incoming tab record against the configuration.
    	 * Drops any groupId that doesn't exist in `config.tabGroups`,
    	 * and any tabId that doesn't exist within that group.
    	 *
    	 * @param incomingTabs Raw tab record (e.g. from a URL or persistence).
    	 * @returns A filtered record containing only valid groupId → tabId pairs.
    	 */
    	filterValidTabs(incomingTabs) {
    		const valid = {};

    		for (const [groupId, tabId] of Object.entries(incomingTabs)) {
    			const group = this.config.tabGroups?.find((g) => g.groupId.toLowerCase() === groupId.toLowerCase());

    			if (!group) {
    				console.warn(`[CustardUI] Tab group "${groupId}" is not in the config and will be ignored.`);

    				continue;
    			}

    			const matchedTab = group.tabs.find((t) => t.tabId.toLowerCase() === tabId.toLowerCase());

    			if (!matchedTab) {
    				console.warn(`[CustardUI] Tab "${tabId}" is not in group "${group.groupId}" and will be ignored.`);

    				continue;
    			}

    			valid[group.groupId] = matchedTab.tabId;
    		}

    		return valid;
    	}

    	/**
    	 * Validates an incoming list of toggle IDs against the configuration.
    	 * Invalid IDs are dropped with a warning.
    	 */
    	filterValidToggles(incomingToggles) {
    		if (!this.config.toggles || this.config.toggles.length === 0) {
    			incomingToggles.forEach((id) => console.warn(`[CustardUI] Toggle "${id}" is not in the config and will be ignored.`));

    			return [];
    		}

    		const valid = [];

    		for (const toggleId of incomingToggles) {
    			const match = this.getToggleConfigFromConfig(toggleId);

    			if (!match) {
    				console.warn(`[CustardUI] Toggle "${toggleId}" is not in the config and will be ignored.`);

    				continue;
    			}

    			valid.push(match.toggleId);
    		}

    		return valid;
    	}

    	/**
    	 * Recalculates tab-group-derived placeholders for any tab group that hasn't been
    	 * explicitly overridden in the `explicitPlaceholders` map.
    	 *
    	 * Skip rules (to avoid overwriting intentional values):
    	 * - If the placeholder was explicitly included in the incoming state, skip it.
    	 * - If the placeholder is owned by `config` (not a tab group), skip it.
    	 *
    	 * @param explicitPlaceholders Placeholders that were explicitly set in the incoming state.
    	 */
    	syncPlaceholdersFromTabs(explicitPlaceholders) {
    		if (!this.config.tabGroups) return;

    		for (const group of this.config.tabGroups) {
    			const phId = group.placeholderId;

    			if (!phId) continue;

    			// Explicit URL/persistence value wins — don't overwrite it with the tab-derived value.
    			if (explicitPlaceholders[phId] !== undefined) continue;

    			// Config-owned placeholders are not tab-derived — don't synchronize them.
    			const definition = placeholderRegistryStore.get(phId);

    			if (definition?.source === 'config') continue;

    			// Calculate the tab-derived value for the currently active tab.
    			const activeTabId = this.state.tabs?.[group.groupId];

    			if (!activeTabId) continue;

    			const phUpdate = placeholderManager.calculatePlaceholderFromTabSelected(group.groupId, activeTabId, this.config);

    			if (phUpdate) {
    				this.setPlaceholder(phUpdate.key, phUpdate.value);
    			}
    		}
    	}
    }

    const activeStateStore = new ActiveStateStore();

    /* element-store.svelte.ts generated by Svelte v5.46.1 */

    class ElementStore {
    	#detectedToggles = /**
    	 * Registry of toggle IDs that are currently present in the DOM.
    	 * Used to filter the `menuToggles` list.
    	 */
    	state(proxy(new SvelteSet()));

    	get detectedToggles() {
    		return get(this.#detectedToggles);
    	}

    	set detectedToggles(value) {
    		set(this.#detectedToggles, value, true);
    	}

    	#detectedTabGroups = state(proxy(new SvelteSet()));

    	get detectedTabGroups() {
    		return get(this.#detectedTabGroups);
    	}

    	set detectedTabGroups(value) {
    		set(this.#detectedTabGroups, value, true);
    	}

    	#detectedPlaceholders = state(proxy(new SvelteSet()));

    	get detectedPlaceholders() {
    		return get(this.#detectedPlaceholders);
    	}

    	set detectedPlaceholders(value) {
    		set(this.#detectedPlaceholders, value, true);
    	}

    	#hasElementsOnCurrentPage = user_derived(() => this.detectedToggles.size > 0 || this.detectedTabGroups.size > 0 || this.detectedPlaceholders.size > 0);

    	get hasElementsOnCurrentPage() {
    		return get(this.#hasElementsOnCurrentPage);
    	}

    	set hasElementsOnCurrentPage(value) {
    		set(this.#hasElementsOnCurrentPage, value);
    	}

    	registerToggle(id) {
    		this.detectedToggles.add(id);
    	}

    	/**
    	 * Registers a tab group as active on the current page.
    	 * @param id The ID of the tab group found in the DOM.
    	 */
    	registerTabGroup(id) {
    		this.detectedTabGroups.add(id);
    	}

    	/**
    	 * Registers a placeholder variable as active on the current page.
    	 * @param name The name of the placeholder found in the DOM.
    	 */
    	registerPlaceholder(name) {
    		this.detectedPlaceholders.add(name);
    	}

    	/**
    	 * Clears the component registry.
    	 * Should be called when scanning a fresh part of the DOM or resetting.
    	 */
    	clearRegistry() {
    		this.detectedToggles.clear();
    		this.detectedTabGroups.clear();
    		this.detectedPlaceholders.clear();
    	}

    	clearDetectedPlaceholders() {
    		this.detectedPlaceholders.clear();
    	}
    }

    const elementStore = new ElementStore();

    /* ui-store.svelte.ts generated by Svelte v5.46.1 */

    class UIStore {
    	#uiOptions = state(proxy({
    		showTabGroups: true,
    		showReset: true,
    		title: 'Customize View',
    		description: ''
    	}));

    	get uiOptions() {
    		return get(this.#uiOptions);
    	}

    	set uiOptions(value) {
    		set(this.#uiOptions, value, true);
    	}

    	#isTabGroupNavHeadingVisible = state(true);

    	get isTabGroupNavHeadingVisible() {
    		return get(this.#isTabGroupNavHeadingVisible);
    	}

    	set isTabGroupNavHeadingVisible(value) {
    		set(this.#isTabGroupNavHeadingVisible, value, true);
    	}

    	setUIOptions(options) {
    		if (options.showTabGroups !== undefined) {
    			this.uiOptions.showTabGroups = options.showTabGroups;
    		}

    		if (options.showReset !== undefined) {
    			this.uiOptions.showReset = options.showReset;
    		}

    		if (options.title !== undefined) {
    			this.uiOptions.title = options.title;
    		}

    		if (options.description !== undefined) {
    			this.uiOptions.description = options.description;
    		}
    	}

    	reset() {
    		Object.assign(this.uiOptions, {
    			showTabGroups: true,
    			showReset: true,
    			title: 'Customize View',
    			description: ''
    		});

    		// isTabGroupNavHeadingVisible is intentionally NOT reset here.
    		// This value is persisted separately and should survive a store reset.
    	}
    }

    const uiStore = new UIStore();

    /* derived-store.svelte.ts generated by Svelte v5.46.1 */

    class DerivedStateStore {
    	#menuToggles = user_derived(
    		// Menu toggles are those that are either global or
    		// local but present and registered in the DOM
    		() => {
    			if (!activeStateStore.config.toggles) return [];

    			return activeStateStore.config.toggles.filter((t) => !t.isLocal || elementStore.detectedToggles.has(t.toggleId));
    		}
    	);

    	get menuToggles() {
    		return get(this.#menuToggles);
    	}

    	set menuToggles(value) {
    		set(this.#menuToggles, value);
    	}

    	#menuTabGroups = user_derived(() => {
    		if (!activeStateStore.config.tabGroups) return [];

    		return activeStateStore.config.tabGroups.filter((g) => !g.isLocal || elementStore.detectedTabGroups.has(g.groupId));
    	});

    	get menuTabGroups() {
    		return get(this.#menuTabGroups);
    	}

    	set menuTabGroups(value) {
    		set(this.#menuTabGroups, value);
    	}

    	#hiddenToggleIds = user_derived(() => {
    		const shown = activeStateStore.state.shownToggles ?? [];
    		const peek = activeStateStore.state.peekToggles ?? [];

    		return [...elementStore.detectedToggles].filter((id) => !shown.includes(id) && !peek.includes(id));
    	});

    	get hiddenToggleIds() {
    		return get(this.#hiddenToggleIds);
    	}

    	set hiddenToggleIds(value) {
    		set(this.#hiddenToggleIds, value);
    	}

    	#hasVisiblePlaceholders = user_derived(() => {
    		return placeholderRegistryStore.definitions.some((d) => {
    			if (d.hiddenFromSettings) return false;

    			if (d.isLocal) {
    				return elementStore.detectedPlaceholders.has(d.name);
    			}

    			return true;
    		});
    	});

    	get hasVisiblePlaceholders() {
    		return get(this.#hasVisiblePlaceholders);
    	}

    	set hasVisiblePlaceholders(value) {
    		set(this.#hasVisiblePlaceholders, value);
    	}

    	#hasMenuOptions = user_derived(() => this.menuToggles.length > 0 || this.menuTabGroups.length > 0 || this.hasVisiblePlaceholders);

    	get hasMenuOptions() {
    		return get(this.#hasMenuOptions);
    	}

    	set hasMenuOptions(value) {
    		set(this.#hasMenuOptions, value);
    	}
    }

    const derivedStore = new DerivedStateStore();

    var root$w = from_html(`<div><div role="alert"><button type="button" class="close-btn svelte-ysaqmb" aria-label="Dismiss intro">×</button> <p class="text svelte-ysaqmb"> </p></div></div>`);

    const $$css$o = {
    	hash: 'svelte-ysaqmb',
    	code: '\n  /* Animation */\n  @keyframes svelte-ysaqmb-popIn {\n    0% {\n      opacity: 0;\n      transform: scale(0.9) translateY(-50%);\n    }\n    100% {\n      opacity: 1;\n      transform: scale(1) translateY(-50%);\n    }\n  }\n\n  /* Reset transform for top/bottom positions */\n  @keyframes svelte-ysaqmb-popInVertical {\n    0% {\n      opacity: 0;\n      transform: scale(0.9);\n    }\n    100% {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  /* Simplified Pulse Animation - Shadow Only */\n  @keyframes svelte-ysaqmb-pulse {\n    0% {\n      transform: scale(1);\n      box-shadow:\n        0 4px 6px -1px rgba(0, 0, 0, 0.1),\n        0 0 0 0 rgba(62, 132, 244, 0.7);\n    }\n    50% {\n      transform: scale(1);\n      box-shadow:\n        0 4px 6px -1px rgba(0, 0, 0, 0.1),\n        0 0 0 10px rgba(62, 132, 244, 0);\n    }\n    100% {\n      transform: scale(1);\n      box-shadow:\n        0 4px 6px -1px rgba(0, 0, 0, 0.1),\n        0 0 0 0 rgba(62, 132, 244, 0);\n    }\n  }\n\n  /* Wrapper handles Positioning & Entry Animation */.cv-callout-wrapper.svelte-ysaqmb {position:fixed;z-index:9999;\n\n    /* Default animation (centered ones) */\n    animation: svelte-ysaqmb-popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;}\n\n  /* Inner handles Visuals & Pulse Animation */.cv-callout.svelte-ysaqmb {background:var(--cv-callout-bg, var(--cv-bg));padding:1rem 1.25rem;border-radius:0.5rem;box-shadow:0 4px 6px -1px var(--cv-shadow),\n      0 2px 4px -1px var(--cv-shadow); /* adapt shadow? */max-width:250px;font-size:0.9rem;line-height:1.5;color:var(--cv-callout-text, var(--cv-text));display:flex;align-items:flex-start;gap:0.75rem;font-family:inherit;border:2px solid var(--cv-border);}\n\n  /* Apply pulse to inner callout if enabled */.cv-callout.cv-pulse.svelte-ysaqmb {\n    animation: svelte-ysaqmb-pulse 2s infinite 0.5s;}\n\n  /* Arrow Base */.cv-callout.svelte-ysaqmb::before {content:\'\';position:absolute;width:1rem;height:1rem;background:var(--cv-callout-bg, var(--cv-bg));transform:rotate(45deg);border:2px solid var(--cv-border);z-index:-1;}.close-btn.svelte-ysaqmb {background:transparent;border:none;color:currentColor;opacity:0.7;font-size:1.25rem;line-height:1;cursor:pointer;padding:0;margin:-0.25rem -0.5rem 0 0;transition:opacity 0.15s;flex-shrink:0;}.close-btn.svelte-ysaqmb:hover {color:currentColor;opacity:1;}.text.svelte-ysaqmb {margin:0;flex:1;font-weight:500;}\n\n  /* \n     Position Specifics (Applied to Wrapper)\n  */\n\n  /* Right-side positions (Icon on Right -> Callout on Left) */.pos-top-right.svelte-ysaqmb,\n  .pos-middle-right.svelte-ysaqmb,\n  .pos-bottom-right.svelte-ysaqmb {right:80px;}.pos-top-right.svelte-ysaqmb,\n  .pos-bottom-right.svelte-ysaqmb {\n    animation-name: svelte-ysaqmb-popInVertical;}\n\n  /* X Button Spacing Adjustments */.pos-top-right.svelte-ysaqmb .close-btn:where(.svelte-ysaqmb),\n  .pos-middle-right.svelte-ysaqmb .close-btn:where(.svelte-ysaqmb),\n  .pos-bottom-right.svelte-ysaqmb .close-btn:where(.svelte-ysaqmb) {margin-right:0;margin-left:-0.5rem;}\n\n  /* Left-side positions (Icon on Left -> Callout on Right) */.pos-top-left.svelte-ysaqmb,\n  .pos-middle-left.svelte-ysaqmb,\n  .pos-bottom-left.svelte-ysaqmb {left:80px;}.pos-top-left.svelte-ysaqmb .close-btn:where(.svelte-ysaqmb),\n  .pos-middle-left.svelte-ysaqmb .close-btn:where(.svelte-ysaqmb),\n  .pos-bottom-left.svelte-ysaqmb .close-btn:where(.svelte-ysaqmb) {order:2; /* Move to end */margin-right:-0.5rem;margin-left:0;}.pos-top-left.svelte-ysaqmb,\n  .pos-bottom-left.svelte-ysaqmb {\n    animation-name: svelte-ysaqmb-popInVertical;}\n\n  /* Vertical Alignment */.pos-middle-right.svelte-ysaqmb,\n  .pos-middle-left.svelte-ysaqmb {top:50%;\n    /* transform handled by popIn animation (translateY -50%) */}.pos-top-right.svelte-ysaqmb,\n  .pos-top-left.svelte-ysaqmb {top:20px;}.pos-bottom-right.svelte-ysaqmb,\n  .pos-bottom-left.svelte-ysaqmb {bottom:20px;}\n\n  /* Arrow Positioning (Child of .callout, dependent on Wrapper .pos-*) */\n\n  /* Pointing Right */.pos-top-right.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-middle-right.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-bottom-right.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before {right:-0.5rem;border-left:none;border-bottom:none;}\n\n  /* Pointing Left */.pos-top-left.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-middle-left.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-bottom-left.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before {left:-0.5rem;border-right:none;border-top:none;}\n\n  /* Vertical placement of arrow */.pos-middle-right.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-middle-left.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before {top:50%;margin-top:-0.5rem;}.pos-top-right.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-top-left.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before {top:1.25rem;}.pos-bottom-right.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before,\n  .pos-bottom-left.svelte-ysaqmb .cv-callout:where(.svelte-ysaqmb)::before {bottom:1.25rem;}\n\n  @media print {.cv-callout-wrapper.svelte-ysaqmb {display:none !important;}\n  }'
    };

    function IntroCallout($$anchor, $$props) {
    	append_styles$1($$anchor, $$css$o);

    	let position = prop($$props, 'position', 3, 'middle-left'),
    		message = prop($$props, 'message', 3, 'Customize your reading experience here.'),
    		onclose = prop($$props, 'onclose', 3, () => {}),
    		enablePulse = prop($$props, 'enablePulse', 3, true),
    		backgroundColor = prop($$props, 'backgroundColor', 3, undefined),
    		textColor = prop($$props, 'textColor', 3, undefined);

    	var // Map widget position to callout position logic
    	/*
    	  Positions need to be adjusted based on the widget icon location.
    	  "right" positions -> callout appears to the left of the icon
    	  "left" positions -> callout appears to the right of the icon
    	  "top" -> aligned top
    	  "bottom" -> aligned bottom
    	*/
    	div = root$w();

    	var div_1 = child(div);
    	let styles;
    	var button = child(div_1);

    	button.__click = function (...$$args) {
    		onclose()?.apply(this, $$args);
    	};

    	var p = sibling(button, 2);
    	var text = child(p, true);

    	reset(p);
    	reset(div_1);
    	reset(div);

    	template_effect(() => {
    		set_class(div, 1, `cv-callout-wrapper pos-${position() ?? ''}`, 'svelte-ysaqmb');
    		set_class(div_1, 1, `cv-callout ${enablePulse() ? 'cv-pulse' : ''}`, 'svelte-ysaqmb');

    		styles = set_style(div_1, '', styles, {
    			'--cv-callout-bg': backgroundColor(),
    			'--cv-callout-text': textColor()
    		});

    		set_text(text, message());
    	});

    	append($$anchor, div);
    }

    delegate(['click']);

    var root$v = from_svg(`<svg><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="#0F1729"></path><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10.7673 1.01709C10.9925 0.999829 11.2454 0.99993 11.4516 1.00001L12.5484 1.00001C12.7546 0.99993 13.0075 0.999829 13.2327 1.01709C13.4989 1.03749 13.8678 1.08936 14.2634 1.26937C14.7635 1.49689 15.1915 1.85736 15.5007 2.31147C15.7454 2.67075 15.8592 3.0255 15.9246 3.2843C15.9799 3.50334 16.0228 3.75249 16.0577 3.9557L16.1993 4.77635L16.2021 4.77788C16.2369 4.79712 16.2715 4.81659 16.306 4.8363L16.3086 4.83774L17.2455 4.49865C17.4356 4.42978 17.6693 4.34509 17.8835 4.28543C18.1371 4.2148 18.4954 4.13889 18.9216 4.17026C19.4614 4.20998 19.9803 4.39497 20.4235 4.70563C20.7734 4.95095 21.0029 5.23636 21.1546 5.4515C21.2829 5.63326 21.4103 5.84671 21.514 6.02029L22.0158 6.86003C22.1256 7.04345 22.2594 7.26713 22.3627 7.47527C22.4843 7.7203 22.6328 8.07474 22.6777 8.52067C22.7341 9.08222 22.6311 9.64831 22.3803 10.1539C22.1811 10.5554 21.9171 10.8347 21.7169 11.0212C21.5469 11.1795 21.3428 11.3417 21.1755 11.4746L20.5 12L21.1755 12.5254C21.3428 12.6584 21.5469 12.8205 21.7169 12.9789C21.9171 13.1653 22.1811 13.4446 22.3802 13.8461C22.631 14.3517 22.7341 14.9178 22.6776 15.4794C22.6328 15.9253 22.4842 16.2797 22.3626 16.5248C22.2593 16.7329 22.1255 16.9566 22.0158 17.14L21.5138 17.9799C21.4102 18.1535 21.2828 18.3668 21.1546 18.5485C21.0028 18.7637 20.7734 19.0491 20.4234 19.2944C19.9803 19.6051 19.4613 19.7901 18.9216 19.8298C18.4954 19.8612 18.1371 19.7852 17.8835 19.7146C17.6692 19.6549 17.4355 19.5703 17.2454 19.5014L16.3085 19.1623L16.306 19.1638C16.2715 19.1835 16.2369 19.2029 16.2021 19.2222L16.1993 19.2237L16.0577 20.0443C16.0228 20.2475 15.9799 20.4967 15.9246 20.7157C15.8592 20.9745 15.7454 21.3293 15.5007 21.6886C15.1915 22.1427 14.7635 22.5032 14.2634 22.7307C13.8678 22.9107 13.4989 22.9626 13.2327 22.983C13.0074 23.0002 12.7546 23.0001 12.5484 23H11.4516C11.2454 23.0001 10.9925 23.0002 10.7673 22.983C10.5011 22.9626 10.1322 22.9107 9.73655 22.7307C9.23648 22.5032 8.80849 22.1427 8.49926 21.6886C8.25461 21.3293 8.14077 20.9745 8.07542 20.7157C8.02011 20.4967 7.97723 20.2475 7.94225 20.0443L7.80068 19.2237L7.79791 19.2222C7.7631 19.2029 7.72845 19.1835 7.69396 19.1637L7.69142 19.1623L6.75458 19.5014C6.5645 19.5702 6.33078 19.6549 6.11651 19.7146C5.86288 19.7852 5.50463 19.8611 5.07841 19.8298C4.53866 19.7901 4.01971 19.6051 3.57654 19.2944C3.2266 19.0491 2.99714 18.7637 2.84539 18.5485C2.71718 18.3668 2.58974 18.1534 2.4861 17.9798L1.98418 17.14C1.87447 16.9566 1.74067 16.7329 1.63737 16.5248C1.51575 16.2797 1.36719 15.9253 1.32235 15.4794C1.26588 14.9178 1.36897 14.3517 1.61976 13.8461C1.81892 13.4446 2.08289 13.1653 2.28308 12.9789C2.45312 12.8205 2.65717 12.6584 2.82449 12.5254L3.47844 12.0054V11.9947L2.82445 11.4746C2.65712 11.3417 2.45308 11.1795 2.28304 11.0212C2.08285 10.8347 1.81888 10.5554 1.61972 10.1539C1.36893 9.64832 1.26584 9.08224 1.3223 8.52069C1.36714 8.07476 1.51571 7.72032 1.63732 7.47528C1.74062 7.26715 1.87443 7.04347 1.98414 6.86005L2.48605 6.02026C2.58969 5.84669 2.71714 5.63326 2.84534 5.45151C2.9971 5.23637 3.22655 4.95096 3.5765 4.70565C4.01966 4.39498 4.53862 4.20999 5.07837 4.17027C5.50458 4.1389 5.86284 4.21481 6.11646 4.28544C6.33072 4.34511 6.56444 4.4298 6.75451 4.49867L7.69141 4.83775L7.69394 4.8363C7.72844 4.8166 7.7631 4.79712 7.79791 4.77788L7.80068 4.77635L7.94225 3.95571C7.97723 3.7525 8.02011 3.50334 8.07542 3.2843C8.14077 3.0255 8.25461 2.67075 8.49926 2.31147C8.80849 1.85736 9.23648 1.49689 9.73655 1.26937C10.1322 1.08936 10.5011 1.03749 10.7673 1.01709ZM14.0938 4.3363C14.011 3.85634 13.9696 3.61637 13.8476 3.43717C13.7445 3.2858 13.6019 3.16564 13.4352 3.0898C13.2378 3.00002 12.9943 3.00002 12.5073 3.00002H11.4927C11.0057 3.00002 10.7621 3.00002 10.5648 3.0898C10.3981 3.16564 10.2555 3.2858 10.1524 3.43717C10.0304 3.61637 9.98895 3.85634 9.90615 4.3363L9.75012 5.24064C9.69445 5.56333 9.66662 5.72467 9.60765 5.84869C9.54975 5.97047 9.50241 6.03703 9.40636 6.13166C9.30853 6.22804 9.12753 6.3281 8.76554 6.52822C8.73884 6.54298 8.71227 6.55791 8.68582 6.57302C8.33956 6.77078 8.16643 6.86966 8.03785 6.90314C7.91158 6.93602 7.83293 6.94279 7.70289 6.93196C7.57049 6.92094 7.42216 6.86726 7.12551 6.7599L6.11194 6.39308C5.66271 6.2305 5.43809 6.14921 5.22515 6.16488C5.04524 6.17811 4.87225 6.23978 4.72453 6.34333C4.5497 6.46589 4.42715 6.67094 4.18206 7.08103L3.72269 7.84965C3.46394 8.2826 3.33456 8.49907 3.31227 8.72078C3.29345 8.90796 3.32781 9.09665 3.41141 9.26519C3.51042 9.4648 3.7078 9.62177 4.10256 9.9357L4.82745 10.5122C5.07927 10.7124 5.20518 10.8126 5.28411 10.9199C5.36944 11.036 5.40583 11.1114 5.44354 11.2504C5.47844 11.379 5.47844 11.586 5.47844 12C5.47844 12.414 5.47844 12.621 5.44354 12.7497C5.40582 12.8887 5.36944 12.9641 5.28413 13.0801C5.20518 13.1875 5.07927 13.2876 4.82743 13.4879L4.10261 14.0643C3.70785 14.3783 3.51047 14.5352 3.41145 14.7349C3.32785 14.9034 3.29349 15.0921 3.31231 15.2793C3.33461 15.501 3.46398 15.7174 3.72273 16.1504L4.1821 16.919C4.4272 17.3291 4.54974 17.5342 4.72457 17.6567C4.8723 17.7603 5.04528 17.8219 5.2252 17.8352C5.43813 17.8508 5.66275 17.7695 6.11199 17.607L7.12553 17.2402C7.42216 17.1328 7.5705 17.0791 7.7029 17.0681C7.83294 17.0573 7.91159 17.064 8.03786 17.0969C8.16644 17.1304 8.33956 17.2293 8.68582 17.427C8.71228 17.4421 8.73885 17.4571 8.76554 17.4718C9.12753 17.6719 9.30853 17.772 9.40635 17.8684C9.50241 17.963 9.54975 18.0296 9.60765 18.1514C9.66662 18.2754 9.69445 18.4367 9.75012 18.7594L9.90615 19.6637C9.98895 20.1437 10.0304 20.3837 10.1524 20.5629C10.2555 20.7142 10.3981 20.8344 10.5648 20.9102C10.7621 21 11.0057 21 11.4927 21H12.5073C12.9943 21 13.2378 21 13.4352 20.9102C13.6019 20.8344 13.7445 20.7142 13.8476 20.5629C13.9696 20.3837 14.011 20.1437 14.0938 19.6637L14.2499 18.7594C14.3055 18.4367 14.3334 18.2754 14.3923 18.1514C14.4502 18.0296 14.4976 17.963 14.5936 17.8684C14.6915 17.772 14.8725 17.6719 15.2344 17.4718C15.2611 17.4571 15.2877 17.4421 15.3141 17.427C15.6604 17.2293 15.8335 17.1304 15.9621 17.0969C16.0884 17.064 16.167 17.0573 16.2971 17.0681C16.4295 17.0791 16.5778 17.1328 16.8744 17.2402L17.888 17.607C18.3372 17.7696 18.5619 17.8509 18.7748 17.8352C18.9547 17.8219 19.1277 17.7603 19.2754 17.6567C19.4502 17.5342 19.5728 17.3291 19.8179 16.919L20.2773 16.1504C20.536 15.7175 20.6654 15.501 20.6877 15.2793C20.7065 15.0921 20.6721 14.9034 20.5885 14.7349C20.4895 14.5353 20.2921 14.3783 19.8974 14.0643L19.1726 13.4879C18.9207 13.2876 18.7948 13.1875 18.7159 13.0801C18.6306 12.9641 18.5942 12.8887 18.5564 12.7497C18.5215 12.6211 18.5215 12.414 18.5215 12C18.5215 11.586 18.5215 11.379 18.5564 11.2504C18.5942 11.1114 18.6306 11.036 18.7159 10.9199C18.7948 10.8126 18.9207 10.7124 19.1725 10.5122L19.8974 9.9357C20.2922 9.62176 20.4896 9.46479 20.5886 9.26517C20.6722 9.09664 20.7065 8.90795 20.6877 8.72076C20.6654 8.49906 20.5361 8.28259 20.2773 7.84964L19.8179 7.08102C19.5728 6.67093 19.4503 6.46588 19.2755 6.34332C19.1277 6.23977 18.9548 6.1781 18.7748 6.16486C18.5619 6.14919 18.3373 6.23048 17.888 6.39307L16.8745 6.75989C16.5778 6.86725 16.4295 6.92093 16.2971 6.93195C16.167 6.94278 16.0884 6.93601 15.9621 6.90313C15.8335 6.86965 15.6604 6.77077 15.3142 6.57302C15.2877 6.55791 15.2611 6.54298 15.2345 6.52822C14.8725 6.3281 14.6915 6.22804 14.5936 6.13166C14.4976 6.03703 14.4502 5.97047 14.3923 5.84869C14.3334 5.72467 14.3055 5.56332 14.2499 5.24064L14.0938 4.3363Z" fill="#0F1729"></path></svg>`);

    function IconGear($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$v();

    	attribute_effect(svg, () => ({
    		class: 'cv-modal-icon-svg',
    		fill: 'currentColor',
    		viewBox: '0 0 24 24',
    		xmlns: 'http://www.w3.org/2000/svg',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root_1$f = from_html(`<button type="button" class="cv-dismiss-btn svelte-122ln5" aria-label="Dismiss settings icon">✕</button>`);
    var root$u = from_html(`<div role="none"><button type="button" class="cv-settings-main-btn svelte-122ln5"><span class="cv-gear svelte-122ln5"><!></span></button> <button type="button" class="cv-collapse-btn svelte-122ln5" aria-label="Collapse settings icon"> </button> <!></div>`);

    const $$css$n = {
    	hash: 'svelte-122ln5',
    	code: '.cv-settings-main-btn.svelte-122ln5 {appearance:none;-webkit-appearance:none;background:transparent;border:none;padding:0;margin:0;flex:1;height:100%;width:100%;display:flex;align-items:inherit;justify-content:inherit;color:inherit;cursor:inherit;border-radius:inherit;}.cv-settings-main-btn.svelte-122ln5:focus-visible {outline:2px solid currentColor;outline-offset:-2px;}.cv-gear.svelte-122ln5 {display:flex;align-items:center;justify-content:center;width:18px;height:18px;}.cv-gear.svelte-122ln5 svg {width:18px;height:18px;}.cv-gear.svelte-122ln5 svg path {fill:currentColor;}.cv-settings-icon.svelte-122ln5 {position:fixed;background:var(--cv-icon-bg, rgba(255, 255, 255, 0.92));color:var(--cv-icon-color, rgba(0, 0, 0, 0.9));opacity:var(--cv-icon-opacity, 0.6);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:bold;cursor:grab; /* Default cursor */box-shadow:0 4px 12px rgba(0, 0, 0, 0.15);border:2px solid rgba(0, 0, 0, 0.2);z-index:9998;transition:width 0.3s ease,\n      background 0.3s ease,\n      color 0.3s ease,\n      opacity 0.3s ease,\n      border-color 0.3s ease,\n      transform 0.4s ease; /* transform transition drives the peek slide animation */touch-action:none; /* Crucial for touch dragging */font-family:-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif;box-sizing:border-box;user-select:none; /* Prevent text selection while dragging */}.cv-settings-icon.svelte-122ln5:active {cursor:grabbing;}.cv-settings-icon.svelte-122ln5:hover {background:var(--cv-icon-bg, rgba(255, 255, 255, 1));color:var(--cv-icon-color, rgba(0, 0, 0, 1));opacity:1;border-color:rgba(0, 0, 0, 0.3);}\n\n  /* Remove transform transition during drag so it tracks the pointer without lag */.cv-settings-icon.cv-is-dragging.svelte-122ln5 {transition:width 0.3s ease,\n      background 0.3s ease,\n      color 0.3s ease,\n      opacity 0.3s ease,\n      border-color 0.3s ease;}\n\n  /* When collapsed, dim the strip */.cv-settings-icon.cv-is-collapsed.svelte-122ln5 {opacity:0.5;}.cv-settings-icon.cv-is-collapsed.svelte-122ln5:hover {opacity:0.85;}.cv-collapse-btn.svelte-122ln5 {position:absolute;top:0;bottom:0;width:16px;display:flex;align-items:center;justify-content:center;background:rgba(0, 0, 0, 0.12);border:none;padding:0;cursor:pointer;font-size:13px;line-height:1;color:inherit;opacity:0.5;transition:opacity 0.15s ease, background 0.15s ease;}.cv-collapse-btn[data-side=\'left\'].svelte-122ln5 {left:0; /* outer = screen-edge side for left icons */border-radius:0 6px 6px 0;}.cv-collapse-btn[data-side=\'right\'].svelte-122ln5 {right:0; /* outer = screen-edge side for right icons */border-radius:6px 0 0 6px;}.cv-collapse-btn.svelte-122ln5:hover {opacity:1;background:rgba(0, 0, 0, 0.22);}\n\n  /* Hide collapse tab when already collapsed */.cv-settings-icon.cv-is-collapsed.svelte-122ln5 .cv-collapse-btn:where(.svelte-122ln5) {display:none;}.cv-dismiss-btn.svelte-122ln5 {position:absolute;bottom:calc(100% + 4px);width:16px;height:16px;display:flex;align-items:center;justify-content:center;background:rgba(0, 0, 0, 0.15);border:none;border-radius:50%;padding:0;cursor:pointer;font-size:9px;line-height:1;color:inherit;opacity:0.5;transition:opacity 0.15s ease, background 0.15s ease;}.cv-dismiss-btn[data-side=\'left\'].svelte-122ln5 {left:0;}.cv-dismiss-btn[data-side=\'right\'].svelte-122ln5 {right:0;}.cv-dismiss-btn.svelte-122ln5:hover {opacity:1;background:rgba(0, 0, 0, 0.25);}\n\n\n  /* Top-right */.cv-settings-top-right.svelte-122ln5 {top:20px;right:0;border-radius:18px 0 0 18px;padding-left:6px;justify-content:flex-start;border-right:none;}\n\n  /* Top-left */.cv-settings-top-left.svelte-122ln5 {top:20px;left:0;border-radius:0 18px 18px 0;padding-right:6px;justify-content:flex-end;border-left:none;}\n\n  /* Bottom-right */.cv-settings-bottom-right.svelte-122ln5 {bottom:20px;right:0;border-radius:18px 0 0 18px;padding-left:6px;justify-content:flex-start;border-right:none;}\n\n  /* Bottom-left */.cv-settings-bottom-left.svelte-122ln5 {bottom:20px;left:0;border-radius:0 18px 18px 0;padding-right:6px;justify-content:flex-end;border-left:none;}\n\n  /* Middle-left */.cv-settings-middle-left.svelte-122ln5 {top:50%;left:0;\n    /* transform handled by inline style now */border-radius:0 18px 18px 0;padding-right:6px;justify-content:flex-end;border-left:none;}\n\n  /* Middle-right */.cv-settings-middle-right.svelte-122ln5 {top:50%;right:0;\n    /* transform handled by inline style now */border-radius:18px 0 0 18px;padding-left:6px;justify-content:flex-start;border-right:none;}.cv-settings-top-right.svelte-122ln5,\n  .cv-settings-middle-right.svelte-122ln5,\n  .cv-settings-bottom-right.svelte-122ln5,\n  .cv-settings-top-left.svelte-122ln5,\n  .cv-settings-middle-left.svelte-122ln5,\n  .cv-settings-bottom-left.svelte-122ln5 {height:36px;width:36px;}.cv-settings-middle-right.svelte-122ln5:hover,\n  .cv-settings-top-right.svelte-122ln5:hover,\n  .cv-settings-bottom-right.svelte-122ln5:hover,\n  .cv-settings-top-left.svelte-122ln5:hover,\n  .cv-settings-middle-left.svelte-122ln5:hover,\n  .cv-settings-bottom-left.svelte-122ln5:hover {width:55px;}.cv-pulse {\n    animation: svelte-122ln5-pulse 2s infinite;}\n\n  @keyframes svelte-122ln5-pulse {\n    0% {\n      box-shadow:\n        0 4px 12px rgba(0, 0, 0, 0.15),\n        0 0 0 0 rgba(62, 132, 244, 0.7);\n    }\n    70% {\n      box-shadow:\n        0 4px 12px rgba(0, 0, 0, 0.15),\n        0 0 0 10px rgba(62, 132, 244, 0);\n    }\n    100% {\n      box-shadow:\n        0 4px 12px rgba(0, 0, 0, 0.15),\n        0 0 0 0 rgba(62, 132, 244, 0);\n    }\n  }\n\n  @media (max-width: 768px) {.cv-settings-top-right.svelte-122ln5,\n    .cv-settings-top-left.svelte-122ln5 {top:10px;}.cv-settings-bottom-right.svelte-122ln5,\n    .cv-settings-bottom-left.svelte-122ln5 {bottom:10px;}.cv-settings-top-right.svelte-122ln5,\n    .cv-settings-bottom-right.svelte-122ln5,\n    .cv-settings-middle-right.svelte-122ln5 {right:0;}.cv-settings-top-left.svelte-122ln5,\n    .cv-settings-bottom-left.svelte-122ln5,\n    .cv-settings-middle-left.svelte-122ln5 {left:0;}.cv-settings-icon.svelte-122ln5 {width:60px;height:32px;}.cv-settings-icon.svelte-122ln5:hover {width:75px;}\n  }\n\n  @media print {.cv-settings-icon.svelte-122ln5 {display:none !important;}\n  }'
    };

    function SettingsIcon($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$n);

    	/* eslint-disable @typescript-eslint/no-explicit-any */
    	const iconSettingsStore = getContext(ICON_SETTINGS_CTX);

    	let position = prop($$props, 'position', 3, 'middle-left'),
    		title = prop($$props, 'title', 3, 'Customize View'),
    		pulse = prop($$props, 'pulse', 3, false),
    		onclick = prop($$props, 'onclick', 3, undefined),
    		iconColor = prop($$props, 'iconColor', 3, undefined),
    		backgroundColor = prop($$props, 'backgroundColor', 3, undefined),
    		opacity = prop($$props, 'opacity', 3, undefined),
    		scale = prop($$props, 'scale', 3, undefined);

    	// Constants
    	const VIEWPORT_MARGIN = 10;

    	const DRAG_THRESHOLD = 5;
    	const PEEK_WIDTH = 20;
    	let isDragging = state(false);
    	let dragStartY = 0;
    	let dragStartOffset = 0;
    	let dragOffset = state(0);
    	const currentOffset = user_derived(() => get(isDragging) ? get(dragOffset) : iconSettingsStore.offset);
    	let suppressClick = false;
    	const isRight = user_derived(() => position()?.includes('right') ?? false);
    	const isCollapsed = user_derived(() => iconSettingsStore.isCollapsed);
    	let minOffset = -Infinity;
    	let maxOffset = Infinity;
    	let settingsIconElement;

    	onMount(() => {
    		// Global event listeners to handle drag leaving the element
    		window.addEventListener('mousemove', handleDragMove);

    		window.addEventListener('mouseup', endDrag);
    		window.addEventListener('touchmove', handleDragMove, { passive: false });
    		window.addEventListener('touchend', endDrag);
    		window.addEventListener('resize', constrainPositionToViewport);

    		// Initial check — defer to ensure layout is ready
    		constCheckTimer = setTimeout(constrainPositionToViewport, 0);

    		return () => {
    			window.removeEventListener('mousemove', handleDragMove);
    			window.removeEventListener('mouseup', endDrag);
    			window.removeEventListener('touchmove', handleDragMove);
    			window.removeEventListener('touchend', endDrag);
    			window.removeEventListener('resize', constrainPositionToViewport);
    			clearTimeout(constCheckTimer);
    		};
    	});

    	let constCheckTimer;

    	function handleCollapse(e) {
    		e.stopPropagation(); // don't bubble to the icon's onclick
    		iconSettingsStore.setCollapsed(true);
    	}

    	function constrainPositionToViewport() {
    		if (!settingsIconElement) return;

    		const rect = settingsIconElement.getBoundingClientRect();

    		// Calculate "zero" position (where element would be if offset was 0)
    		const zeroTop = rect.top - get(currentOffset);

    		const elementHeight = rect.height;
    		const min = VIEWPORT_MARGIN - zeroTop;
    		const max = window.innerHeight - VIEWPORT_MARGIN - zeroTop - elementHeight;

    		// Refresh boundaries during drag so handleDragMove respects the new window size
    		if (get(isDragging)) {
    			minOffset = min;
    			maxOffset = max;
    		}

    		// Clamp
    		const clamped = Math.max(min, Math.min(max, get(currentOffset)));

    		if (clamped !== get(currentOffset)) {
    			if (get(isDragging)) {
    				set(dragOffset, clamped, true);
    			} else {
    				iconSettingsStore.setOffset(clamped);
    			}
    		}
    	}

    	function onMouseDown(e) {
    		if (e.button !== 0) return;
    		if (get(isCollapsed)) return; // strip click expands via onClick; don't start drag

    		startDrag(e.clientY);
    	}

    	function onTouchStart(e) {
    		if (e.touches.length !== 1) return;

    		// First tap on a peeking icon just reveals it without starting a drag
    		if (get(isCollapsed)) {
    			iconSettingsStore.setCollapsed(false);
    			e.preventDefault();

    			return;
    		}

    		startDrag(e.touches[0].clientY);
    	}

    	function startDrag(clientY) {
    		iconSettingsStore.setCollapsed(false);
    		set(isDragging, true);
    		dragStartY = clientY;
    		dragStartOffset = iconSettingsStore.offset;
    		set(dragOffset, dragStartOffset, true);
    		suppressClick = false;
    		calculateDragConstraints();
    	}

    	function calculateDragConstraints() {
    		if (!settingsIconElement) return;

    		const rect = settingsIconElement.getBoundingClientRect();
    		const zeroTop = rect.top - get(currentOffset);
    		const elementHeight = rect.height;

    		// We want the element to stay within [VIEWPORT_MARGIN, window.innerHeight - VIEWPORT_MARGIN]
    		minOffset = VIEWPORT_MARGIN - zeroTop;

    		maxOffset = window.innerHeight - VIEWPORT_MARGIN - zeroTop - elementHeight;
    	}

    	function handleDragMove(e) {
    		if (!get(isDragging)) return;

    		const clientY = getClientY(e);

    		if (clientY === null) return;

    		const deltaY = clientY - dragStartY;
    		const rawOffset = dragStartOffset + deltaY;

    		// Clamp the offset to keep element on screen
    		set(dragOffset, Math.max(minOffset, Math.min(maxOffset, rawOffset)), true);

    		if (Math.abs(deltaY) > DRAG_THRESHOLD) {
    			suppressClick = true;
    		}
    	}

    	function getClientY(e) {
    		if (window.TouchEvent && e instanceof TouchEvent && e.touches.length > 0) {
    			return e.touches[0].clientY;
    		} else if (e instanceof MouseEvent) {
    			return e.clientY;
    		}

    		return null;
    	}

    	function endDrag() {
    		if (!get(isDragging)) return;

    		set(isDragging, false);
    		iconSettingsStore.setOffset(get(dragOffset));
    	}

    	function handleMainClick(e) {
    		if (get(isCollapsed)) {
    			iconSettingsStore.setCollapsed(false);

    			return;
    		}

    		if (suppressClick) {
    			e.stopImmediatePropagation();
    			e.preventDefault();
    			suppressClick = false;

    			return;
    		}

    		if (onclick()) onclick()();
    	}

    	// Helper for transforms
    	function getTransform(pos, offset, s, collapsed) {
    		const isMiddle = pos && pos.includes('middle');
    		const isRight = pos && pos.includes('right');
    		let t = '';

    		if (collapsed) {
    			t = isRight
    				? `translateX(calc(100% - ${PEEK_WIDTH}px)) `
    				: `translateX(calc(-100% + ${PEEK_WIDTH}px)) `;
    		}

    		if (isMiddle) {
    			t += `translateY(calc(-50% + ${offset}px))`;
    		} else {
    			t += `translateY(${offset}px)`;
    		}

    		if (s && s !== 1) {
    			t += ` scale(${s})`;
    		}

    		return t;
    	}

    	var div = root$u();
    	let classes;

    	div.__mousedown = onMouseDown;
    	div.__touchstart = onTouchStart;

    	let styles;
    	var button = child(div);

    	button.__click = handleMainClick;

    	var span = child(button);
    	var node = child(span);

    	IconGear(node, {});
    	reset(span);
    	reset(button);

    	var button_1 = sibling(button, 2);

    	button_1.__click = handleCollapse;
    	button_1.__mousedown = (e) => e.stopPropagation();
    	button_1.__touchstart = (e) => e.stopPropagation();
    	button_1.__pointerdown = (e) => e.stopPropagation();

    	var text = child(button_1, true);

    	reset(button_1);

    	var node_1 = sibling(button_1, 2);

    	{
    		var consequent = ($$anchor) => {
    			var button_2 = root_1$f();

    			button_2.__click = (e) => {
    				e.stopPropagation();
    				iconSettingsStore.dismiss();
    			};

    			button_2.__mousedown = (e) => e.stopPropagation();
    			button_2.__touchstart = (e) => e.stopPropagation();
    			button_2.__pointerdown = (e) => e.stopPropagation();
    			template_effect(() => set_attribute(button_2, 'data-side', get(isRight) ? 'left' : 'right'));
    			append($$anchor, button_2);
    		};

    		if_block(node_1, ($$render) => {
    			if (get(isCollapsed)) $$render(consequent);
    		});
    	}

    	reset(div);
    	bind_this(div, ($$value) => settingsIconElement = $$value, () => settingsIconElement);

    	template_effect(
    		($0) => {
    			classes = set_class(div, 1, `cv-settings-icon cv-settings-${position() ?? ''} ${pulse() ? 'cv-pulse' : ''}`, 'svelte-122ln5', classes, {
    				'cv-is-dragging': get(isDragging),
    				'cv-is-collapsed': get(isCollapsed)
    			});

    			styles = set_style(div, '', styles, $0);
    			set_attribute(button, 'title', title());
    			set_attribute(button, 'aria-label', get(isCollapsed) ? 'Expand settings' : 'Open Custom Views Settings');
    			set_attribute(button_1, 'data-side', get(isRight) ? 'right' : 'left');
    			set_text(text, get(isRight) ? '›' : '‹');
    		},
    		[
    			() => ({
    				'--cv-icon-color': iconColor(),
    				'--cv-icon-bg': backgroundColor(),
    				'--cv-icon-opacity': opacity(),
    				transform: getTransform(position(), get(currentOffset), scale(), get(isCollapsed)),
    				cursor: get(isDragging) ? 'grabbing' : get(isCollapsed) ? 'pointer' : 'grab'
    			})
    		]
    	);

    	append($$anchor, div);
    	pop();
    }

    delegate(['mousedown', 'touchstart', 'click', 'pointerdown']);

    /** @import { BlurParams, CrossfadeParams, DrawParams, FadeParams, FlyParams, ScaleParams, SlideParams, TransitionConfig } from './public' */


    /** @param {number} x */
    const linear = (x) => x;

    /** @param {number} t */
    function cubic_out(t) {
    	const f = t - 1.0;
    	return f * f * f + 1.0;
    }

    /** @param {number | string} value
     * @returns {[number, string]}
     */
    function split_css_unit(value) {
    	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    	return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
    }

    /**
     * Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.
     *
     * @param {Element} node
     * @param {FadeParams} [params]
     * @returns {TransitionConfig}
     */
    function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
    	const o = +getComputedStyle(node).opacity;
    	return {
    		delay,
    		duration,
    		easing,
    		css: (t) => `opacity: ${t * o}`
    	};
    }

    /**
     * Animates the x and y positions and the opacity of an element. `in` transitions animate from the provided values, passed as parameters to the element's default values. `out` transitions animate from the element's default values to the provided values.
     *
     * @param {Element} node
     * @param {FlyParams} [params]
     * @returns {TransitionConfig}
     */
    function fly(
    	node,
    	{ delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}
    ) {
    	const style = getComputedStyle(node);
    	const target_opacity = +style.opacity;
    	const transform = style.transform === 'none' ? '' : style.transform;
    	const od = target_opacity * (1 - opacity);
    	const [x_value, x_unit] = split_css_unit(x);
    	const [y_value, y_unit] = split_css_unit(y);
    	return {
    		delay,
    		duration,
    		easing,
    		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
    	};
    }

    /**
     * Slides an element in and out.
     *
     * @param {Element} node
     * @param {SlideParams} [params]
     * @returns {TransitionConfig}
     */
    function slide(node, { delay = 0, duration = 400, easing = cubic_out, axis = 'y' } = {}) {
    	const style = getComputedStyle(node);

    	const opacity = +style.opacity;
    	const primary_property = axis === 'y' ? 'height' : 'width';
    	const primary_property_value = parseFloat(style[primary_property]);
    	const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
    	const capitalized_secondary_properties = secondary_properties.map(
    		(e) => /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */ (`${e[0].toUpperCase()}${e.slice(1)}`)
    	);
    	const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
    	const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
    	const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
    	const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
    	const border_width_start_value = parseFloat(
    		style[`border${capitalized_secondary_properties[0]}Width`]
    	);
    	const border_width_end_value = parseFloat(
    		style[`border${capitalized_secondary_properties[1]}Width`]
    	);
    	return {
    		delay,
    		duration,
    		easing,
    		css: (t) =>
    			'overflow: hidden;' +
    			`opacity: ${Math.min(t * 20, 1) * opacity};` +
    			`${primary_property}: ${t * primary_property_value}px;` +
    			`padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
    			`padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
    			`margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
    			`margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
    			`border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
    			`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;` +
    			`min-${primary_property}: 0`
    	};
    }

    /**
     * Animates the opacity and scale of an element. `in` transitions animate from the provided values, passed as parameters, to an element's current (default) values. `out` transitions animate from an element's default values to the provided values.
     *
     * @param {Element} node
     * @param {ScaleParams} [params]
     * @returns {TransitionConfig}
     */
    function scale(
    	node,
    	{ delay = 0, duration = 400, easing = cubic_out, start = 0, opacity = 0 } = {}
    ) {
    	const style = getComputedStyle(node);
    	const target_opacity = +style.opacity;
    	const transform = style.transform === 'none' ? '' : style.transform;
    	const sd = 1 - start;
    	const od = target_opacity * (1 - opacity);
    	return {
    		delay,
    		duration,
    		easing,
    		css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
    	};
    }

    var root$t = from_svg(`<svg><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`);

    function IconClose($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$t();

    	attribute_effect(svg, () => ({
    		class: 'cv-modal-close-icon',
    		fill: 'currentColor',
    		height: '20px',
    		viewBox: '0 0 256 256',
    		width: '20px',
    		xmlns: 'http://www.w3.org/2000/svg',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$s = from_svg(`<svg><rect y="34.5001" width="250" height="146" rx="4" stroke="currentColor" stroke-width="10" fill="none"></rect><line x1="27" y1="62.0001" x2="77" y2="62.0001" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="77.8888" x2="77" y2="77.8888" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="97.4454" x2="221" y2="97.4454" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="114.555" x2="221" y2="114.555" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="132.889" x2="221" y2="132.889" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="150" x2="221" y2="150" stroke="currentColor" stroke-width="5"></line><path d="M245 37.0001V39.5001H250V37.0001H247.5H245ZM250 13.0001C250 11.6194 248.881 10.5001C247.5 10.5001C246.119 10.5001 245 11.6194 245 13.0001H247.5H250ZM250 31.0001C250 29.6194 248.881 28.5001C247.5 28.5001C246.119 28.5001 245 29.6194 245 31.0001H247.5H250ZM245 19.0001C245 20.3808 246.119 21.5001C247.5 21.5001C248.881 21.5001 250 20.3808 250 19.0001H247.5H245ZM247.5 37.0001H250V31.0001H247.5H245V37.0001H247.5ZM247.5 19.0001H250V13.0001H247.5H245V19.0001H247.5Z" fill="currentColor"></path><line x1="204.09" y1="36.6095" x2="181.698" y2="10.0228" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></line><path d="M125 9.50012L181 9.50012" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path><path d="M144.305 35.2579L120.095 6.56679" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path><path d="M120 6.50037L64 6.50037" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path><path d="M87.1957 36.1024L59 2.50008" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path><path d="M59 2.50037L3 2.50037" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path><path d="M2.5 38.5001L2.5 3.00012" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path><path d="M185 12.5001L247 12.5001" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 10"></path></svg>`);

    function IconNavDashed($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$s();

    	attribute_effect(svg, () => ({
    		xmlns: 'http://www.w3.org/2000/svg',
    		width: '250',
    		height: '181',
    		viewBox: '0 0 250 181',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$r = from_svg(`<svg><rect y="34.5001" width="250" height="146" rx="4" stroke="currentColor" stroke-width="10" fill="none"></rect><line x1="27" y1="62.0001" x2="77" y2="62.0001" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="77.8888" x2="77" y2="77.8888" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="97.4454" x2="221" y2="97.4454" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="114.555" x2="221" y2="114.555" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="132.889" x2="221" y2="132.889" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="150" x2="221" y2="150" stroke="currentColor" stroke-width="5"></line><line x1="247.5" y1="43.0001" x2="247.5" y2="13.0001" stroke="currentColor" stroke-width="5" stroke-linecap="round"></line><path d="M185 12.5001L247 12.5001" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><line x1="204.09" y1="36.6095" x2="181.698" y2="10.0228" stroke="currentColor" stroke-width="5" stroke-linecap="round"></line><path d="M125 9.50012L181 9.50012" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><path d="M144.305 35.2579L120.095 6.56679" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><path d="M120 6.50037L64 6.50037" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><path d="M87.1957 36.1024L59 2.50008" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><path d="M59 2.50037L3 2.50037" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><path d="M2.5 38.5001L2.5 3.00012" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path></svg>`);

    function IconNavHeadingOn($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$r();

    	attribute_effect(svg, () => ({
    		xmlns: 'http://www.w3.org/2000/svg',
    		width: '250',
    		height: '181',
    		viewBox: '0 0 250 181',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$q = from_svg(`<svg><rect y="34.5001" width="250" height="146" rx="4" stroke="currentColor" stroke-width="10" fill="none"></rect><line x1="27" y1="62" x2="77" y2="62" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="77.8887" x2="77" y2="77.8887" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="97.4453" x2="221" y2="97.4453" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="114.555" x2="221" y2="114.555" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="132.889" x2="221" y2="132.889" stroke="currentColor" stroke-width="5"></line><line x1="27" y1="150" x2="221" y2="150" stroke="currentColor" stroke-width="5"></line></svg>`);

    function IconNavHeadingOff($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$q();

    	attribute_effect(svg, () => ({
    		xmlns: 'http://www.w3.org/2000/svg',
    		width: '250',
    		height: '181',
    		viewBox: '0 0 250 181',
    		fill: 'currentColor',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$p = from_svg(`<svg><path fill="currentColor" d="M18 8h-2a1 1 0 0 0 0 2h2v8H6v-8h2a1 1 0 0 0 0-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z"></path><path fill="currentColor" d="M11 6.41V12a1 1 0 0 0 2 0V6.41l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-3-3a1 1 0 0 0-1.42 0l-3 3a1 1 0 1 0 1.42 1.42L11 6.41z"></path></svg>`);

    function IconShare($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$p();

    	attribute_effect(svg, () => ({
    		xmlns: 'http://www.w3.org/2000/svg',
    		width: '24',
    		height: '24',
    		viewBox: '0 0 24 24',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$o = from_svg(`<svg><g id="surface1"><path d="M 11.273438 0 L 2.546875 0 C 1.746094 0 1.089844 0.613281 1.089844 1.363281 L 1.089844 10.910156 L 2.546875 10.910156 L 2.546875 1.363281 L 11.273438 1.363281 Z M 13.453125 2.726562 L 5.453125 2.726562 C 4.65625 2.726562 4 3.339844 4 4.089844 L 4 13.636719 C 4 14.386719 4.65625 15 5.453125 15 L 13.453125 15 C 14.253906 15 14.910156 14.386719 14.910156 13.636719 L 14.910156 4.089844 C 14.910156 3.339844 14.253906 2.726562 13.453125 2.726562 Z M 13.453125 13.636719 L 5.453125 13.636719 L 5.453125 4.089844 L 13.453125 4.089844 Z M 13.453125 13.636719 "></path></g></svg>`);

    function IconCopy($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$o();

    	attribute_effect(svg, () => ({
    		xmlns: 'http://www.w3.org/2000/svg',
    		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    		width: '18',
    		height: '18',
    		viewBox: '0 0 18 18',
    		version: '1.1',
    		fill: 'currentColor',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$n = from_svg(`<svg><path d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z"></path></svg>`);

    function IconCheck($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$n();

    	attribute_effect(svg, () => ({
    		xmlns: 'http://www.w3.org/2000/svg',
    		width: '18',
    		height: '18',
    		viewBox: '2 2 22 22',
    		fill: 'currentColor',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    const PARAM_SHOW_TOGGLE = 't-show';
    const PARAM_PEEK_TOGGLE = 't-peek';
    const PARAM_HIDE_TOGGLE = 't-hide';
    const PARAM_TABS = 'tabs';
    const PARAM_PH = 'ph';
    const PARAM_CV_SHOW = 'cv-show';
    const PARAM_CV_HIDE = 'cv-hide';
    const PARAM_CV_HIGHLIGHT = 'cv-highlight';
    /** Parameters owned by URLStateManager */
    const MANAGED_PARAMS = [PARAM_SHOW_TOGGLE, PARAM_PEEK_TOGGLE, PARAM_HIDE_TOGGLE, PARAM_TABS, PARAM_PH];

    /**
     * Encodes a list of IDs into a comma-separated query-safe string.
     *
     * Each ID is individually encoded with `encodeURIComponent` so that any commas
     * or special characters *within* an ID are escaped (e.g. `%2C`).
     */
    function encodeList(items) {
        return items.map(encodeURIComponent).join(',');
    }
    /**
     * Encodes key:value pairs into a comma-separated query-safe string.
     *
     * Keys and values are individually encoded so that the structural separators
     * (`:` between key/value, `,` between pairs) remain unambiguous.
     */
    function encodePairs(obj) {
        return Object.entries(obj)
            .map(([k, v]) => `${encodeURIComponent(k)}:${encodeURIComponent(v)}`)
            .join(',');
    }
    /**
     * Extracts the raw (un-decoded) value of a query parameter from a search string.
     *
     * We avoid `URLSearchParams.get()` here because it decodes the entire value,
     * converting our content-level `%2C` back into literal commas and making them
     * indistinguishable from the structural commas that separate list items.
     */
    function getRawParam(search, paramName) {
        const escaped = paramName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const match = new RegExp(`[?&]${escaped}=([^&]*)`).exec(search);
        return match?.[1] ?? null;
    }
    /**
     * Splits a raw query parameter value by structural commas and decodes each item.
     *
     * Because values were encoded with `encodeURIComponent` before joining with `,`,
     * splitting on literal commas is safe — any commas inside values appear as `%2C`.
     */
    function splitAndDecode(search, paramName) {
        const raw = getRawParam(search, paramName);
        if (!raw)
            return [];
        return raw
            .split(',')
            .map((item) => {
            try {
                // application/x-www-form-urlencoded often uses + for spaces
                return decodeURIComponent(item.replace(/\+/g, '%20'));
            }
            catch {
                console.warn(`[CustardUI] URLStateManager: Failed to decode ${paramName} item: ${item}`);
                return item;
            }
        })
            .filter(Boolean);
    }
    /**
     * Parses `key:value` pairs from a raw comma-delimited list into a Record.
     * Entries without a colon, or with empty keys, are silently dropped.
     */
    function decodePairs(search, paramName) {
        const pairs = splitAndDecode(search, paramName);
        const result = {};
        for (const pair of pairs) {
            const colonIdx = pair.indexOf(':');
            if (colonIdx > 0) {
                const key = pair.slice(0, colonIdx);
                const value = pair.slice(colonIdx + 1);
                if (key)
                    result[key] = value;
            }
        }
        return result;
    }

    /**
     * Parses toggle visibility state from the current URL search string.
     * Returns partial state containing only the toggle fields that are present.
     */
    function parseTogglesFromURL(search) {
        const partial = {};
        const showIds = splitAndDecode(search, PARAM_SHOW_TOGGLE);
        if (showIds.length > 0)
            partial.shownToggles = showIds;
        const peekIds = splitAndDecode(search, PARAM_PEEK_TOGGLE);
        if (peekIds.length > 0)
            partial.peekToggles = peekIds;
        const hideIds = splitAndDecode(search, PARAM_HIDE_TOGGLE);
        if (hideIds.length > 0)
            partial.hiddenToggles = hideIds;
        return partial;
    }
    /**
     * Parses tab group selections from the current URL search string.
     * Returns partial state containing the `tabs` record, or empty object if absent.
     */
    function parseTabsFromURL(search) {
        const tabs = decodePairs(search, PARAM_TABS);
        return Object.keys(tabs).length > 0 ? { tabs } : {};
    }
    /**
     * Parses placeholder values from the current URL search string.
     * Returns partial state containing the `placeholders` record, or empty object if absent.
     */
    function parsePlaceholdersFromURL(search) {
        const placeholders = decodePairs(search, PARAM_PH);
        return Object.keys(placeholders).length > 0 ? { placeholders } : {};
    }

    /**
     * Strips placeholder entries that should not appear in shareable URLs:
     * - Tab-group-derived placeholders (source: 'tabgroup') — implied by ?tabs=
     * - Adaptation-only placeholders (adaptationPlaceholder: true) — author-controlled, not shareable
     */
    function stripNonShareablePlaceholders(placeholders, config) {
        const shareable = {};
        for (const [key, value] of Object.entries(placeholders)) {
            const definition = placeholderRegistryStore.get(key) || config.placeholders?.find(p => p.name === key);
            if (!definition)
                continue; // skip unknown keys (injection prevention)
            // Note: PlaceholderDefinition from registry has 'source', but config doesn't.
            // That's fine as 'tabgroup' placeholders are mostly a runtime artifact.
            if ('source' in definition && definition.source === 'tabgroup')
                continue; // implied by ?tabs=
            if ('adaptationPlaceholder' in definition && definition.adaptationPlaceholder)
                continue; // author-only
            shareable[key] = value;
        }
        return shareable;
    }
    /**
     * Filters the current toggle state (shown, peeked) and derives the explicit
     * hidden list for the shareable URL.
     */
    function getShareableToggles(currentState, pageTogglesSet, config) {
        const currentShown = currentState.shownToggles ?? [];
        const currentPeek = currentState.peekToggles ?? [];
        const shouldInclude = (id) => {
            const toggleConfig = config.toggles?.find(t => t.toggleId === id);
            // Case 1: Not found in configuration
            if (!toggleConfig) {
                return pageTogglesSet.has(id);
            }
            // Case 2: Configured as Global
            if (!toggleConfig.isLocal) {
                return true;
            }
            // Case 3: Configured as Local
            return pageTogglesSet.has(id);
        };
        const shareableShown = currentShown.filter(shouldInclude);
        const shareablePeek = currentPeek.filter(shouldInclude);
        const shownSet = new Set(shareableShown);
        const peekSet = new Set(shareablePeek);
        const absoluteHide = [];
        const relevantToggles = new Set(pageTogglesSet);
        for (const t of (config.toggles ?? [])) {
            if (!t.isLocal)
                relevantToggles.add(t.toggleId);
        }
        for (const id of relevantToggles) {
            if (!shownSet.has(id) && !peekSet.has(id)) {
                absoluteHide.push(id);
            }
        }
        const result = {};
        if (shareableShown.length > 0)
            result.shownToggles = shareableShown;
        if (shareablePeek.length > 0)
            result.peekToggles = shareablePeek;
        if (absoluteHide.length > 0)
            result.hiddenToggles = absoluteHide;
        return result;
    }
    /**
     * Filters the active tab selections for the shareable URL.
     */
    function getShareableTabs(currentState, pageTabGroupsSet, config) {
        if (!currentState.tabs)
            return {};
        const shareableTabs = {};
        for (const [groupId, tabId] of Object.entries(currentState.tabs)) {
            const groupConfig = config.tabGroups?.find(g => g.groupId === groupId);
            let shouldInclude = false;
            if (!groupConfig) {
                // Unknown group: Only include if explicitly detected on page to prevent injection
                shouldInclude = pageTabGroupsSet.has(groupId);
            }
            else if (!groupConfig.isLocal) {
                // Global group: Always include
                shouldInclude = true;
            }
            else {
                // Local group: Only include if detected on page
                shouldInclude = pageTabGroupsSet.has(groupId);
            }
            if (shouldInclude) {
                shareableTabs[groupId] = tabId;
            }
        }
        return Object.keys(shareableTabs).length > 0 ? { tabs: shareableTabs } : {};
    }
    /**
     * Filters the custom placeholder values for the shareable URL.
     */
    function getShareablePlaceholders(currentState, pagePlaceholdersSet, config) {
        if (!currentState.placeholders)
            return {};
        const strippedPlaceholders = stripNonShareablePlaceholders(currentState.placeholders, config);
        const shareablePlaceholders = {};
        for (const [key, value] of Object.entries(strippedPlaceholders)) {
            const definition = placeholderRegistryStore.get(key) || config.placeholders?.find(p => p.name === key);
            let shouldInclude = false;
            if (!definition) {
                // Note: definition is guaranteed to exist here due to stripNonShareablePlaceholders,
                // but we handle it explicitly for clarity and future-proofing.
                shouldInclude = pagePlaceholdersSet.has(key);
            }
            else if (!definition.isLocal) {
                // Global placeholder: Always include
                shouldInclude = true;
            }
            else {
                // Local placeholder: Only include if detected on page
                shouldInclude = pagePlaceholdersSet.has(key);
            }
            if (shouldInclude) {
                shareablePlaceholders[key] = value;
            }
        }
        return Object.keys(shareablePlaceholders).length > 0 ? { placeholders: shareablePlaceholders } : {};
    }
    /**
     * Computes a shareable state object from the current state.
     *
     * Toggles, tabs, and placeholders marked as `isLocal: true` are only included
     * if they are present on the current page.
     *
     * Global elements (not `isLocal`) are always included regardless of whether
     * they are detected on the current page.
     *
     * Every toggle known to the page (or global) is explicitly encoded as shown,
     * peeked, or hidden, so the recipient's view exactly matches the sender's
     * regardless of their local settings.
     *
     * Tab-group-derived placeholders are omitted — the `?tabs=` param is their source of truth.
     *
     * @param currentState The current application state.
     * @param elementsOnCurrentPage The active elements detected on the current page.
     * @param config The application configuration.
     */
    function computeShareableSettingState(currentState, elementsOnCurrentPage, config) {
        const pageTogglesSet = new Set(elementsOnCurrentPage.toggles);
        const pageTabGroupsSet = new Set(elementsOnCurrentPage.tabGroups);
        const pagePlaceholdersSet = new Set(elementsOnCurrentPage.placeholders);
        return {
            ...getShareableToggles(currentState, pageTogglesSet, config),
            ...getShareableTabs(currentState, pageTabGroupsSet, config),
            ...getShareablePlaceholders(currentState, pagePlaceholdersSet, config),
        };
    }

    /**
     * Builds the query string fragment for the managed URL parameters from a state object.
     *
     * We construct this string manually (instead of using `URLSearchParams.set()`)
     * to avoid double-encoding. `URLSearchParams.set()` would encode our already-encoded
     * values a second time (e.g. `%2C` → `%252C`), requiring a hacky decode step.
     *
     * By building the string directly, each value is encoded exactly once,
     * and structural separators (`,` `:`) remain as literal characters in the URL.
     */
    function generateManagedQuery(state) {
        const parts = [];
        if (state.shownToggles && state.shownToggles.length > 0) {
            parts.push(`${PARAM_SHOW_TOGGLE}=${encodeList(state.shownToggles)}`);
        }
        if (state.peekToggles && state.peekToggles.length > 0) {
            parts.push(`${PARAM_PEEK_TOGGLE}=${encodeList(state.peekToggles)}`);
        }
        if (state.hiddenToggles && state.hiddenToggles.length > 0) {
            parts.push(`${PARAM_HIDE_TOGGLE}=${encodeList(state.hiddenToggles)}`);
        }
        if (state.tabs && Object.keys(state.tabs).length > 0) {
            parts.push(`${PARAM_TABS}=${encodePairs(state.tabs)}`);
        }
        if (state.placeholders && Object.keys(state.placeholders).length > 0) {
            parts.push(`${PARAM_PH}=${encodePairs(state.placeholders)}`);
        }
        return parts.join('&');
    }
    /**
     * Builds a full absolute URL string from the base URL and managed params.
     */
    function buildFullUrl(url, managedQuery) {
        const preservedSearch = url.searchParams.toString();
        const search = [preservedSearch, managedQuery].filter(Boolean).join('&');
        return url.origin + url.pathname + (search ? `?${search}` : '') + (url.hash || '');
    }

    /**
     * URL State Manager for CustardUI.
     * Handles encoding/decoding of view states as human-readable URL parameters.
     *
     * URL Schema (defined in url-constants.ts):
     *   ?t-show=A,B        — toggle IDs to explicitly show
     *   ?t-peek=C          — toggle IDs to explicitly peek
     *   ?t-hide=D          — toggle IDs to explicitly hide
     *   ?tabs=g1:t1,g2:t2  — tab group selections (groupId:tabId pairs)
     *   ?ph=key:val        — placeholder values (key:encodedValue pairs)
     *
     * Precedence model (applied by ActiveStateStore, not here):
     * - Persisted state is loaded first as a base.
     * - URL parameters act as a sparse override on top of persisted state.
     *   Only toggles/tabs/placeholders mentioned in the URL are affected.
     * - Tab-group-derived placeholders are always re-derived from the active tab,
     *   so the `?tabs=` param is the sole source of truth for those values.
     *
     * `parseURL` is used on page load to read inbound link state.
     * `generateShareableURL` is used to produce a link for the clipboard.
     *
     * Focus params (cv-show, cv-hide, cv-highlight) remain owned by FocusService.
     */
    class URLStateManager {
        /**
         * Parses the current page URL into a sparse delta state object.
         * Only fields present in the URL are populated; the rest are omitted.
         * Returns null if none of the managed parameters are present.
         */
        static parseURL() {
            const urlParams = new URLSearchParams(window.location.search);
            const hasAny = MANAGED_PARAMS.some((p) => urlParams.has(p));
            if (!hasAny)
                return null;
            const search = window.location.search;
            return {
                ...parseTogglesFromURL(search),
                ...parseTabsFromURL(search),
                ...parsePlaceholdersFromURL(search),
            };
        }
        /**
         * Generates a shareable URL that encodes the current state based on Config and State.
         *
         * @param currentState The full application state to encode.
         * @param config The application configuration.
         * @param elementsOnCurrentPage The active elements detected on the current page.
         */
        static generateShareableURL(currentState, config, elementsOnCurrentPage = { toggles: [], tabGroups: [], placeholders: [] }) {
            const url = new URL(window.location.href);
            for (const param of MANAGED_PARAMS) {
                url.searchParams.delete(param);
            }
            let managedQuery = '';
            if (currentState) {
                const shareable = computeShareableSettingState(currentState, elementsOnCurrentPage, config);
                managedQuery = generateManagedQuery(shareable);
            }
            return buildFullUrl(url, managedQuery);
        }
        /**
         * Clears all managed parameters from the current browser URL.
         * This is called after parsing so that shared configurations don't stick around in
         * the address bar when the user subsequently interacts with the page or refreshes.
         */
        static clearURL() {
            if (typeof window === 'undefined' || !window.history)
                return;
            const url = new URL(window.location.href);
            let hasChanges = false;
            for (const param of MANAGED_PARAMS) {
                if (url.searchParams.has(param)) {
                    url.searchParams.delete(param);
                    hasChanges = true;
                }
            }
            if (hasChanges) {
                window.history.replaceState({}, '', url.toString());
            }
        }
    }

    /* toast-store.svelte.ts generated by Svelte v5.46.1 */

    const TOAST_CLASS = 'cv-toast-notification';

    class ToastStore {
    	#items = state(proxy([]));

    	get items() {
    		return get(this.#items);
    	}

    	set items(value) {
    		set(this.#items, value, true);
    	}

    	nextId = 0;

    	show(message, duration = 2500) {
    		const id = this.nextId++;
    		const toast = { message, duration, id };

    		this.items.push(toast);

    		if (duration > 0) {
    			setTimeout(
    				() => {
    					this.dismiss(id);
    				},
    				duration
    			);
    		}
    	}

    	dismiss(id) {
    		this.items = this.items.filter((t) => t.id !== id);
    	}
    }

    const toast = new ToastStore();

    function showToast(message, duration) {
    	toast.show(message, duration);
    }

    /**
     * Captures the current viewport-relative position of a given element.
     * Call this *before* a layout-shifting operation, then pass the result to `restoreScrollAnchor`.
     *
     * @param element The element to anchor to.
     * @returns A `ScrollAnchor` snapshot.
     */
    function captureScrollAnchor(element) {
        return { element, top: element.getBoundingClientRect().top };
    }
    /**
     * Calculates the total height of fixed or sticky elements at the top of the viewport.
     * This includes the standard site header and any custom elements marked with
     * `[data-cv-scroll-offset]`. Used to offset scroll positions so content isn't
     * hidden behind these fixed elements.
     */
    function getScrollTopOffset() {
        let headerHeight = 0;
        let customOffset = 0;
        const headerEl = document.querySelector('header');
        if (headerEl) {
            const { position } = window.getComputedStyle(headerEl);
            if (position === 'fixed' || position === 'sticky') {
                headerHeight = headerEl.getBoundingClientRect().height;
            }
        }
        // Elements with [data-cv-scroll-offset] are treated as fixed/sticky obstructions at the top.
        // We use scrollHeight to account for elements mid-transition.
        document.querySelectorAll('[data-cv-scroll-offset]').forEach((el) => {
            customOffset = Math.max(customOffset, el.scrollHeight);
        });
        // Custom elements overlay the standard header — avoid double-counting.
        return Math.max(headerHeight, customOffset);
    }
    /**
     * Returns the highest element matching a CSS selector that is visible in the
     * current viewport (below any fixed/sticky header).
     *
     * @param selector CSS selector to match elements.
     * @returns The highest visible matching element, or `null` if none found.
     */
    function findHighestVisibleElement(selector) {
        const topOffset = getScrollTopOffset();
        const viewportBottom = window.innerHeight;
        const headerEl = document.querySelector('header');
        let best = null;
        let bestTop = Infinity;
        for (const el of document.querySelectorAll(selector)) {
            // Ignore elements inside a sticky/fixed header
            if (topOffset > 0 && headerEl && el.closest('header') === headerEl)
                continue;
            const { top, bottom } = el.getBoundingClientRect();
            const isVisible = bottom > topOffset && top < viewportBottom;
            if (isVisible && top < bestTop) {
                best = el;
                bestTop = top;
            }
        }
        return best;
    }
    /** Default implementation with SSR fallback. */
    const defaultScheduler = (cb) => {
        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
            return window.requestAnimationFrame(cb);
        }
        return setTimeout(() => {
            const now = typeof performance !== 'undefined' && typeof performance.now === 'function'
                ? performance.now()
                : Date.now();
            cb(now);
        }, 16);
    };
    /** Internal scheduler. Can be overridden in tests via setFrameScheduler. */
    let frameScheduler = defaultScheduler;
    /**
     * Restores the visual scroll position after a layout-shifting operation.
     *
     * Pass a `ScrollAnchor` captured *before* the layout change.
     * Uses two `requestAnimationFrame` ticks to ensure the browser has fully
     * reflowed the page before measuring and correcting.
     *
     * Note: When calling from a Svelte component, prefer using `tick()` before
     * calling this function so Svelte's DOM updates are applied first.
     *
     * @param anchor A `ScrollAnchor` captured before the layout change.
     */
    function restoreScrollAnchor(anchor) {
        // Double-rAF: first frame commits the paint, second ensures layout is stable.
        frameScheduler(() => {
            frameScheduler(() => {
                // Use isConnected instead of document.contains() — the latter returns false
                // for elements inside Shadow DOM trees, which would silently skip restoration.
                if (!anchor.element.isConnected)
                    return;
                const delta = anchor.element.getBoundingClientRect().top - anchor.top;
                if (Math.abs(delta) > 1) {
                    window.scrollBy({ top: delta, behavior: 'instant' });
                }
            });
        });
    }

    var root$m = from_svg(`<svg><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,123.97,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.29A169.47,169.47,0,0,1,24.7,128,169.47,169.47,0,0,1,48.07,97.29C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.29A169.47,169.47,0,0,1,231.3,128C223.94,141.07,184.26,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>`);

    function IconEye($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$m();

    	attribute_effect(svg, () => ({
    		fill: 'currentColor',
    		viewBox: '0 0 256 256',
    		xmlns: 'http://www.w3.org/2000/svg',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$l = from_svg(`<svg><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25.2,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm74.07,125a32,32,0,0,1-43.27-44.15l8.64,9.51a16,16,0,0,0,21.61,20.49ZM24.7,128A169.47,169.47,0,0,1,48.07,97.29C70.33,75.19,97.22,64,128,64a112.26,112.26,0,0,1,19.77,1.74l-22,24.2A48,48,0,0,0,80,128c0,1.63.08,3.24.24,4.84L53.92,109A171.58,171.58,0,0,0,24.7,128Zm223,3.26c-.35-.79-8.82-19.58-27.65-38.41C194.57,67.26,162.88,54,128,54a125.07,125.07,0,0,0-23.42,2.19,8,8,0,0,0,3,15.72A109.2,109.2,0,0,1,128,70c30.78,0,57.67,11.19,79.93,33.29A169.47,169.47,0,0,1,231.3,134c-7.09,12.66-37.13,54-90.82,63a8,8,0,0,0,2.73,15.77A128.58,128.58,0,0,0,219.66,169.5c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.66,131.26Z"></path></svg>`);

    function IconEyeSlash($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$l();

    	attribute_effect(svg, () => ({
    		fill: 'currentColor',
    		viewBox: '0 0 256 256',
    		xmlns: 'http://www.w3.org/2000/svg',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root_1$e = from_html(`<p class="description svelte-gwkhja"> </p>`);
    var root_3$7 = from_html(`<span class="segment-icon svelte-gwkhja"><!></span>`);
    var root_2$a = from_html(`<button type="button"><!> <span class="segment-label svelte-gwkhja"> </span></button>`);
    var root$k = from_html(`<div class="card svelte-gwkhja"><div class="content svelte-gwkhja"><div><p class="title svelte-gwkhja"> </p> <!></div> <div class="segmented svelte-gwkhja" role="group" aria-label="Visibility"></div></div></div>`);

    const $$css$m = {
    	hash: 'svelte-gwkhja',
    	code: '.card.svelte-gwkhja {background:var(--cv-bg);border:1px solid var(--cv-border);border-radius:var(--cv-card-radius, 0.5rem);transition:background 0.15s ease;}.card.svelte-gwkhja:hover {background:var(--cv-bg-hover);}.content.svelte-gwkhja {display:flex;align-items:center;justify-content:space-between;padding:0.75rem;}.title.svelte-gwkhja {font-weight:500;font-size:0.875rem;color:var(--cv-text);margin:0;}.description.svelte-gwkhja {font-size:0.75rem;color:var(--cv-text-secondary);margin:0.125rem 0 0 0;}.segmented.svelte-gwkhja {display:flex;border:1px solid var(--cv-border);border-radius:0.375rem;overflow:hidden;flex-shrink:0;}.segment-btn.svelte-gwkhja {display:flex;align-items:center;gap:0.25rem;background:transparent;border:none;border-left:1px solid var(--cv-border);padding:0.3rem 0.6rem;font-size:0.8rem;font-weight:500;color:var(--cv-text-secondary);cursor:pointer;transition:background 0.15s ease, color 0.15s ease;font-family:inherit;line-height:1;}.segment-icon.svelte-gwkhja {display:flex;align-items:center;justify-content:center;width:14px;height:14px;flex-shrink:0;}.segment-icon.svelte-gwkhja svg {width:100%;height:100%;}.segment-label.svelte-gwkhja {font-size:0.75rem;}.segment-btn.svelte-gwkhja:first-child {border-left:none;}.segment-btn.svelte-gwkhja:hover:not(.active) {background:var(--cv-bg-hover);color:var(--cv-text);}.segment-btn.active.svelte-gwkhja {background:var(--cv-primary);color:white;box-shadow:0 1px 3px rgba(0, 0, 0, 0.15);}'
    };

    function ToggleItem($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$m);

    	let value = prop($$props, 'value', 15, 'show'),
    		onchange = prop($$props, 'onchange', 3, () => {});

    	const icons = { hide: IconEyeSlash, show: IconEye };
    	var div = root$k();
    	var div_1 = child(div);
    	var div_2 = child(div_1);
    	var p = child(div_2);
    	var text = child(p, true);

    	reset(p);

    	var node = sibling(p, 2);

    	{
    		var consequent = ($$anchor) => {
    			var p_1 = root_1$e();
    			var text_1 = child(p_1, true);

    			reset(p_1);
    			template_effect(() => set_text(text_1, $$props.toggle.description));
    			append($$anchor, p_1);
    		};

    		if_block(node, ($$render) => {
    			if ($$props.toggle.description) $$render(consequent);
    		});
    	}

    	reset(div_2);

    	var div_3 = sibling(div_2, 2);

    	each(div_3, 20, () => ['hide', 'peek', 'show'], (option) => option, ($$anchor, option) => {
    		var button = root_2$a();

    		button.__click = () => {
    			value(option);
    			onchange()({ toggleId: $$props.toggle.toggleId, value: option });
    		};

    		var node_1 = child(button);

    		{
    			var consequent_1 = ($$anchor) => {
    				const IconComponent = user_derived(() => icons[option]);
    				var span = root_3$7();
    				var node_2 = child(span);

    				component(node_2, () => get(IconComponent), ($$anchor, IconComponent_1) => {
    					IconComponent_1($$anchor, {});
    				});

    				reset(span);
    				append($$anchor, span);
    			};

    			if_block(node_1, ($$render) => {
    				if (option === 'hide' || option === 'show') $$render(consequent_1);
    			});
    		}

    		var span_1 = sibling(node_1, 2);
    		var text_2 = child(span_1, true);

    		reset(span_1);
    		reset(button);

    		template_effect(
    			($0, $1) => {
    				set_class(button, 1, `segment-btn ${value() === option ? 'active' : ''}`, 'svelte-gwkhja');
    				set_attribute(button, 'aria-pressed', value() === option);
    				set_attribute(button, 'title', $0);
    				set_text(text_2, $1);
    			},
    			[
    				() => option.charAt(0).toUpperCase() + option.slice(1),
    				() => option.charAt(0).toUpperCase() + option.slice(1)
    			]
    		);

    		append($$anchor, button);
    	});

    	reset(div_3);
    	reset(div_1);
    	reset(div);
    	template_effect(() => set_text(text, $$props.toggle.label || $$props.toggle.toggleId));
    	append($$anchor, div);
    	pop();
    }

    delegate(['click']);

    var root_1$d = from_html(`<p class="description svelte-uub3h8"> </p>`);
    var root_2$9 = from_html(`<option> </option>`);
    var root$j = from_html(`<div class="root svelte-uub3h8"><div class="header svelte-uub3h8"><label class="label svelte-uub3h8"> </label> <!></div> <select class="select svelte-uub3h8"></select></div>`);

    const $$css$l = {
    	hash: 'svelte-uub3h8',
    	code: '.root.svelte-uub3h8 {display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem;background:var(--cv-bg);border:1px solid var(--cv-border);border-radius:var(--cv-card-radius, 0.5rem);transition:background 0.15s ease;}.root.svelte-uub3h8:hover {background:var(--cv-bg-hover);}\n\n  /* Remove special handling for last child since they are now separate cards */.root.svelte-uub3h8:last-child {border-bottom:1px solid var(--cv-border);}.header.svelte-uub3h8 {display:flex;flex-direction:column;gap:0.25rem;}.label.svelte-uub3h8 {font-size:0.875rem;color:var(--cv-text);margin:0;line-height:1.4;font-weight:500;display:block;cursor:pointer;}.description.svelte-uub3h8 {font-size:0.75rem;color:var(--cv-text-secondary);margin:0;line-height:1.4;}.select.svelte-uub3h8 {width:100%;border-radius:0.5rem;background:var(--cv-input-bg);border:1px solid var(--cv-input-border);color:var(--cv-text);padding:0.5rem 0.75rem;font-size:0.875rem;cursor:pointer;transition:all 0.15s ease;font-family:inherit;}.select.svelte-uub3h8:hover {border-color:var(--cv-text-secondary);}.select.svelte-uub3h8:focus {outline:none;border-color:var(--cv-primary);box-shadow:0 0 0 2px var(--cv-focus-ring);}'
    };

    function TabGroupItem($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$l);

    	let activeTabId = prop($$props, 'activeTabId', 15, ''),
    		onchange = prop($$props, 'onchange', 3, () => {});

    	function onChange(event) {
    		const target = event.target;

    		activeTabId(target.value);
    		onchange()({ groupId: $$props.group.groupId, tabId: activeTabId() });
    	}

    	var div = root$j();
    	var div_1 = child(div);
    	var label = child(div_1);
    	var text = child(label, true);

    	reset(label);

    	var node = sibling(label, 2);

    	{
    		var consequent = ($$anchor) => {
    			var p = root_1$d();
    			var text_1 = child(p, true);

    			reset(p);
    			template_effect(() => set_text(text_1, $$props.group.description));
    			append($$anchor, p);
    		};

    		if_block(node, ($$render) => {
    			if ($$props.group.description) $$render(consequent);
    		});
    	}

    	reset(div_1);

    	var select = sibling(div_1, 2);

    	select.__change = onChange;

    	each(select, 21, () => $$props.group.tabs, (tab) => tab.tabId, ($$anchor, tab) => {
    		var option = root_2$9();
    		var text_2 = child(option, true);

    		reset(option);

    		var option_value = {};

    		template_effect(() => {
    			set_text(text_2, get(tab).label || get(tab).tabId);

    			if (option_value !== (option_value = get(tab).tabId)) {
    				option.value = (option.__value = get(tab).tabId) ?? '';
    			}
    		});

    		append($$anchor, option);
    	});

    	reset(select);

    	var select_value;

    	init_select(select);
    	reset(div);

    	template_effect(() => {
    		set_attribute(label, 'for', `tab-group-${$$props.group.groupId ?? ''}`);
    		set_text(text, $$props.group.label || $$props.group.groupId);
    		set_attribute(select, 'id', `tab-group-${$$props.group.groupId ?? ''}`);

    		if (select_value !== (select_value = activeTabId())) {
    			(
    				select.value = (select.__value = activeTabId()) ?? '',
    				select_option(select, activeTabId())
    			);
    		}
    	});

    	append($$anchor, div);
    	pop();
    }

    delegate(['change']);

    var root$i = from_html(`<div class="placeholder-item svelte-1vp05mb"><label class="placeholder-label svelte-1vp05mb"> </label> <input class="placeholder-input svelte-1vp05mb" type="text"/></div>`);

    const $$css$k = {
    	hash: 'svelte-1vp05mb',
    	code: '.placeholder-item.svelte-1vp05mb {display:flex;flex-direction:column;gap:0.25rem;}.placeholder-label.svelte-1vp05mb {font-size:0.85rem;font-weight:500;color:var(--cv-text);}.placeholder-input.svelte-1vp05mb {padding:0.5rem 0.75rem;border:1px solid var(--cv-input-border);border-radius:var(--cv-card-radius, 0.5rem);font-size:0.9rem;transition:border-color 0.2s;background:var(--cv-input-bg);color:var(--cv-text);}.placeholder-input.svelte-1vp05mb:focus {outline:none;border-color:var(--cv-primary);box-shadow:0 0 0 2px var(--cv-focus-ring);}'
    };

    function PlaceholderItem($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$k);

    	let value = prop($$props, 'value', 15, ''),
    		onchange = prop($$props, 'onchange', 3, () => {});

    	function handleInput(e) {
    		const target = e.target;

    		value(target.value);
    		onchange()({ name: $$props.definition.name, value: target.value });
    	}

    	const sanitizedId = user_derived(() => `cv-placeholder-${$$props.definition.name.replace(/[^a-zA-Z0-9-_]/g, '-')}`);
    	var div = root$i();
    	var label = child(div);
    	var text = child(label, true);

    	reset(label);

    	var input = sibling(label, 2);

    	remove_input_defaults(input);
    	input.__input = handleInput;
    	reset(div);

    	template_effect(() => {
    		set_attribute(label, 'for', get(sanitizedId));
    		set_text(text, $$props.definition.settingsLabel || $$props.definition.name);
    		set_attribute(input, 'id', get(sanitizedId));
    		set_attribute(input, 'placeholder', $$props.definition.settingsHint || '');
    		set_value(input, value());
    	});

    	append($$anchor, div);
    	pop();
    }

    delegate(['input']);

    /**
     * Copies text to the clipboard with fallback for non-secure contexts.
     * @param text The text to copy
     * @returns Promise that resolves if copy was successful, rejects otherwise.
     */
    async function copyToClipboard(text) {
        // Try modern navigator.clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            }
            catch (err) {
                console.warn('Navigator clipboard failed, trying fallback:', err);
            }
        }
        // Fallback: execCommand('copy')
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            // Ensure hidden but part of DOM
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            textArea.style.top = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) {
                return Promise.resolve();
            }
            else {
                return Promise.reject(new Error('execCommand copy failed'));
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    var root_1$c = from_html(`<button type="button">Customize</button>`);
    var root_3$6 = from_html(`<p class="description svelte-16uy9h6"> </p>`);
    var root_5$2 = from_html(`<div class="section svelte-16uy9h6"><div class="section-heading svelte-16uy9h6">Toggles</div> <div class="toggles-container svelte-16uy9h6"></div></div>`);
    var root_7$2 = from_html(`<div class="section svelte-16uy9h6"><div class="section-heading svelte-16uy9h6">Placeholders</div> <div class="placeholders-container svelte-16uy9h6"></div></div>`);
    var root_9$1 = from_html(`<div class="section svelte-16uy9h6"><div class="section-heading svelte-16uy9h6">Tab Groups</div> <div class="tabgroups-container svelte-16uy9h6"><div class="tabgroup-card header-card svelte-16uy9h6" role="group"><div class="tabgroup-row svelte-16uy9h6"><div class="logo-box svelte-16uy9h6" id="cv-nav-icon-box"><div class="nav-icon svelte-16uy9h6"><!></div></div> <div class="tabgroup-info svelte-16uy9h6"><div class="tabgroup-title-container"><p class="tabgroup-title svelte-16uy9h6">Show only the selected tab</p></div> <p class="tabgroup-description svelte-16uy9h6">Hide the navigation headers</p></div> <label class="toggle-switch nav-toggle svelte-16uy9h6"><input class="nav-pref-input svelte-16uy9h6" type="checkbox" aria-label="Show only the selected tab"/> <span class="switch-bg svelte-16uy9h6"></span> <span class="switch-knob svelte-16uy9h6"></span></label></div></div> <div class="tab-groups-list svelte-16uy9h6"></div></div></div>`);
    var root_4$3 = from_html(`<!> <!> <!>`, 1);
    var root_2$8 = from_html(`<div class="tab-content active svelte-16uy9h6"><!> <!></div>`);
    var root_16 = from_html(`<button type="button" class="share-action-btn copy-url-btn svelte-16uy9h6"><span class="btn-icon svelte-16uy9h6"><!></span> <span><!></span></button>`);

    var root_15 = from_html(`<div class="tab-content active svelte-16uy9h6"><div class="share-content svelte-16uy9h6"><div class="share-instruction svelte-16uy9h6">Create a shareable link for your current customization, or select specific parts of
              the page to share.</div> <button type="button" class="share-action-btn primary start-share-btn svelte-16uy9h6"><span class="btn-icon svelte-16uy9h6"><!></span> <span>Select elements to share</span></button> <!></div></div>`);

    var root_21 = from_html(`<button type="button" class="reset-btn svelte-16uy9h6" title="Reset to Default">Reset</button>`);
    var root_22 = from_html(`<div></div>`);
    var root$h = from_html(`<div class="modal-overlay svelte-16uy9h6" role="presentation"><div class="modal-box cv-custom-state-modal svelte-16uy9h6" role="dialog" aria-modal="true"><header class="header svelte-16uy9h6"><div class="header-content svelte-16uy9h6"><div class="modal-icon svelte-16uy9h6"><!></div> <div class="title svelte-16uy9h6"> </div></div> <button type="button" class="close-btn svelte-16uy9h6" aria-label="Close modal"><!></button></header> <main class="main svelte-16uy9h6"><div class="tabs svelte-16uy9h6"><!> <button type="button">Share</button></div> <!></main> <footer class="footer svelte-16uy9h6"><!> <div class="footer-attribution svelte-16uy9h6"><span class="footer-tagline svelte-16uy9h6">Browser-side page customisations provided by</span> <a href="https://custardui.js.org" target="_blank" rel="noopener noreferrer" class="footer-link svelte-16uy9h6">custardui.js.org</a></div> <button type="button" class="done-btn svelte-16uy9h6">Done</button></footer></div></div>`);

    const $$css$j = {
    	hash: 'svelte-16uy9h6',
    	code: '\n  /* Modal Overlay & Modal Frame */.modal-overlay.svelte-16uy9h6 {position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0, 0, 0, 0.5);display:flex;align-items:center;justify-content:center;z-index:10002;}.modal-box.svelte-16uy9h6 {background:var(--cv-bg);border-radius:var(--cv-modal-radius, 0.75rem);box-shadow:0 25px 50px -12px var(--cv-shadow);max-width:32rem;width:90vw;max-height:80vh;display:flex;flex-direction:column;}.header.svelte-16uy9h6 {display:flex;align-items:center;justify-content:space-between;padding:0.5rem 1rem;border-bottom:1px solid var(--cv-border);}.header-content.svelte-16uy9h6 {display:flex;align-items:center;gap:0.75rem;}.modal-icon.svelte-16uy9h6 {position:relative;width:1rem;height:1rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;color:var(--cv-text);}.modal-icon.svelte-16uy9h6 svg {fill:currentColor;}.title.svelte-16uy9h6 {font-size:1.125rem;font-weight:bold;color:var(--cv-text);margin:0;}.close-btn.svelte-16uy9h6 {width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:transparent;border:none;color:var(--cv-text-secondary);cursor:pointer;transition:all 0.2s ease;}.close-btn.svelte-16uy9h6:hover {background:rgba(62, 132, 244, 0.1);color:var(--cv-primary);}.main.svelte-16uy9h6 {padding:1rem;flex:1;display:flex;flex-direction:column;overflow-y:auto;max-height:calc(80vh - 8rem);min-height:var(--cv-modal-min-height, 20rem);}.description.svelte-16uy9h6 {font-size:0.875rem;color:var(--cv-text);margin:0 0 1rem 0;line-height:1.4;}\n\n  /* Tabs */.tabs.svelte-16uy9h6 {display:flex;margin-bottom:1rem;border-bottom:2px solid var(--cv-border);}.tab.svelte-16uy9h6 {background:transparent;border:none;padding:0.5rem 1rem;font-size:0.9rem;font-weight:600;color:var(--cv-text-secondary);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;}.tab.active.svelte-16uy9h6 {color:var(--cv-primary);border-bottom-color:var(--cv-primary);}.tab-content.svelte-16uy9h6 {display:none;}.tab-content.active.svelte-16uy9h6 {display:block;}\n\n  /* Section Styling */.section.svelte-16uy9h6 {display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;}.section-heading.svelte-16uy9h6 {font-size:0.7rem;font-weight:600;color:var(--cv-text-secondary);text-transform:var(--cv-section-label-transform, uppercase);letter-spacing:0.08em;margin:0;}.toggles-container.svelte-16uy9h6 {display:flex;flex-direction:column;gap:0.5rem;overflow:hidden;}\n\n  /* Tab Groups Section specific */.tabgroups-container.svelte-16uy9h6 {border-radius:0.5rem;}\n\n  /* Nav Toggle Card */.tabgroup-card.svelte-16uy9h6 {background:var(--cv-bg);border-bottom:1px solid var(--cv-border);}.tabgroup-card.header-card.svelte-16uy9h6 {display:flex;align-items:center;justify-content:space-between;padding:0.75rem;border:1px solid var(--cv-border);border-radius:0.5rem;margin-bottom:0.75rem;}.tabgroup-row.svelte-16uy9h6 {display:flex;align-items:center;justify-content:space-between;width:100%;gap:1rem;}.logo-box.svelte-16uy9h6 {width:3rem;height:3rem;background:var(--cv-modal-icon-bg);border-radius:0.5rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}.nav-icon.svelte-16uy9h6 {width:2rem;height:2rem;color:var(--cv-text);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color 0.2s ease;}.tabgroup-info.svelte-16uy9h6 {flex:1;display:flex;flex-direction:column;gap:0.25rem;}.tabgroup-title.svelte-16uy9h6 {font-weight:500;font-size:0.875rem;color:var(--cv-text);margin:0 0 0 0;}.tabgroup-description.svelte-16uy9h6 {font-size:0.75rem;color:var(--cv-text-secondary);margin:0;line-height:1.3;}\n\n  /* Toggle Switch */.toggle-switch.svelte-16uy9h6 {position:relative;display:inline-flex;align-items:center;width:44px;height:24px;background:var(--cv-switch-bg);border-radius:9999px;padding:2px;box-sizing:border-box;cursor:pointer;transition:background-color 0.2s ease;border:none;}.toggle-switch.svelte-16uy9h6 input:where(.svelte-16uy9h6) {display:none;}.toggle-switch.svelte-16uy9h6 .switch-bg:where(.svelte-16uy9h6) {position:absolute;inset:0;border-radius:9999px;background:var(--cv-switch-bg);transition:background-color 0.2s ease;pointer-events:none;}.toggle-switch.svelte-16uy9h6 .switch-knob:where(.svelte-16uy9h6) {position:relative;width:20px;height:20px;background:var(--cv-switch-knob);border-radius:50%;box-shadow:0 1px 2px rgba(0, 0, 0, 0.1);transition:transform 0.2s ease;transform:translateX(0);}.toggle-switch.svelte-16uy9h6 input:where(.svelte-16uy9h6):checked ~ .switch-knob:where(.svelte-16uy9h6) {transform:translateX(20px);}.toggle-switch.svelte-16uy9h6 input:where(.svelte-16uy9h6):checked ~ .switch-bg:where(.svelte-16uy9h6) {background:var(--cv-primary);}\n\n  /* Tab Groups List */.tab-groups-list.svelte-16uy9h6 {display:flex;flex-direction:column;gap:0.75rem;}\n\n  /* Footer */.footer.svelte-16uy9h6 {padding:0.75rem 1rem;border-top:1px solid var(--cv-border);display:flex;align-items:center;justify-content:space-between;background:var(--cv-bg);border-bottom-left-radius:var(--cv-modal-radius, 0.75rem);border-bottom-right-radius:var(--cv-modal-radius, 0.75rem);}.footer-attribution.svelte-16uy9h6 {display:flex;flex-direction:column;align-items:center;text-align:center;gap:0.1rem;opacity:0.5;transition:opacity 0.15s ease;}.footer-attribution.svelte-16uy9h6:hover {opacity:1;}.footer-tagline.svelte-16uy9h6 {font-size:0.6rem;color:var(--cv-text-secondary);letter-spacing:0.04em;}.footer-link.svelte-16uy9h6 {color:var(--cv-text-secondary);text-decoration:none;font-size:0.68rem;font-weight:600;letter-spacing:0.08em;transition:color 0.15s ease;}.footer-link.svelte-16uy9h6:hover {color:var(--cv-primary);}.reset-btn.svelte-16uy9h6 {display:flex;align-items:center;gap:0.4rem;background:transparent;border:none;font-size:0.875rem;font-weight:500;color:var(--cv-text-secondary);cursor:pointer;padding:0.4rem 0.5rem;border-radius:0.5rem;transition:all 0.2s ease;}.reset-btn.svelte-16uy9h6:hover {background:var(--cv-danger-bg);color:var(--cv-danger);}.done-btn.svelte-16uy9h6 {background:var(--cv-primary);color:white;border:none;padding:0.5rem 1.1rem;border-radius:0.5rem;font-weight:600;font-size:0.875rem;cursor:pointer;box-shadow:0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);transition:background-color 0.15s ease, box-shadow 0.15s ease;}.done-btn.svelte-16uy9h6:hover {background:var(--cv-primary-hover);box-shadow:0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);}\n\n  /* Share Tab Styles */.share-content.svelte-16uy9h6 {display:flex;flex-direction:column;gap:1rem;align-items:center;text-align:center;padding:1rem 0;}.share-instruction.svelte-16uy9h6 {font-size:0.95rem;color:var(--cv-text-secondary);margin-bottom:0.5rem;}.share-action-btn.svelte-16uy9h6 {display:flex;align-items:center;justify-content:center;gap:0.75rem;width:100%;max-width:320px;padding:0.75rem 1rem;border-radius:0.5rem;font-weight:500;font-size:0.95rem;cursor:pointer;transition:all 0.2s ease;border:1px solid var(--cv-border);background:var(--cv-bg);color:var(--cv-text);}.share-action-btn.svelte-16uy9h6:hover {border-color:var(--cv-primary);color:var(--cv-primary);background:var(--cv-bg-hover);}.share-action-btn.primary.svelte-16uy9h6 {background:var(--cv-primary);border-color:var(--cv-primary);color:white;}.share-action-btn.primary.svelte-16uy9h6:hover {background:var(--cv-primary-hover);border-color:var(--cv-primary-hover);}.btn-icon.svelte-16uy9h6 {display:flex;align-items:center;justify-content:center;width:1.25rem;height:1.25rem;}\n\n  /* Placeholder Inputs */.placeholders-container.svelte-16uy9h6 {display:flex;flex-direction:column;gap:0.75rem;}'
    };

    function Modal($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$j);

    	/* eslint-disable @typescript-eslint/no-explicit-any */
    	let onclose = prop($$props, 'onclose', 3, () => {}),
    		onreset = prop($$props, 'onreset', 3, () => {}),
    		onstartShare = prop($$props, 'onstartShare', 3, () => {});

    	// --- Derived State from Core ---
    	const areTabNavsVisible = user_derived(() => uiStore.isTabGroupNavHeadingVisible);

    	const showTabGroups = user_derived(() => uiStore.uiOptions.showTabGroups);
    	const showReset = user_derived(() => uiStore.uiOptions.showReset);
    	const title = user_derived(() => uiStore.uiOptions.title);
    	const description = user_derived(() => uiStore.uiOptions.description);

    	// Config Items
    	const toggles = user_derived(() => derivedStore.menuToggles);

    	const tabGroups = user_derived(() => derivedStore.menuTabGroups);
    	const sectionOrder = user_derived(() => activeStateStore.configSectionOrder);

    	// State Items
    	let shownToggles = user_derived(() => activeStateStore.state.shownToggles ?? []);

    	let peekToggles = user_derived(() => activeStateStore.state.peekToggles ?? []);
    	let activeTabs = user_derived(() => activeStateStore.state.tabs ?? {});

    	// Placeholder Data
    	let placeholderDefinitions = user_derived(() => {
    		return placeholderRegistryStore.definitions.filter((d) => {
    			if (d.hiddenFromSettings) return false;

    			if (d.isLocal) {
    				return elementStore.detectedPlaceholders.has(d.name);
    			}

    			return true;
    		});
    	});

    	let placeholderValues = user_derived(() => activeStateStore.state.placeholders ?? {});

    	// --- UI Logic ---
    	let hasCustomizeContent = user_derived(() => get(toggles).length > 0 || get(placeholderDefinitions).length > 0 || get(showTabGroups) && get(tabGroups).length > 0);

    	let activeTab = state('customize');
    	let copySuccess = state(false);

    	// Height preservation logic
    	let mainClientHeight = state(0);

    	let preservedHeight = state(0);

    	user_effect(() => {
    		if (!get(hasCustomizeContent) && get(activeTab) === 'customize') {
    			set(activeTab, 'share');
    		}
    	});

    	user_effect(() => {
    		if (get(activeTab) === 'customize' && get(mainClientHeight) > get(preservedHeight)) {
    			set(preservedHeight, get(mainClientHeight), true);
    		}
    	});

    	let isNavHovering = state(false);

    	function handleNavHover(hovering) {
    		set(isNavHovering, hovering, true);
    	}

    	function handleNavToggle() {
    		uiStore.isTabGroupNavHeadingVisible = !get(areTabNavsVisible);
    	}

    	// --- Core Actions ---
    	function handleToggleChange(detail) {
    		const { toggleId, value } = detail;

    		activeStateStore.updateToggleState(toggleId, value);
    	}

    	function handleTabGroupChange(detail) {
    		const { groupId, tabId } = detail;
    		const anchorEl = findHighestVisibleElement('cv-tabgroup');
    		const scrollAnchor = anchorEl ? captureScrollAnchor(anchorEl) : null;

    		activeStateStore.setMarkedTab(groupId, tabId);

    		if (scrollAnchor) {
    			restoreScrollAnchor(scrollAnchor);
    		}
    	}

    	function handlePlaceholderChange(detail) {
    		activeStateStore.setPlaceholder(detail.name, detail.value);
    	}

    	async function copyShareUrl() {
    		const url = URLStateManager.generateShareableURL(activeStateStore.state, activeStateStore.config, {
    			toggles: elementStore.detectedToggles,
    			tabGroups: elementStore.detectedTabGroups,
    			placeholders: elementStore.detectedPlaceholders
    		});

    		try {
    			await copyToClipboard(url);
    			showToast('Link copied to clipboard!');
    			set(copySuccess, true);

    			setTimeout(
    				() => {
    					set(copySuccess, false);
    				},
    				2000
    			);
    		} catch(err) {
    			console.error('Copy failed:', err);
    			showToast('Failed to copy URL. Please copy manually.');
    		}
    	}

    	function computeToggleState(id, currentShown, currentPeek) {
    		if (currentShown.includes(id)) return 'show';
    		if (currentPeek.includes(id)) return 'peek';

    		return 'hide';
    	}

    	var div = root$h();

    	div.__click = (e) => {
    		if (e.target === e.currentTarget) onclose()();
    	};

    	var div_1 = child(div);
    	var header = child(div_1);
    	var div_2 = child(header);
    	var div_3 = child(div_2);
    	var node = child(div_3);

    	IconGear(node, {});
    	reset(div_3);

    	var div_4 = sibling(div_3, 2);
    	var text$1 = child(div_4, true);

    	reset(div_4);
    	reset(div_2);

    	var button = sibling(div_2, 2);

    	button.__click = function (...$$args) {
    		onclose()?.apply(this, $$args);
    	};

    	var node_1 = child(button);

    	IconClose(node_1, {});
    	reset(button);
    	reset(header);

    	var main = sibling(header, 2);
    	let styles;
    	var div_5 = child(main);
    	var node_2 = child(div_5);

    	{
    		var consequent = ($$anchor) => {
    			var button_1 = root_1$c();

    			button_1.__click = () => set(activeTab, 'customize');
    			template_effect(() => set_class(button_1, 1, `tab ${get(activeTab) === 'customize' ? 'active' : ''}`, 'svelte-16uy9h6'));
    			append($$anchor, button_1);
    		};

    		if_block(node_2, ($$render) => {
    			if (get(hasCustomizeContent)) $$render(consequent);
    		});
    	}

    	var button_2 = sibling(node_2, 2);

    	button_2.__click = () => set(activeTab, 'share');
    	reset(div_5);

    	var node_3 = sibling(div_5, 2);

    	{
    		var consequent_7 = ($$anchor) => {
    			var div_6 = root_2$8();
    			var node_4 = child(div_6);

    			{
    				var consequent_1 = ($$anchor) => {
    					var p = root_3$6();
    					var text_1 = child(p, true);

    					reset(p);
    					template_effect(() => set_text(text_1, get(description)));
    					append($$anchor, p);
    				};

    				if_block(node_4, ($$render) => {
    					if (get(description)) $$render(consequent_1);
    				});
    			}

    			var node_5 = sibling(node_4, 2);

    			each(node_5, 16, () => get(sectionOrder), (section) => section, ($$anchor, section) => {
    				var fragment = root_4$3();
    				var node_6 = first_child(fragment);

    				{
    					var consequent_2 = ($$anchor) => {
    						var div_7 = root_5$2();
    						var div_8 = sibling(child(div_7), 2);

    						each(div_8, 21, () => get(toggles), (toggle) => toggle.toggleId, ($$anchor, toggle) => {
    							{
    								let $0 = user_derived(() => computeToggleState(get(toggle).toggleId, get(shownToggles), get(peekToggles)));

    								ToggleItem($$anchor, {
    									get toggle() {
    										return get(toggle);
    									},

    									get value() {
    										return get($0);
    									},

    									onchange: handleToggleChange
    								});
    							}
    						});

    						reset(div_8);
    						reset(div_7);
    						append($$anchor, div_7);
    					};

    					if_block(node_6, ($$render) => {
    						if (section === 'toggles' && get(toggles).length > 0) $$render(consequent_2);
    					});
    				}

    				var node_7 = sibling(node_6, 2);

    				{
    					var consequent_3 = ($$anchor) => {
    						var div_9 = root_7$2();
    						var div_10 = sibling(child(div_9), 2);

    						each(div_10, 21, () => get(placeholderDefinitions), (def) => def.name, ($$anchor, def) => {
    							{
    								let $0 = user_derived(() => get(placeholderValues)[get(def).name] ?? get(def).defaultValue ?? '');

    								PlaceholderItem($$anchor, {
    									get definition() {
    										return get(def);
    									},

    									get value() {
    										return get($0);
    									},

    									onchange: handlePlaceholderChange
    								});
    							}
    						});

    						reset(div_10);
    						reset(div_9);
    						append($$anchor, div_9);
    					};

    					if_block(node_7, ($$render) => {
    						if (section === 'placeholders' && get(placeholderDefinitions).length > 0) $$render(consequent_3);
    					});
    				}

    				var node_8 = sibling(node_7, 2);

    				{
    					var consequent_6 = ($$anchor) => {
    						var div_11 = root_9$1();
    						var div_12 = sibling(child(div_11), 2);
    						var div_13 = child(div_12);
    						var div_14 = child(div_13);
    						var div_15 = child(div_14);
    						var div_16 = child(div_15);
    						var node_9 = child(div_16);

    						{
    							var consequent_4 = ($$anchor) => {
    								IconNavDashed($$anchor, {});
    							};

    							var alternate_1 = ($$anchor) => {
    								var fragment_4 = comment();
    								var node_10 = first_child(fragment_4);

    								{
    									var consequent_5 = ($$anchor) => {
    										IconNavHeadingOn($$anchor, {});
    									};

    									var alternate = ($$anchor) => {
    										IconNavHeadingOff($$anchor, {});
    									};

    									if_block(
    										node_10,
    										($$render) => {
    											if (get(areTabNavsVisible)) $$render(consequent_5); else $$render(alternate, false);
    										},
    										true
    									);
    								}

    								append($$anchor, fragment_4);
    							};

    							if_block(node_9, ($$render) => {
    								if (get(isNavHovering)) $$render(consequent_4); else $$render(alternate_1, false);
    							});
    						}

    						reset(div_16);
    						reset(div_15);

    						var label = sibling(div_15, 4);
    						var input = child(label);

    						remove_input_defaults(input);
    						input.__change = handleNavToggle;
    						next(4);
    						reset(label);
    						reset(div_14);
    						reset(div_13);

    						var div_17 = sibling(div_13, 2);

    						each(div_17, 21, () => get(tabGroups), (group) => group.groupId, ($$anchor, group) => {
    							{
    								let $0 = user_derived(() => get(activeTabs)[get(group).groupId] || get(group).tabs[0]?.tabId);

    								TabGroupItem($$anchor, {
    									get group() {
    										return get(group);
    									},

    									get activeTabId() {
    										return get($0);
    									},

    									onchange: handleTabGroupChange
    								});
    							}
    						});

    						reset(div_17);
    						reset(div_12);
    						reset(div_11);
    						template_effect(() => set_checked(input, !get(areTabNavsVisible)));
    						event('mouseenter', div_13, () => handleNavHover(true));
    						event('mouseleave', div_13, () => handleNavHover(false));
    						append($$anchor, div_11);
    					};

    					if_block(node_8, ($$render) => {
    						if (section === 'tabGroups' && get(showTabGroups) && get(tabGroups).length > 0) $$render(consequent_6);
    					});
    				}

    				append($$anchor, fragment);
    			});

    			reset(div_6);
    			transition(1, div_6, () => fade, () => ({ duration: 150 }));
    			append($$anchor, div_6);
    		};

    		var alternate_4 = ($$anchor) => {
    			var div_18 = root_15();
    			var div_19 = child(div_18);
    			var button_3 = sibling(child(div_19), 2);

    			button_3.__click = () => onstartShare()();

    			var span = child(button_3);
    			var node_11 = child(span);

    			IconShare(node_11, {});
    			reset(span);
    			next(2);
    			reset(button_3);

    			var node_12 = sibling(button_3, 2);

    			{
    				var consequent_10 = ($$anchor) => {
    					var button_4 = root_16();

    					button_4.__click = copyShareUrl;

    					var span_1 = child(button_4);
    					var node_13 = child(span_1);

    					{
    						var consequent_8 = ($$anchor) => {
    							IconCheck($$anchor, {});
    						};

    						var alternate_2 = ($$anchor) => {
    							IconCopy($$anchor, {});
    						};

    						if_block(node_13, ($$render) => {
    							if (get(copySuccess)) $$render(consequent_8); else $$render(alternate_2, false);
    						});
    					}

    					reset(span_1);

    					var span_2 = sibling(span_1, 2);
    					var node_14 = child(span_2);

    					{
    						var consequent_9 = ($$anchor) => {
    							var text_2 = text('Copied!');

    							append($$anchor, text_2);
    						};

    						var alternate_3 = ($$anchor) => {
    							var text_3 = text('Copy Shareable URL of Settings');

    							append($$anchor, text_3);
    						};

    						if_block(node_14, ($$render) => {
    							if (get(copySuccess)) $$render(consequent_9); else $$render(alternate_3, false);
    						});
    					}

    					reset(span_2);
    					reset(button_4);
    					append($$anchor, button_4);
    				};

    				if_block(node_12, ($$render) => {
    					if (get(hasCustomizeContent)) $$render(consequent_10);
    				});
    			}

    			reset(div_19);
    			reset(div_18);
    			transition(1, div_18, () => fade, () => ({ duration: 150 }));
    			append($$anchor, div_18);
    		};

    		if_block(node_3, ($$render) => {
    			if (get(activeTab) === 'customize') $$render(consequent_7); else $$render(alternate_4, false);
    		});
    	}

    	reset(main);

    	var footer = sibling(main, 2);
    	var node_15 = child(footer);

    	{
    		var consequent_11 = ($$anchor) => {
    			var button_5 = root_21();

    			button_5.__click = function (...$$args) {
    				onreset()?.apply(this, $$args);
    			};

    			append($$anchor, button_5);
    		};

    		var alternate_5 = ($$anchor) => {
    			var div_20 = root_22();

    			append($$anchor, div_20);
    		};

    		if_block(node_15, ($$render) => {
    			if (get(showReset)) $$render(consequent_11); else $$render(alternate_5, false);
    		});
    	}

    	var button_6 = sibling(node_15, 4);

    	button_6.__click = function (...$$args) {
    		onclose()?.apply(this, $$args);
    	};

    	reset(footer);
    	reset(div_1);
    	reset(div);

    	template_effect(() => {
    		set_text(text$1, get(title));

    		styles = set_style(main, '', styles, {
    			'min-height': get(activeTab) === 'share' && get(preservedHeight) > 0 ? `${get(preservedHeight)}px` : undefined
    		});

    		set_class(button_2, 1, `tab ${get(activeTab) === 'share' ? 'active' : ''}`, 'svelte-16uy9h6');
    	});

    	bind_element_size(main, 'clientHeight', ($$value) => set(mainClientHeight, $$value));
    	transition(3, div_1, () => scale, () => ({ duration: 200, start: 0.9 }));
    	transition(3, div, () => fade, () => ({ duration: 200 }));
    	append($$anchor, div);
    	pop();
    }

    delegate(['click', 'change']);

    const HIGHLIGHT_COLORS = [
        { key: 'yellow', label: 'Yellow', hex: '#f5f521' },
        { key: 'blue', label: 'Blue', hex: '#3b82f6' },
        { key: 'red', label: 'Red', hex: '#ef4444' },
        { key: 'black', label: 'Black', hex: '#1a1a1a' },
        { key: 'green', label: 'Green', hex: '#22c55e' },
    ];
    const DEFAULT_COLOR_KEY = 'red';

    const ANNOTATION_CORNERS = ['tl', 'tr', 'bl', 'br'];
    const CORNER_ICONS = [
        { key: 'tl', icon: '◤' },
        { key: 'tr', icon: '◥' },
        { key: 'bl', icon: '◣' },
        { key: 'br', icon: '◢' },
    ];
    const DEFAULT_ANNOTATION_CORNER = 'tl';
    const MAX_ANNOTATION_LENGTH = 280;
    const ANNOTATION_PREVIEW_LENGTH = 40;

    /**
     * Generates a simple hash code for a string.
     */
    function hashCode(str) {
        let hash = 0;
        if (str.length === 0)
            return hash;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    /**
     * Matches raw (un-hydrated) placeholder tokens in text content, including
     * escaped forms like \[[ name ]]:
     *   [[ name ]], [[ name : fallback ]], [[ name ? truthy : falsy ]], \[[ name ]]
     * Captures the placeholder name in group 1. Used to normalize tokens before hashing.
     *
     * The optional `(?:\\)?` prefix intentionally consumes the leading backslash so that
     * \[[ name ]] normalizes to [[name]] — the same canonical form that PlaceholderBinder
     * emits for escaped tokens ([[ name ]] literal text). This keeps the hash stable
     * across raw and hydrated DOM states.
     */
    const RAW_PLACEHOLDER_RE = /(?:\\)?\[\[\s*([a-zA-Z0-9_-]+)[^\]]*\]\]/g;
    /**
     * Recursively walks `node`, appending stable placeholder-canonical text to `parts`.
     * - Text nodes: raw [[ ... ]] tokens are normalized to [[name]] before appending.
     * - <cv-placeholder> elements: appends [[name]] from the `name` attribute; skips children
     *   (children hold the live resolved value, not the canonical template form).
     * - All other elements: recurse into children.
     */
    function collectStableText(node, parts) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue || '';
            parts.push(text.replace(RAW_PLACEHOLDER_RE, '[[$1]]'));
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node;
            if (el.tagName === 'CV-PLACEHOLDER') {
                parts.push(`[[${el.getAttribute('name') || ''}]]`);
                return; // Skip children — they contain the resolved runtime value
            }
            for (let i = 0; i < el.childNodes.length; i++) {
                collectStableText(el.childNodes[i], parts);
            }
        }
    }
    /**
     * Returns the text content of an element with all <cv-placeholder> custom elements
     * replaced by their canonical [[name]] template form.
     *
     * This produces a stable string regardless of the placeholder's current resolved value
     * or whether it has been hydrated yet — enabling consistent hashing across share and load time.
     *
     * Without this, an element containing [[username]] resolved to "alice" would hash as
     * "Hello alice!" at share-time but "Hello [[username]]!" at load-time, causing resolution to fail.
     */
    function getStableTextContent(el) {
        // Special case: el itself is a <cv-placeholder> — return canonical form directly.
        if (el.tagName === 'CV-PLACEHOLDER') {
            return `[[${el.getAttribute('name') || ''}]]`;
        }
        // Fast path: if no raw [[ tokens and no <cv-placeholder> descendants,
        // there are no placeholders — return textContent directly (native, no allocation).
        // Check textContent first to avoid the querySelector when raw tokens are present
        // (raw DOM elements with [[ tokens always need the slow path).
        const rawText = el.textContent || '';
        if (!rawText.includes('[[')) {
            const hasHydrated = el.querySelector('cv-placeholder') !== null;
            if (!hasHydrated) {
                return rawText;
            }
        }
        // Slow path: walk the DOM to canonicalize all placeholder forms.
        const parts = [];
        for (let i = 0; i < el.childNodes.length; i++) {
            collectStableText(el.childNodes[i], parts);
        }
        return parts.join('');
    }
    /**
     * Combines getStableTextContent and normalizeText into a single call.
     * Used wherever element text is computed for hashing or comparison.
     */
    function getStableNormalizedText(el) {
        return getStableTextContent(el).trim().replace(/\s+/g, ' ');
    }

    /**
     * Creates an AnchorDescriptor for a given DOM element.
     */
    function createDescriptor(el) {
        const tag = el.tagName;
        const normalizedText = getStableNormalizedText(el);
        // Find nearest parent with an ID
        let parentId;
        let parent = el.parentElement;
        while (parent) {
            if (parent.id) {
                parentId = parent.id;
                break;
            }
            parent = parent.parentElement;
        }
        // Calculate index relative to the container
        const container = parent || document.body;
        const siblings = Array.from(container.querySelectorAll(tag));
        const index = siblings.indexOf(el);
        const descriptor = {
            tag,
            index: index !== -1 ? index : 0,
            textSnippet: normalizedText.substring(0, 32),
            textHash: hashCode(normalizedText),
            elementId: el.id,
        };
        if (parentId) {
            descriptor.parentId = parentId;
        }
        return descriptor;
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const COLOR_KEYS = new Set(HIGHLIGHT_COLORS.map((c) => c.key));
    const CORNER_KEYS = new Set(ANNOTATION_CORNERS);
    /**
     * Serializes a list of AnchorDescriptors into a URL-safe string.
     */
    function serialize(descriptors) {
        // Check if we can use human-readable format that only uses IDs
        // AnchorDescriptor carries the element's OWN id optionally.
        const minified = descriptors.map((d) => ({
            t: d.tag,
            i: d.index,
            p: d.parentId,
            s: d.textSnippet,
            h: d.textHash,
            id: d.elementId,
            ...(d.color && d.color !== DEFAULT_COLOR_KEY ? { c: d.color } : {}),
            ...(d.annotationCorner && d.annotationCorner !== DEFAULT_ANNOTATION_CORNER ? { nc: d.annotationCorner } : {}),
            ...(d.annotation ? { n: d.annotation } : {}),
        }));
        // When all elements have stable IDs, use a human-readable format.
        // Annotations are encoded via encodeURIComponent so the format stays URL-readable.
        // Format per element:
        //   no color, no note  → "id"
        //   color only         → "id:color"
        //   corner only        → "id::corner"
        //   color + corner     → "id:color:corner"
        //   color + note       → "id:color:corner:encodedNote"  (always 4 parts)
        //   note, no color     → "id::corner:encodedNote"
        const allHaveIds = minified.every((m) => !!m.id);
        if (allHaveIds) {
            return minified.map((m) => {
                const id = m.id;
                const c = m.c ?? '';
                const n = m.n;
                const nc = m.nc;
                if (n) {
                    return `${id}:${c}:${nc ?? DEFAULT_ANNOTATION_CORNER}:${encodeURIComponent(n)}`;
                }
                if (nc) {
                    return `${id}:${c}:${nc}`;
                }
                return c ? `${id}:${c}` : id;
            }).join(',');
        }
        const json = JSON.stringify(minified);
        // Modern UTF-8 safe Base64 encoding
        try {
            const bytes = new TextEncoder().encode(json);
            const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join('');
            return btoa(binString);
        }
        catch (e) {
            console.error('Failed to encode anchor:', e);
            throw new Error('Failed to generate link signature.');
        }
    }
    /**
     * Deserializes a URL-safe string back into a list of AnchorDescriptors.
     */
    function deserialize(encoded) {
        if (!encoded)
            return [];
        // Heuristic: If it contains spaces, it's definitely a list of IDs (Base64 doesn't have spaces)
        if (encoded.includes(' ')) {
            return parseIds(encoded);
        }
        // Heuristic: Check for characters invalid in standard Base64 (btoa uses +/)
        // Common IDs use - or _ or . which are not in Base64
        const isBase64Candidate = /^[A-Za-z0-9+/]*={0,2}$/.test(encoded);
        if (!isBase64Candidate) {
            return parseIds(encoded);
        }
        try {
            // Modern UTF-8 safe Base64 decoding
            const binString = atob(encoded);
            const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
            const json = new TextDecoder().decode(bytes);
            const minified = JSON.parse(json);
            // Robustness: Ensure result is an array
            if (!Array.isArray(minified)) {
                throw new Error('Decoded JSON is not an array');
            }
            return minified.map((m) => {
                // Robustness: Ensure item is an object
                if (typeof m !== 'object' || m === null)
                    throw new Error('Item is not an object');
                const descriptor = {
                    tag: m.t,
                    index: m.i,
                    parentId: m.p,
                    textSnippet: m.s,
                    textHash: m.h,
                    elementId: m.id,
                };
                if (m.c)
                    descriptor.color = m.c;
                if (m.n) {
                    descriptor.annotation = m.n;
                    descriptor.annotationCorner = (m.nc ?? DEFAULT_ANNOTATION_CORNER);
                }
                else if (m.nc) {
                    descriptor.annotationCorner = m.nc;
                }
                return descriptor;
            });
        }
        catch {
            // This handles cases where an ID string happens to look like Base64 but does not match the expected schema
            return parseIds(encoded);
        }
    }
    /**
     * Parses a space-separated, plus-separated, or comma-separated list of IDs into a list of AnchorDescriptors.
     * Supports:
     *   "id"                        — ID only
     *   "id:color"                  — with color
     *   "id:color:corner"           — color + corner, no note
     *   "id::corner"                — corner only, no color, no note
     *   "id:color:corner:note"      — with color + annotation (note is percent-encoded)
     *   "id::corner:note"           — annotation, no color
     */
    function parseIds(encoded) {
        const parts = encoded.split(/[ +,]+/).filter((p) => p.length > 0);
        return parts.map((part) => {
            // Split into at most 4 segments on ':'. The note segment (4th) is the
            // remainder so it can itself contain encoded colons (%3A).
            const segs = part.split(':');
            let id = part;
            let color;
            let annotation;
            let annotationCorner;
            if (segs.length >= 4) {
                // "id:color:corner:encodedNote..."
                id = segs[0];
                const colorSeg = segs[1];
                const cornerSeg = segs[2];
                const noteSeg = segs.slice(3).join(':'); // re-join in case of extra colons
                if (COLOR_KEYS.has(colorSeg))
                    color = colorSeg;
                annotationCorner = CORNER_KEYS.has(cornerSeg)
                    ? cornerSeg
                    : DEFAULT_ANNOTATION_CORNER;
                try {
                    annotation = decodeURIComponent(noteSeg);
                }
                catch {
                    annotation = noteSeg;
                }
            }
            else if (segs.length === 3) {
                // "id:color:corner" — corner without note
                id = segs[0];
                const colorSeg = segs[1];
                const cornerSeg = segs[2];
                if (COLOR_KEYS.has(colorSeg))
                    color = colorSeg;
                if (CORNER_KEYS.has(cornerSeg))
                    annotationCorner = cornerSeg;
            }
            else if (segs.length === 2) {
                // "id:color"
                const colorSeg = segs[1];
                if (COLOR_KEYS.has(colorSeg)) {
                    id = segs[0];
                    color = colorSeg;
                }
            }
            const descriptor = {
                tag: 'ANY',
                index: 0,
                textSnippet: '',
                textHash: 0,
                elementId: id,
            };
            if (color !== undefined)
                descriptor.color = color;
            if (annotation !== undefined)
                descriptor.annotation = annotation;
            if (annotationCorner !== undefined)
                descriptor.annotationCorner = annotationCorner;
            return descriptor;
        });
    }

    const SCORE_EXACT_HASH = 50;
    const SCORE_SNIPPET_START = 30;
    const SCORE_INDEX_MATCH = 10;
    const SCORE_PERFECT = 60;
    const SCORE_THRESHOLD = 30;
    /**
     * Finds the best DOM element match(es) for a descriptor.
     * Returns an array of elements. For specific descriptors, usually contains 0 or 1 element.
     * For ID-only descriptors (tag='ANY'), may return multiple if duplicates exist.
     */
    function resolve(root, descriptor) {
        // 0. Direct ID Shortcut
        if (descriptor.elementId) {
            // Always support duplicate IDs for consistency, even if technically invalid HTML.
            const all = document.querySelectorAll(`[id="${CSS.escape(descriptor.elementId)}"]`);
            if (all.length > 0)
                return Array.from(all);
            // If not found by ID (and it's a manual ID-only request), stop search.
            if (descriptor.tag === 'ANY')
                return [];
        }
        // 1. Determine Scope
        let scope = root;
        // Optimization: If parentId exists, try to narrow scope immediately
        if (descriptor.parentId) {
            const foundParent = root.querySelector(`#${descriptor.parentId}`);
            if (foundParent instanceof HTMLElement) {
                scope = foundParent;
            }
            else {
                const globalParent = document.getElementById(descriptor.parentId);
                if (globalParent) {
                    scope = globalParent;
                }
            }
        }
        // 2. Candidate Search & Scoring
        const candidates = scope.querySelectorAll(descriptor.tag);
        // Optimization: Structural Check First (Fastest)
        // If we trust the structure hasn't changed, the element at the specific index
        // is effectively O(1) access if we assume `querySelectorAll` order is stable.
        // Cache the computed text so the full scan can reuse it if this check fails.
        let indexCandidateText = null;
        if (candidates[descriptor.index]) {
            const candidate = candidates[descriptor.index];
            indexCandidateText = getStableNormalizedText(candidate);
            // Perfect Match Check: If index + hash match, it's virtually guaranteed.
            // This avoids checking every other candidate.
            if (hashCode(indexCandidateText) === descriptor.textHash) {
                return [candidate];
            }
        }
        // Fallback: Full scan if structural match failed (element moved/deleted/inserted)
        let bestMatch = null;
        let highestScore = 0;
        // Use loop with break ability for optimization
        for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            let score = 0;
            // Reuse already-computed text for the index candidate to avoid duplicate DOM walk.
            const text = i === descriptor.index && indexCandidateText !== null
                ? indexCandidateText
                : getStableNormalizedText(candidate);
            // Content Match
            if (hashCode(text) === descriptor.textHash) {
                score += SCORE_EXACT_HASH;
            }
            else if (text.startsWith(descriptor.textSnippet)) {
                score += SCORE_SNIPPET_START;
            }
            // Structural Match (Re-calculated index)
            if (i === descriptor.index) {
                score += SCORE_INDEX_MATCH;
            }
            // Early Exit: If we find a very high score (Hash + Index), we can stop.
            if (score >= SCORE_PERFECT) {
                return [candidate];
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = candidate;
            }
        }
        // Threshold check
        return highestScore > SCORE_THRESHOLD && bestMatch ? [bestMatch] : [];
    }

    const DEFAULT_EXCLUDED_TAGS = ['HEADER', 'NAV', 'FOOTER', 'SCRIPT', 'STYLE'];
    const DEFAULT_EXCLUDED_IDS = [];
    const CV_SHARE_IGNORE_ATTRIBUTE = 'data-cv-share-ignore';

    const CV_CUSTOM_ELEMENTS = 'cv-tabgroup, cv-toggle';
    const SHAREABLE_SELECTOR = 'div, p, blockquote, pre, li, h1, h2, h3, h4, h5, h6, table, span, tr, ' + CV_CUSTOM_ELEMENTS;
    const SELECTED_CLASS = 'cv-share-selected';
    const HIGHLIGHT_TARGET_CLASS = 'cv-highlight-target';
    const HIDE_SELECTED_CLASS = 'cv-share-selected-hide';
    const HIDE_HIGHLIGHT_TARGET_CLASS = 'cv-highlight-target-hide';
    const HIGHLIGHT_SELECTED_CLASS = 'cv-share-selected-highlight';
    const HIGHLIGHT_TARGET_MODE_CLASS = 'cv-highlight-target-mode';
    // IDs that should be treated as generic wrappers even if they are unique
    const GENERIC_WRAPPER_IDS = ['flex-body', 'content-wrapper', 'app'];
    /**
     * Determines if an element is a generic div wrapper (like a div used for layout)
     * that should effectively be "ignored" or treated transparently during selection.
     */
    function isGenericWrapper(el) {
        // Check for explicit generic IDs (layout wrappers)
        if (el.id && GENERIC_WRAPPER_IDS.includes(el.id))
            return true;
        if (el.tagName !== 'DIV')
            return false;
        if (el.id)
            return false;
        const style = window.getComputedStyle(el);
        const hasBackground = style.backgroundColor &&
            style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
            style.backgroundColor !== 'transparent';
        const hasBorder = style.borderStyle && style.borderStyle !== 'none' && parseFloat(style.borderWidth) > 0;
        const hasShadow = style.boxShadow && style.boxShadow !== 'none';
        return !hasBackground && !hasBorder && !hasShadow;
    }
    /**
     * Calculates the new set of selected elements based on the current selection
     * and the new element to toggle/select.
     *
     * Implements the logic:
     * 1. If an ancestor is already selected, ignore the new selection (Scenario B).
     * 2. If children of the new selection are already selected, remove them (Scenario A) and add the new one.
     * 3. Otherwise, just add the new one.
     */
    function calculateNewSelection(currentSelection, newElement) {
        // Create a copy to modify
        const nextSelection = new SvelteSet(currentSelection);
        // 0. Toggle off if already present
        if (nextSelection.has(newElement)) {
            nextSelection.delete(newElement);
            return { updatedSelection: nextSelection, changesMade: true };
        }
        // 1. Check if ancestor is selected (Scenario B)
        // Guard Check -> element toggled should not have an ancestor in the selection technically
        let parent = newElement.parentElement;
        let ancestorSelected = false;
        while (parent) {
            if (nextSelection.has(parent)) {
                ancestorSelected = true;
                break;
            }
            parent = parent.parentElement;
        }
        if (ancestorSelected) {
            return { updatedSelection: currentSelection, changesMade: false }; // No change
        }
        // 2. NewElement is the parent of an element in the selection.
        //  Remove children if selected (Scenario A)
        const toRemove = [];
        nextSelection.forEach((selected) => {
            if (newElement.contains(selected) && newElement !== selected) {
                toRemove.push(selected);
            }
        });
        toRemove.forEach((child) => {
            nextSelection.delete(child);
        });
        // Add
        nextSelection.add(newElement);
        return { updatedSelection: nextSelection, changesMade: true };
    }
    /**
     * Checks if an element or any of its ancestors should be excluded from sharing.
     * @param element The element to check
     * @param excludedTags Set of tag names to exclude
     * @param excludedIds Set of IDs to exclude
     */
    function isExcluded(element, excludedTags, excludedIds) {
        let current = element;
        while (current) {
            // 1. Check for the standardized ignore attribute
            if (current.hasAttribute(CV_SHARE_IGNORE_ATTRIBUTE)) {
                return true;
            }
            // 2. Check for excluded tags
            if (excludedTags && excludedTags.has(current.tagName.toUpperCase())) {
                return true;
            }
            // 3. Check for excluded IDs
            if (excludedIds && current.id && excludedIds.has(current.id)) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }

    /* share-store.svelte.ts generated by Svelte v5.46.1 */

    class ShareStore {
    	#isActive = state(false);

    	get isActive() {
    		return get(this.#isActive);
    	}

    	set isActive(value) {
    		set(this.#isActive, value, true);
    	}

    	#selectionMode = state('highlight');

    	get selectionMode() {
    		return get(this.#selectionMode);
    	}

    	set selectionMode(value) {
    		set(this.#selectionMode, value, true);
    	}

    	#selectedElements = state(proxy(new SvelteSet()));

    	get selectedElements() {
    		return get(this.#selectedElements);
    	}

    	set selectedElements(value) {
    		set(this.#selectedElements, value, true);
    	}

    	#currentHoverTarget = state(null);

    	get currentHoverTarget() {
    		return get(this.#currentHoverTarget);
    	}

    	set currentHoverTarget(value) {
    		set(this.#currentHoverTarget, value, true);
    	}

    	highlightColors = new SvelteMap();
    	highlightAnnotations = new SvelteMap();
    	#shareCount = user_derived(() => this.selectedElements.size);

    	get shareCount() {
    		return get(this.#shareCount);
    	}

    	set shareCount(value) {
    		set(this.#shareCount, value);
    	}

    	toggleActive(active) {
    		const newState = active !== undefined ? active : !this.isActive;

    		if (!newState) {
    			// Cleanup on deactivate
    			this.clearAllSelections();

    			if (this.currentHoverTarget) {
    				this._removeHighlightClass(this.currentHoverTarget);
    			}

    			// Reset state
    			this.isActive = false;

    			this.currentHoverTarget = null;
    			document.body.classList.remove('cv-share-active-show', 'cv-share-active-hide', 'cv-share-active-highlight');
    		} else {
    			this.isActive = true;
    			this.updateBodyClass();
    		}
    	}

    	setSelectionMode(mode) {
    		if (this.selectionMode === mode) return;

    		this.selectionMode = mode;

    		// Update styling for all currently selected elements
    		this.selectedElements.forEach((el) => {
    			this._removeSelectionClass(el);
    			this._addSelectionClass(el);
    		});

    		if (this.isActive) {
    			this.updateBodyClass();
    		}
    	}

    	updateBodyClass() {
    		document.body.classList.remove('cv-share-active-show', 'cv-share-active-hide', 'cv-share-active-highlight');
    		document.body.classList.add(`cv-share-active-${this.selectionMode}`);
    	}

    	setHoverTarget(target) {
    		// Clear previous highlight
    		if (this.currentHoverTarget && this.currentHoverTarget !== target) {
    			this._removeHighlightClass(this.currentHoverTarget);
    		}

    		// Set new highlight
    		if (target) {
    			this._addHighlightClass(target);
    		}

    		this.currentHoverTarget = target;
    	}

    	toggleElementSelection(el) {
    		const { updatedSelection, changesMade } = calculateNewSelection(this.selectedElements, el);

    		if (changesMade) {
    			// We need to sync the classes on the DOM elements
    			// 1. Remove classes from elements that are no longer selected
    			this.selectedElements.forEach((oldEl) => {
    				if (!updatedSelection.has(oldEl)) {
    					this._removeSelectionClass(oldEl);
    					this.highlightColors.delete(oldEl);
    					this.highlightAnnotations.delete(oldEl);
    				}
    			});

    			// 2. Add classes to elements that are newly selected
    			updatedSelection.forEach((newEl) => {
    				if (!this.selectedElements.has(newEl)) {
    					this._addSelectionClass(newEl);
    				}
    			});

    			// 3. Update the state
    			this.selectedElements = updatedSelection;
    		}
    	}

    	toggleMultipleElements(elements) {
    		// TODO: Optimization: we could batch this in logic if needed, but simple iteration works for now
    		for (const el of elements) {
    			this.toggleElementSelection(el);
    		}
    	}

    	clearAllSelections() {
    		this.selectedElements.forEach((el) => this._removeSelectionClass(el));
    		this.selectedElements.clear();
    		this.highlightColors.clear();
    		this.highlightAnnotations.clear();
    	}

    	setAnnotation(el, text, corner) {
    		const trimmed = text.trim();

    		if (trimmed.length === 0) {
    			if (corner !== DEFAULT_ANNOTATION_CORNER) {
    				this.highlightAnnotations.set(el, { text: '', corner });
    			} else {
    				this.highlightAnnotations.delete(el);
    			}
    		} else {
    			const validatedText = trimmed.length > MAX_ANNOTATION_LENGTH ? trimmed.substring(0, MAX_ANNOTATION_LENGTH) : trimmed;

    			this.highlightAnnotations.set(el, { text: validatedText, corner });
    		}
    	}

    	setHighlightColor(el, color) {
    		this.highlightColors.set(el, color);
    	}

    	setAllHighlightColors(color) {
    		this.selectedElements.forEach((el) => {
    			this.highlightColors.set(el, color);
    		});
    	}

    	_addHighlightClass(el) {
    		if (this.selectionMode === 'hide') {
    			el.classList.add(HIDE_HIGHLIGHT_TARGET_CLASS);
    		} else if (this.selectionMode === 'highlight') {
    			el.classList.add(HIGHLIGHT_TARGET_MODE_CLASS);
    		} else {
    			el.classList.add(HIGHLIGHT_TARGET_CLASS);
    		}
    	}

    	_removeHighlightClass(el) {
    		el.classList.remove(HIGHLIGHT_TARGET_CLASS, HIDE_HIGHLIGHT_TARGET_CLASS, HIGHLIGHT_TARGET_MODE_CLASS);
    	}

    	_addSelectionClass(el) {
    		if (this.selectionMode === 'hide') {
    			el.classList.add(HIDE_SELECTED_CLASS);
    		} else if (this.selectionMode === 'highlight') {
    			el.classList.add(HIGHLIGHT_SELECTED_CLASS);
    		} else {
    			el.classList.add(SELECTED_CLASS);
    		}
    	}

    	_removeSelectionClass(el) {
    		el.classList.remove(SELECTED_CLASS, HIDE_SELECTED_CLASS, HIGHLIGHT_SELECTED_CLASS);
    	}

    	generateLink() {
    		if (this.selectedElements.size === 0) {
    			showToast('Please select at least one item.');

    			return;
    		}

    		const descriptors = this._buildDescriptors();
    		let serialized;

    		try {
    			serialized = serialize(descriptors);
    		} catch {
    			showToast('Failed to generate link. Please try selecting fewer items.');

    			return;
    		}

    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const url = new URL(window.location.href);

    		// Clear all potential params first
    		url.searchParams.delete('cv-show');

    		url.searchParams.delete('cv-hide');
    		url.searchParams.delete('cv-highlight');

    		if (this.selectionMode === 'hide') {
    			url.searchParams.set('cv-hide', serialized);
    		} else if (this.selectionMode === 'highlight') {
    			url.searchParams.set('cv-highlight', serialized);
    		} else {
    			url.searchParams.set('cv-show', serialized);
    		}

    		// Copy to clipboard
    		navigator.clipboard.writeText(url.href).then(() => {
    			showToast('Link copied to clipboard!');
    		}).catch(() => {
    			showToast('Failed to copy to clipboard');
    		});
    	}

    	previewLink() {
    		if (this.selectedElements.size === 0) {
    			showToast('Please select at least one item.');

    			return;
    		}

    		const descriptors = this._buildDescriptors();
    		const serialized = serialize(descriptors);

    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const url = new URL(window.location.href);

    		url.searchParams.delete('cv-show');
    		url.searchParams.delete('cv-hide');
    		url.searchParams.delete('cv-highlight');

    		if (this.selectionMode === 'hide') {
    			url.searchParams.set('cv-hide', serialized);
    		} else if (this.selectionMode === 'highlight') {
    			url.searchParams.set('cv-highlight', serialized);
    		} else {
    			url.searchParams.set('cv-show', serialized);
    		}

    		window.open(url.toString(), '_blank');
    	}

    	_buildDescriptors() {
    		return Array.from(this.selectedElements).map((el) => {
    			const desc = createDescriptor(el);

    			if (this.selectionMode === 'highlight') {
    				const color = this.highlightColors.get(el);

    				if (color !== undefined) desc.color = color;

    				const annotation = this.highlightAnnotations.get(el);

    				if (annotation !== undefined) {
    					desc.annotation = annotation.text;
    					desc.annotationCorner = annotation.corner;
    				}
    			}

    			return desc;
    		});
    	}
    }

    const shareStore = new ShareStore();

    /* focus-store.svelte.ts generated by Svelte v5.46.1 */

    class FocusStore {
    	#isActive = state(false);

    	get isActive() {
    		return get(this.#isActive);
    	}

    	set isActive(value) {
    		set(this.#isActive, value, true);
    	}

    	setIsActive(isActive) {
    		this.isActive = isActive;
    	}

    	/**
    	 * Signals intent to exit focus mode.
    	 * Logic is handled by the service observing this state.
    	 */
    	exit() {
    		this.isActive = false;
    	}
    }

    const focusStore = new FocusStore();

    enable_legacy_mode_flag();

    /*
    Adapted from https://github.com/mattdesl
    Distributed under MIT License https://github.com/mattdesl/eases/blob/master/LICENSE.md
    */


    /**
     * @param {number} t
     * @returns {number}
     */
    function cubicOut(t) {
    	const f = t - 1.0;
    	return f * f * f + 1.0;
    }

    /** @import { FlipParams, AnimationConfig } from './public.js' */

    /**
     * The flip function calculates the start and end position of an element and animates between them, translating the x and y values.
     * `flip` stands for [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/).
     *
     * @param {Element} node
     * @param {{ from: DOMRect; to: DOMRect }} fromTo
     * @param {FlipParams} params
     * @returns {AnimationConfig}
     */
    function flip(node, { from, to }, params = {}) {
    	var { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;

    	var style = getComputedStyle(node);

    	// find the transform origin, expressed as a pair of values between 0 and 1
    	var transform = style.transform === 'none' ? '' : style.transform;
    	var [ox, oy] = style.transformOrigin.split(' ').map(parseFloat);
    	ox /= node.clientWidth;
    	oy /= node.clientHeight;

    	// calculate effect of parent transforms and zoom
    	var zoom = get_zoom(node); // https://drafts.csswg.org/css-viewport/#effective-zoom
    	var sx = node.clientWidth / to.width / zoom;
    	var sy = node.clientHeight / to.height / zoom;

    	// find the starting position of the transform origin
    	var fx = from.left + from.width * ox;
    	var fy = from.top + from.height * oy;

    	// find the ending position of the transform origin
    	var tx = to.left + to.width * ox;
    	var ty = to.top + to.height * oy;

    	// find the translation at the start of the transform
    	var dx = (fx - tx) * sx;
    	var dy = (fy - ty) * sy;

    	// find the relative scale at the start of the transform
    	var dsx = from.width / to.width;
    	var dsy = from.height / to.height;

    	return {
    		delay,
    		duration: typeof duration === 'function' ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
    		easing,
    		css: (t, u) => {
    			var x = u * dx;
    			var y = u * dy;
    			var sx = t + u * dsx;
    			var sy = t + u * dsy;

    			return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
    		}
    	};
    }

    /**
     * @param {Element} element
     */
    function get_zoom(element) {
    	if ('currentCSSZoom' in element) {
    		return /** @type {number} */ (element.currentCSSZoom);
    	}

    	/** @type {Element | null} */
    	var current = element;
    	var zoom = 1;

    	while (current !== null) {
    		zoom *= +getComputedStyle(current).zoom;
    		current = /** @type {Element | null} */ (current.parentElement);
    	}

    	return zoom;
    }

    var root_1$b = from_html(`<div role="alert" aria-live="polite"> </div>`);
    var root$g = from_html(`<div class="toast-container svelte-14irt8g"></div>`);

    const $$css$i = {
    	hash: 'svelte-14irt8g',
    	code: '.toast-container.svelte-14irt8g {position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:20000;display:flex;flex-direction:column;align-items:center;gap:10px;pointer-events:none; /* Let clicks pass through container */}.toast-item.svelte-14irt8g {background:rgba(0, 0, 0, 0.85);color:white;padding:10px 20px;border-radius:4px;font-size:14px;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);pointer-events:auto; /* Re-enable clicks on toasts */max-width:300px;text-align:center;}'
    };

    function Toast($$anchor, $$props) {
    	push($$props, false);
    	append_styles$1($$anchor, $$css$i);
    	init();

    	var div = root$g();

    	each(div, 13, () => toast.items, (t) => t.id, ($$anchor, t) => {
    		var div_1 = root_1$b();
    		var text = child(div_1, true);

    		reset(div_1);

    		template_effect(() => {
    			set_class(div_1, 1, `${TOAST_CLASS} toast-item`, 'svelte-14irt8g');
    			set_text(text, get(t).message);
    		});

    		transition(1, div_1, () => fly, () => ({ y: -20, duration: 300 }));
    		transition(2, div_1, () => fade, () => ({ duration: 200 }));
    		animation(div_1, () => flip, null);
    		append($$anchor, div_1);
    	});

    	reset(div);
    	append($$anchor, div);
    	pop();
    }

    var root$f = from_html(`<div class="floating-bar svelte-bs8cbd"><div class="mode-toggle svelte-bs8cbd"><button type="button" title="Highlight selected elements">Highlight</button> <button type="button" title="Show only selected elements">Show</button> <button type="button" title="Hide selected elements">Hide</button></div> <span class="divider svelte-bs8cbd"></span> <span class="count svelte-bs8cbd"> </span> <button type="button" class="btn clear svelte-bs8cbd">Clear</button> <button type="button" class="btn preview svelte-bs8cbd">Preview</button> <button type="button" class="btn generate svelte-bs8cbd">Copy Link</button> <button type="button" class="btn exit svelte-bs8cbd">Exit</button></div>`);

    const $$css$h = {
    	hash: 'svelte-bs8cbd',
    	code: '.floating-bar.svelte-bs8cbd {position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background-color:#2c2c2c;color:#f1f1f1;border-radius:8px;padding:8px 12px;box-shadow:0 8px 20px rgba(0, 0, 0, 0.4);display:grid;grid-template-columns:auto auto 1fr auto auto auto auto;align-items:center;gap:12px;z-index:99999;font-family:system-ui,\n      -apple-system,\n      sans-serif;font-size:14px;border:1px solid #4a4a4a;pointer-events:auto;white-space:nowrap;min-width:500px;}.mode-toggle.svelte-bs8cbd {display:flex;background:#1a1a1a;border-radius:6px;padding:2px;border:1px solid #4a4a4a;}.mode-btn.svelte-bs8cbd {background:transparent;color:#aeaeae;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-weight:500;font-size:13px;transition:all 0.2s;}.mode-btn.svelte-bs8cbd:hover {color:#fff;}.mode-btn.active.svelte-bs8cbd {background:#4a4a4a;color:#fff;box-shadow:0 1px 3px rgba(0, 0, 0, 0.2);}.divider.svelte-bs8cbd {width:1px;height:20px;background:#4a4a4a;margin:0 4px;}.count.svelte-bs8cbd {font-weight:500;min-width:120px;text-align:center;font-size:13px;color:#ccc;}.btn.svelte-bs8cbd {background-color:#0078d4;color:white;border:none;padding:6px 12px;border-radius:5px;cursor:pointer;font-weight:500;transition:background-color 0.2s;font-size:13px;}.btn.svelte-bs8cbd:hover {background-color:#005a9e;}.btn.clear.svelte-bs8cbd {background-color:transparent;border:1px solid #5a5a5a;color:#dadada;}.btn.clear.svelte-bs8cbd:hover {background-color:#3a3a3a;color:white;}.btn.preview.svelte-bs8cbd {background-color:#333;border:1px solid #555;}.btn.preview.svelte-bs8cbd:hover {background-color:#444;}.btn.exit.svelte-bs8cbd {background-color:transparent;color:#ff6b6b;padding:6px 10px;}.btn.exit.svelte-bs8cbd:hover {background-color:rgba(255, 107, 107, 0.1);}\n\n  @media (max-width: 600px) {.floating-bar.svelte-bs8cbd {display:flex;flex-wrap:wrap;min-width:unset;width:90%;max-width:400px;height:auto;padding:12px;gap:10px;bottom:30px;}.mode-toggle.svelte-bs8cbd {margin-right:auto;order:1;}.btn.exit.svelte-bs8cbd {margin-left:auto;order:2;}.divider.svelte-bs8cbd {display:none;}.count.svelte-bs8cbd {width:100%;text-align:center;order:3;padding:8px 0;border-top:1px solid #3a3a3a;border-bottom:1px solid #3a3a3a;margin:4px 0;}.btn.clear.svelte-bs8cbd,\n    .btn.preview.svelte-bs8cbd,\n    .btn.generate.svelte-bs8cbd {flex:1;text-align:center;font-size:12px;padding:8px 4px;order:4;}.btn.generate.svelte-bs8cbd {flex:1.5;}\n  }'
    };

    function ShareToolbar($$anchor, $$props) {
    	push($$props, false);
    	append_styles$1($$anchor, $$css$h);

    	function handleClear() {
    		shareStore.clearAllSelections();
    	}

    	function handlePreview() {
    		shareStore.previewLink();
    	}

    	function handleGenerate() {
    		shareStore.generateLink();
    	}

    	function handleExit() {
    		shareStore.toggleActive(false);
    	}

    	init();

    	var div = root$f();
    	var div_1 = child(div);
    	var button = child(div_1);

    	button.__click = () => shareStore.setSelectionMode('highlight');

    	var button_1 = sibling(button, 2);

    	button_1.__click = () => shareStore.setSelectionMode('show');

    	var button_2 = sibling(button_1, 2);

    	button_2.__click = () => shareStore.setSelectionMode('hide');
    	reset(div_1);

    	var span = sibling(div_1, 4);
    	var text = child(span);

    	reset(span);

    	var button_3 = sibling(span, 2);

    	button_3.__click = handleClear;

    	var button_4 = sibling(button_3, 2);

    	button_4.__click = handlePreview;

    	var button_5 = sibling(button_4, 2);

    	button_5.__click = handleGenerate;

    	var button_6 = sibling(button_5, 2);

    	button_6.__click = handleExit;
    	reset(div);

    	template_effect(() => {
    		set_class(button, 1, `mode-btn ${shareStore.selectionMode === 'highlight' ? 'active' : ''}`, 'svelte-bs8cbd');
    		set_attribute(button, 'aria-pressed', shareStore.selectionMode === 'highlight');
    		set_class(button_1, 1, `mode-btn ${shareStore.selectionMode === 'show' ? 'active' : ''}`, 'svelte-bs8cbd');
    		set_attribute(button_1, 'aria-pressed', shareStore.selectionMode === 'show');
    		set_class(button_2, 1, `mode-btn ${shareStore.selectionMode === 'hide' ? 'active' : ''}`, 'svelte-bs8cbd');
    		set_attribute(button_2, 'aria-pressed', shareStore.selectionMode === 'hide');

    		set_text(text, `${shareStore.shareCount ?? ''} item${shareStore.shareCount === 1 ? '' : 's'} to
    ${shareStore.selectionMode === 'show'
			? 'show'
			: shareStore.selectionMode === 'highlight' ? 'highlight' : 'hide'}`);
    	});

    	transition(3, div, () => fly, () => ({ y: 50, duration: 200 }));
    	append($$anchor, div);
    	pop();
    }

    delegate(['click']);

    var root_2$7 = from_html(`<span class="id-badge svelte-64gpkh" title="ID detection active"> </span>`);
    var root_3$5 = from_html(`<button type="button" class="action-btn up svelte-64gpkh" title="Select Parent">↰</button>`);
    var root_1$a = from_html(`<div class="hover-helper svelte-64gpkh"><div class="info svelte-64gpkh"><span class="tag svelte-64gpkh"> </span> <!></div> <button type="button"> </button> <!></div>`);

    const $$css$g = {
    	hash: 'svelte-64gpkh',
    	code: '.hover-helper.svelte-64gpkh {position:fixed;z-index:99999;background-color:#333;color:white;padding:4px 8px;border-radius:4px;display:flex;align-items:center;gap:8px;box-shadow:0 2px 5px rgba(0, 0, 0, 0.2);font-family:monospace;pointer-events:auto;}.info.svelte-64gpkh {display:flex;flex-direction:column;align-items:flex-start;line-height:1;gap:2px;}.tag.svelte-64gpkh {font-size:12px;font-weight:bold;color:#aeaeae;}.id-badge.svelte-64gpkh {font-size:10px;color:#64d2ff;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.action-btn.svelte-64gpkh {background:#555;border:none;color:white;border-radius:3px;cursor:pointer;padding:2px 6px;font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background-color 0.1s;}.action-btn.svelte-64gpkh:hover {background:#777;}.action-btn.deselect.svelte-64gpkh {background-color:#d13438;}.action-btn.deselect.svelte-64gpkh:hover {background-color:#a42628;}'
    };

    function HoverHelper($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$g);

    	// Derived state for easier access
    	let target = user_derived(() => shareStore.currentHoverTarget);

    	let isSelected = user_derived(() => get(target) && shareStore.selectedElements.has(get(target)));

    	// Computed Position using effect for DOM layout properties
    	let style = state('display: none;');

    	let tagName = state('TAG');
    	let elementId = state(null);
    	let canGoUp = state(false);
    	let lastSavedHelperPosition = state(null);

    	function findNextShareableParent(el) {
    		let parent = el.parentElement;

    		while (parent) {
    			if (parent.matches(SHAREABLE_SELECTOR) && !isGenericWrapper(parent)) {
    				return parent;
    			}

    			parent = parent.parentElement;
    		}

    		return null;
    	}

    	user_effect(() => {
    		const t = shareStore.currentHoverTarget;

    		if (t) {
    			// Use untrack to prevent the reset of lastSavedHelperPosition from re-triggering this effect
    			const savedPosition = untrack(() => get(lastSavedHelperPosition));

    			if (savedPosition) {
    				// Apply the saved position (from clicking "Up") to keep the UI stable
    				set(style, savedPosition, true);

    				set(lastSavedHelperPosition, null // Consume so subsequent hovers update normally
    				);
    			} else {
    				// Standard positioning logic: calculate based on the target element
    				const rect = t.getBoundingClientRect();

    				let top = rect.top - 23; // Closer to element (was -28)

    				if (top < 0) top = rect.top + 5;

    				let left = rect.right - 80;

    				if (left < 10) left = 10;

    				// Ensure it doesn't go off right edge
    				if (left + 100 > window.innerWidth) {
    					left = window.innerWidth - 110;
    				}

    				set(style, `top: ${top}px; left: ${left}px;`);
    			}

    			set(tagName, t.tagName, true);
    			set(elementId, t.id || null, true);
    			set(canGoUp, !!findNextShareableParent(t));
    		} else {
    			set(style, 'display: none;');
    			set(lastSavedHelperPosition, null);
    		}
    	});

    	function handleSelect(e) {
    		e.stopPropagation();

    		if (get(target)) shareStore.toggleElementSelection(get(target));
    	}

    	let helperWidth = state(0);

    	function handleSelectParent(e) {
    		e.stopPropagation();

    		if (!get(target)) return;

    		const parent = findNextShareableParent(get(target));

    		if (parent) {
    			// Pin current style + min-width to prevent shrinking under cursor
    			set(lastSavedHelperPosition, `${get(style)} min-width: ${get(helperWidth)}px;`);

    			shareStore.setHoverTarget(parent);
    		}
    	}

    	var fragment = comment();
    	var node = first_child(fragment);

    	{
    		var consequent_2 = ($$anchor) => {
    			var div = root_1$a();
    			var div_1 = child(div);
    			var span = child(div_1);
    			var text = child(span, true);

    			reset(span);

    			var node_1 = sibling(span, 2);

    			{
    				var consequent = ($$anchor) => {
    					var span_1 = root_2$7();
    					var text_1 = child(span_1);

    					reset(span_1);
    					template_effect(() => set_text(text_1, `#${get(elementId) ?? ''}`));
    					append($$anchor, span_1);
    				};

    				if_block(node_1, ($$render) => {
    					if (get(elementId)) $$render(consequent);
    				});
    			}

    			reset(div_1);

    			var button = sibling(div_1, 2);

    			button.__click = handleSelect;

    			var text_2 = child(button, true);

    			reset(button);

    			var node_2 = sibling(button, 2);

    			{
    				var consequent_1 = ($$anchor) => {
    					var button_1 = root_3$5();

    					button_1.__click = handleSelectParent;
    					append($$anchor, button_1);
    				};

    				if_block(node_2, ($$render) => {
    					if (get(canGoUp)) $$render(consequent_1);
    				});
    			}

    			reset(div);

    			template_effect(() => {
    				set_style(div, get(style));
    				set_text(text, get(tagName));
    				set_class(button, 1, `action-btn ${get(isSelected) ? 'deselect' : 'select'}`, 'svelte-64gpkh');
    				set_attribute(button, 'title', get(isSelected) ? 'Deselect' : 'Select');
    				set_text(text_2, get(isSelected) ? '✕' : '✓');
    			});

    			bind_element_size(div, 'clientWidth', ($$value) => set(helperWidth, $$value));
    			transition(3, div, () => fade, () => ({ duration: 100 }));
    			append($$anchor, div);
    		};

    		if_block(node, ($$render) => {
    			if (get(target)) $$render(consequent_2);
    		});
    	}

    	append($$anchor, fragment);
    	pop();
    }

    delegate(['click']);

    var root_2$6 = from_html(`<button type="button"></button>`);
    var root_1$9 = from_html(`<div class="cv-color-swatches svelte-1r78n4c" role="none"></div>`);
    var root$e = from_html(`<div class="cv-color-picker svelte-1r78n4c" role="none"><button type="button" class="cv-color-trigger svelte-1r78n4c" title="Choose highlight color" aria-label="Choose highlight color"><span class="cv-color-dot svelte-1r78n4c"></span></button> <!></div>`);

    const $$css$f = {
    	hash: 'svelte-1r78n4c',
    	code: '.cv-color-picker.svelte-1r78n4c {position:fixed;transform:translateX(-50%) translateY(-100%);display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:auto;z-index:9500;\n    /* Nudge down so the trigger peeks above the element edge */margin-top:8px;}.cv-color-trigger.svelte-1r78n4c {width:22px;height:16px;border-radius:100px;border:1.5px solid rgba(0, 0, 0, 0.18);background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:0 2px 8px rgba(0, 0, 0, 0.15);transition:box-shadow 0.15s;}.cv-color-trigger.svelte-1r78n4c:hover {box-shadow:0 3px 12px rgba(0, 0, 0, 0.22);}.cv-color-dot.svelte-1r78n4c {width:10px;height:10px;border-radius:50%;display:block;border:1px solid rgba(0, 0, 0, 0.12);}.cv-color-swatches.svelte-1r78n4c {display:flex;flex-direction:row;gap:4px;background:white;border-radius:100px;padding:4px 6px;box-shadow:0 4px 16px rgba(0, 0, 0, 0.18);border:1px solid rgba(0, 0, 0, 0.1);}.cv-color-swatch.svelte-1r78n4c {width:16px;height:16px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0;transition:transform 0.1s, border-color 0.1s;}.cv-color-swatch.svelte-1r78n4c:hover {transform:scale(1.2);border-color:rgba(0, 0, 0, 0.3);}.cv-color-swatch.active.svelte-1r78n4c {border-color:rgba(0, 0, 0, 0.5);transform:scale(1.15);}'
    };

    function HighlightColorPicker($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$f);

    	let isExpanded = state(false);
    	let rect = state(proxy({ top: 0, left: 0, width: 0 }));

    	user_effect(() => {
    		set(rect, $$props.element.getBoundingClientRect(), true);

    		const update = () => {
    			set(rect, $$props.element.getBoundingClientRect(), true);
    		};

    		window.addEventListener('scroll', update, { capture: true, passive: true });
    		window.addEventListener('resize', update, { passive: true });

    		return () => {
    			window.removeEventListener('scroll', update, { capture: true });
    			window.removeEventListener('resize', update);

    			if (clickTimer) clearTimeout(clickTimer);
    		};
    	});

    	let currentColorKey = user_derived(() => shareStore.highlightColors.get($$props.element) ?? DEFAULT_COLOR_KEY);
    	let currentHex = user_derived(() => HIGHLIGHT_COLORS.find((c) => c.key === get(currentColorKey))?.hex ?? HIGHLIGHT_COLORS[0].hex);
    	let clickTimer = null;

    	function handleTriggerClick(e) {
    		e.stopPropagation();
    		set(isExpanded, !get(isExpanded));
    	}

    	function handleSwatchClick(e, key) {
    		e.stopPropagation();

    		if (clickTimer) return; // defer to potential dblclick

    		clickTimer = setTimeout(
    			() => {
    				clickTimer = null;
    				shareStore.setHighlightColor($$props.element, key);
    				set(isExpanded, false);
    			},
    			220
    		);
    	}

    	function handleSwatchDblClick(e, key) {
    		e.stopPropagation();

    		if (clickTimer) {
    			clearTimeout(clickTimer);
    			clickTimer = null;
    		}

    		shareStore.setAllHighlightColors(key);
    		set(isExpanded, false);
    	}

    	let centerX = user_derived(() => get(rect).left + get(rect).width / 2);
    	let topY = user_derived(() => get(rect).top);
    	var div = root$e();
    	var button = child(div);

    	button.__click = handleTriggerClick;

    	var span = child(button);

    	reset(button);

    	var node = sibling(button, 2);

    	{
    		var consequent = ($$anchor) => {
    			var div_1 = root_1$9();

    			each(div_1, 21, () => HIGHLIGHT_COLORS, index, ($$anchor, color) => {
    				var button_1 = root_2$6();
    				let classes;

    				button_1.__click = (e) => handleSwatchClick(e, get(color).key);
    				button_1.__dblclick = (e) => handleSwatchDblClick(e, get(color).key);

    				template_effect(() => {
    					classes = set_class(button_1, 1, 'cv-color-swatch svelte-1r78n4c', null, classes, { active: get(currentColorKey) === get(color).key });
    					set_style(button_1, `background: ${get(color).hex ?? ''};`);
    					set_attribute(button_1, 'title', `${get(color).label ?? ''} · dbl-click to apply to all`);
    					set_attribute(button_1, 'aria-label', get(color).label);
    					set_attribute(button_1, 'aria-pressed', get(currentColorKey) === get(color).key);
    				});

    				append($$anchor, button_1);
    			});

    			reset(div_1);
    			append($$anchor, div_1);
    		};

    		if_block(node, ($$render) => {
    			if (get(isExpanded)) $$render(consequent);
    		});
    	}

    	reset(div);

    	template_effect(() => {
    		set_style(div, `left: ${get(centerX) ?? ''}px; top: ${get(topY) ?? ''}px;`);
    		set_attribute(button, 'aria-expanded', get(isExpanded));
    		set_style(span, `background: ${get(currentHex) ?? ''};`);
    	});

    	append($$anchor, div);
    	pop();
    }

    delegate(['click', 'dblclick']);

    var root_1$8 = from_html(`<span class="cv-annotation-tab-preview svelte-1r1spmr"> </span>`);
    var root_2$5 = from_html(`<span class="cv-annotation-tab-icon svelte-1r1spmr"> </span>`);
    var root_4$2 = from_html(`<button type="button"> </button>`);
    var root_3$4 = from_html(`<div class="cv-annotation-panel svelte-1r1spmr" role="none"><textarea class="cv-annotation-textarea svelte-1r1spmr" placeholder="Add a note…" rows="3"></textarea> <div class="cv-annotation-footer svelte-1r1spmr"><div class="cv-corner-selector svelte-1r1spmr" role="group" aria-label="Anchor corner"></div> <span class="cv-char-counter svelte-1r1spmr"> </span></div></div>`);
    var root$d = from_html(`<div class="cv-annotation-editor svelte-1r1spmr" role="none"><button type="button" aria-label="Annotation"><!></button> <!></div>`);

    const $$css$e = {
    	hash: 'svelte-1r1spmr',
    	code: '.cv-annotation-editor.svelte-1r1spmr {position:fixed;z-index:9400;pointer-events:auto;display:flex;flex-direction:column;align-items:flex-start;gap:2px;}.cv-annotation-tab.svelte-1r1spmr {height:20px;padding:0 8px;border-radius:100px;border:1.5px solid rgba(0, 0, 0, 0.18);background:white;cursor:pointer;display:flex;align-items:center;gap:4px;box-shadow:0 2px 8px rgba(0, 0, 0, 0.15);transition:box-shadow 0.15s;max-width:160px;overflow:hidden;}.cv-annotation-tab.svelte-1r1spmr:hover {box-shadow:0 3px 12px rgba(0, 0, 0, 0.22);}.cv-annotation-tab--has-text.svelte-1r1spmr {background:#fffbe6;border-color:rgba(180, 83, 9, 0.4);}.cv-annotation-tab-icon.svelte-1r1spmr {font-size:10px;line-height:1;color:#6b7280;}.cv-annotation-tab-preview.svelte-1r1spmr {font-size:9px;font-weight:600;color:#1a1a1a;font-family:ui-sans-serif, system-ui, sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px;}.cv-annotation-panel.svelte-1r1spmr {background:white;border-radius:8px;border:1px solid rgba(0, 0, 0, 0.12);box-shadow:0 4px 16px rgba(0, 0, 0, 0.18);padding:8px;width:220px;display:flex;flex-direction:column;gap:6px;}.cv-annotation-textarea.svelte-1r1spmr {width:100%;box-sizing:border-box;resize:vertical;border:1px solid rgba(0, 0, 0, 0.15);border-radius:4px;padding:5px 7px;font-size:11px;font-family:ui-sans-serif, system-ui, sans-serif;color:#1a1a1a;line-height:1.5;outline:none;min-height:56px;}.cv-annotation-textarea.svelte-1r1spmr:focus {border-color:#b45309;box-shadow:0 0 0 2px rgba(180, 83, 9, 0.15);}.cv-annotation-footer.svelte-1r1spmr {display:flex;align-items:center;justify-content:space-between;}.cv-corner-selector.svelte-1r1spmr {display:flex;gap:2px;}.cv-corner-btn.svelte-1r1spmr {width:20px;height:20px;border-radius:4px;border:1px solid rgba(0, 0, 0, 0.12);background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:#6b7280;padding:0;transition:background 0.1s, border-color 0.1s;}.cv-corner-btn.svelte-1r1spmr:hover {background:#fef3c7;border-color:#b45309;color:#1a1a1a;}.cv-corner-btn.active.svelte-1r1spmr {background:#fef3c7;border-color:#b45309;color:#92400e;font-weight:700;}.cv-char-counter.svelte-1r1spmr {font-size:9px;color:#9ca3af;font-family:ui-sans-serif, system-ui, sans-serif;font-variant-numeric:tabular-nums;}'
    };

    function HighlightAnnotationEditor($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$e);

    	let isExpanded = state(false);
    	let rect = state(proxy({ top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 }));

    	user_effect(() => {
    		set(rect, $$props.element.getBoundingClientRect(), true);

    		const update = () => {
    			set(rect, $$props.element.getBoundingClientRect(), true);
    		};

    		window.addEventListener('scroll', update, { capture: true, passive: true });
    		window.addEventListener('resize', update, { passive: true });

    		return () => {
    			window.removeEventListener('scroll', update, { capture: true });
    			window.removeEventListener('resize', update);
    		};
    	});

    	let localText = state('');
    	let localCorner = state(proxy(DEFAULT_ANNOTATION_CORNER));

    	// Initialize from store when element changes (or annotation changes externally)
    	user_pre_effect(() => {
    		const ann = shareStore.highlightAnnotations.get($$props.element);
    		const newText = ann?.text ?? '';

    		if (get(localText) !== newText) {
    			set(localText, newText, true);
    		}

    		// Only sync corner from store when there is a stored annotation;
    		// otherwise leave the locally-chosen corner intact.
    		if (ann && get(localCorner) !== ann.corner) {
    			set(localCorner, ann.corner, true);
    		}
    	});

    	function handleInput(e) {
    		const value = e.target.value;

    		set(localText, value, true);
    		shareStore.setAnnotation($$props.element, value, get(localCorner));
    	}

    	function setCorner(c) {
    		set(localCorner, c, true);
    		shareStore.setAnnotation($$props.element, get(localText), c);
    	}

    	function handleTabClick(e) {
    		e.stopPropagation();
    		set(isExpanded, !get(isExpanded));
    	}

    	let tabStyle = user_derived(() => {
    		switch (get(localCorner)) {
    			case 'tl':
    				return `top: ${get(rect).top}px; left: ${get(rect).left}px; transform: translateY(-100%);`;

    			case 'tr':
    				return `top: ${get(rect).top}px; left: ${get(rect).right}px; transform: translate(-100%, -100%);`;

    			case 'bl':
    				return `top: ${get(rect).bottom}px; left: ${get(rect).left}px;`;

    			case 'br':
    				return `top: ${get(rect).bottom}px; left: ${get(rect).right}px; transform: translateX(-100%);`;
    		}
    	});

    	let preview = user_derived(() => get(localText).length > 0
    		? get(localText).slice(0, ANNOTATION_PREVIEW_LENGTH) + (get(localText).length > ANNOTATION_PREVIEW_LENGTH ? '…' : '')
    		: null);

    	var div = root$d();
    	var button = child(div);
    	let classes;

    	button.__click = handleTabClick;

    	var node = child(button);

    	{
    		var consequent = ($$anchor) => {
    			var span = root_1$8();
    			var text = child(span, true);

    			reset(span);
    			template_effect(() => set_text(text, get(preview)));
    			append($$anchor, span);
    		};

    		var alternate = ($$anchor) => {
    			var span_1 = root_2$5();
    			var text_1 = child(span_1, true);

    			reset(span_1);
    			template_effect(() => set_text(text_1, get(isExpanded) ? '- note' : '+ note'));
    			append($$anchor, span_1);
    		};

    		if_block(node, ($$render) => {
    			if (get(preview)) $$render(consequent); else $$render(alternate, false);
    		});
    	}

    	reset(button);

    	var node_1 = sibling(button, 2);

    	{
    		var consequent_1 = ($$anchor) => {
    			var div_1 = root_3$4();
    			var textarea = child(div_1);

    			remove_textarea_child(textarea);
    			textarea.__input = handleInput;

    			var div_2 = sibling(textarea, 2);
    			var div_3 = child(div_2);

    			each(div_3, 21, () => CORNER_ICONS, ({ key, icon }) => key, ($$anchor, $$item) => {
    				let key = () => get($$item).key;
    				let icon = () => get($$item).icon;
    				var button_1 = root_4$2();
    				let classes_1;

    				button_1.__click = (e) => {
    					e.stopPropagation();
    					setCorner(key());
    				};

    				var text_2 = child(button_1, true);

    				reset(button_1);

    				template_effect(() => {
    					classes_1 = set_class(button_1, 1, 'cv-corner-btn svelte-1r1spmr', null, classes_1, { active: get(localCorner) === key() });
    					set_attribute(button_1, 'title', `Anchor to ${key() ?? ''}`);
    					set_attribute(button_1, 'aria-label', `Anchor to ${key() ?? ''}`);
    					set_attribute(button_1, 'aria-pressed', get(localCorner) === key());
    					set_text(text_2, icon());
    				});

    				append($$anchor, button_1);
    			});

    			reset(div_3);

    			var span_2 = sibling(div_3, 2);
    			var text_3 = child(span_2, true);

    			reset(span_2);
    			reset(div_2);
    			reset(div_1);

    			template_effect(() => {
    				set_attribute(textarea, 'maxlength', MAX_ANNOTATION_LENGTH);
    				set_value(textarea, get(localText));
    				set_text(text_3, MAX_ANNOTATION_LENGTH - get(localText).length);
    			});

    			append($$anchor, div_1);
    		};

    		if_block(node_1, ($$render) => {
    			if (get(isExpanded)) $$render(consequent_1);
    		});
    	}

    	reset(div);

    	template_effect(() => {
    		set_style(div, get(tabStyle));
    		classes = set_class(button, 1, 'cv-annotation-tab svelte-1r1spmr', null, classes, { 'cv-annotation-tab--has-text': get(localText).length > 0 });
    		set_attribute(button, 'title', get(localText).length > 0 ? get(localText) : 'Add annotation');
    		set_attribute(button, 'aria-expanded', get(isExpanded));
    	});

    	append($$anchor, div);
    	pop();
    }

    delegate(['click', 'input']);

    var root_2$4 = from_html(`<!> <!>`, 1);
    var root_3$3 = from_html(`<div><span class="selection-label svelte-1dbf58w"> </span></div>`);
    var root$c = from_html(`<div class="share-overlay-ui"><!> <!> <!> <!></div>`);

    const $$css$d = {
    	hash: 'svelte-1dbf58w',
    	code: '\n  /* Global styles injected when active */body.cv-share-active {cursor:default;user-select:none;-webkit-user-select:none;}\n\n  /* Highlight outlines */.cv-highlight-target {outline:2px dashed #0078d4 !important;outline-offset:2px;cursor:crosshair;}.cv-share-selected {outline:3px solid #005a9e !important;outline-offset:2px;background-color:rgba(0, 120, 212, 0.05);}.cv-highlight-target-hide {outline:2px dashed #d13438 !important;outline-offset:2px;cursor:crosshair;}.cv-share-selected-hide {outline:3px solid #a4262c !important;outline-offset:2px;background-color:rgba(209, 52, 56, 0.05);}.cv-highlight-target-mode {outline:2px dashed #d97706 !important;outline-offset:2px;cursor:crosshair;}.cv-share-selected-highlight {outline:3px solid #b45309 !important;outline-offset:2px;background-color:rgba(245, 158, 11, 0.05);}.selection-box.svelte-1dbf58w {position:fixed;border:1px solid rgba(0, 120, 212, 0.4);background-color:rgba(0, 120, 212, 0.1);pointer-events:none;z-index:10000;box-sizing:border-box;}.selection-box.hide-mode.svelte-1dbf58w {border:1px solid rgba(209, 52, 56, 0.4);background-color:rgba(209, 52, 56, 0.1);}.selection-box.highlight-mode.svelte-1dbf58w {border:1px solid rgba(255, 140, 0, 0.6); /* Orange/Gold for highlight */background-color:rgba(255, 140, 0, 0.1);}.selection-label.svelte-1dbf58w {position:absolute;top:-24px;left:0;background:#0078d4;color:white;padding:2px 6px;font-size:11px;border-radius:3px;white-space:nowrap;font-family:sans-serif;opacity:0.9;}.hide-mode.svelte-1dbf58w .selection-label:where(.svelte-1dbf58w) {background:#d13438;}.highlight-mode.svelte-1dbf58w .selection-label:where(.svelte-1dbf58w) {background:#d97706; /* Darker orange for text bg */}'
    };

    function ShareOverlay($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$d);

    	let excludedTags = prop($$props, 'excludedTags', 19, () => ['HEADER', 'NAV', 'FOOTER']),
    		excludedIds = prop($$props, 'excludedIds', 19, () => []);

    	let excludedTagSet = user_derived(() => new Set(excludedTags().map((t) => t.toUpperCase())));
    	let excludedIdSet = user_derived(() => new Set(excludedIds()));

    	user_effect(() => {
    		document.body.classList.add('cv-share-active');

    		return () => {
    			document.body.classList.remove('cv-share-active');
    		};
    	});

    	let isDragging = state(false);
    	let dragStart = state(null);
    	let dragCurrent = state(null);
    	let wasDragging = false;

    	// Cache candidates when active to avoid repeated DOM queries
    	let cachedCandidates = [];

    	let selectionBox = user_derived(() => {
    		if (!get(dragStart) || !get(dragCurrent) || !get(isDragging)) return null;

    		const left = Math.min(get(dragStart).x, get(dragCurrent).x);
    		const top = Math.min(get(dragStart).y, get(dragCurrent).y);
    		const width = Math.abs(get(dragCurrent).x - get(dragStart).x);
    		const height = Math.abs(get(dragCurrent).y - get(dragStart).y);

    		return { left, top, width, height };
    	});

    	/**
    	 * Handles window-level mouse hover events to identify and highlight shareable elements.
    	 */
    	function handleHover(e) {
    		if (!shareStore.isActive || get(isDragging)) return;

    		const target = e.target;

    		// 1. If we are on the helper, toolbar, color picker, or annotation editor, do nothing
    		if (target.closest('.hover-helper') || target.closest('.floating-bar') || target.closest('.cv-color-picker') || target.closest('.cv-annotation-editor')) {
    			return;
    		}

    		// 2. Exclude by Tag/ID
    		if (isOrHasExcludedParentElement(target)) return;

    		// 3. Find nearest shareable
    		const shareablePart = target.closest(SHAREABLE_SELECTOR);

    		// If not on a shareable part, clear selection immediately
    		if (!shareablePart) {
    			shareStore.setHoverTarget(null);

    			return;
    		}

    		const finalTarget = shareablePart;

    		// Check ancestors selection (level up logic)
    		let parent = finalTarget.parentElement;

    		let selectedAncestor = null;

    		while (parent) {
    			if (shareStore.selectedElements.has(parent)) {
    				selectedAncestor = parent;

    				break;
    			}

    			parent = parent.parentElement;
    		}

    		if (selectedAncestor) {
    			shareStore.setHoverTarget(selectedAncestor);

    			return;
    		}

    		// New target
    		if (isGenericWrapper(finalTarget)) {
    			shareStore.setHoverTarget(null);

    			return;
    		}

    		// Check selection is not child of current hover target
    		if (shareStore.currentHoverTarget !== finalTarget) {
    			if (shareStore.currentHoverTarget && shareStore.currentHoverTarget.contains(finalTarget)) {
    				return;
    			}

    			shareStore.setHoverTarget(finalTarget);
    		}
    	}

    	/**
    	 * Handles mouse down events to start a selection drag.
    	 */
    	function handleMouseDown(e) {
    		if (!shareStore.isActive) return;

    		// Ignore clicks on UI
    		const target = e.target;

    		if (target.closest('.floating-bar') || target.closest('.hover-helper') || target.closest('.cv-color-picker') || target.closest('.cv-annotation-editor')) return;

    		// Disable drag on touch devices
    		if (window.matchMedia('(pointer: coarse)').matches) return;

    		// Prevent default browser text selection
    		e.preventDefault();

    		set(dragStart, { x: e.clientX, y: e.clientY }, true);
    		set(dragCurrent, { x: e.clientX, y: e.clientY }, true);
    		set(isDragging, false);
    		wasDragging = false; // Ensure clean state
    	}

    	function handleMouseMove(e) {
    		if (!get(dragStart)) return;

    		set(dragCurrent, { x: e.clientX, y: e.clientY }, true);

    		const dx = e.clientX - get(dragStart).x;
    		const dy = e.clientY - get(dragStart).y;

    		if (Math.hypot(dx, dy) > 12) {
    			set(isDragging, true);
    			shareStore.setHoverTarget(null); // Clear highlight on drag start
    		}
    	}

    	function handleMouseUp() {
    		if (get(isDragging) && get(dragStart) && get(dragCurrent)) {
    			// Perform selection logic
    			const width = Math.abs(get(dragCurrent).x - get(dragStart).x);

    			const height = Math.abs(get(dragCurrent).y - get(dragStart).y);

    			// Optimization: Skip if drag area is too small (avoids accidental micro-selections)
    			if (width < 10 || height < 10) {
    				set(isDragging, false);
    				set(dragStart, null);
    				set(dragCurrent, null);

    				return;
    			}

    			const left = Math.min(get(dragStart).x, get(dragCurrent).x);
    			const top = Math.min(get(dragStart).y, get(dragCurrent).y);
    			const right = left + width;
    			const bottom = top + height;

    			// Populate cache only if needed (lazy loading)
    			if (cachedCandidates.length === 0) {
    				cachedCandidates = Array.from(document.querySelectorAll(SHAREABLE_SELECTOR));
    			}

    			const selected = [];

    			cachedCandidates.forEach((node) => {
    				const el = node;

    				if (isOrHasExcludedParentElement(el)) return;

    				const rect = el.getBoundingClientRect();

    				// Check containment (element must be fully inside selection box)
    				// AND check if it's not just a generic wrapper
    				if (rect.left >= left && rect.right <= right && rect.top >= top && rect.bottom <= bottom && !isGenericWrapper(el)) {
    					selected.push(el);
    				}
    			});

    			if (selected.length > 0) {
    				shareStore.toggleMultipleElements(selected);
    			}

    			wasDragging = true;
    		}

    		set(isDragging, false);
    		set(dragStart, null);
    		set(dragCurrent, null);
    	}

    	function handleClick(e) {
    		if (wasDragging) {
    			e.preventDefault();
    			e.stopPropagation();
    			wasDragging = false; // Synchronous reset

    			return;
    		}

    		const target = e.target;

    		if (target.closest('.hover-helper') || target.closest('.floating-bar') || target.closest('.cv-color-picker') || target.closest('.cv-annotation-editor')) return;

    		// Intercept click on document
    		e.preventDefault();

    		e.stopPropagation();

    		// If we have a hover target, toggle it
    		const currentTarget = shareStore.currentHoverTarget;

    		if (currentTarget) {
    			shareStore.toggleElementSelection(currentTarget);
    		}
    	}

    	function handleKeydown(e) {
    		if (e.key === 'Escape') {
    			e.preventDefault();
    			shareStore.toggleActive(false);
    		}
    	}

    	function isOrHasExcludedParentElement(el) {
    		return isExcluded(el, get(excludedTagSet), get(excludedIdSet));
    	}

    	var div = root$c();

    	event('mouseover', $window, handleHover);
    	event('mousedown', $window, handleMouseDown);
    	event('mousemove', $window, handleMouseMove);
    	event('mouseup', $window, handleMouseUp);
    	event('click', $window, handleClick, true);
    	event('keydown', $window, handleKeydown);

    	var node_1 = child(div);

    	ShareToolbar(node_1, {});

    	var node_2 = sibling(node_1, 2);

    	HoverHelper(node_2, {});

    	var node_3 = sibling(node_2, 2);

    	{
    		var consequent = ($$anchor) => {
    			var fragment = comment();
    			var node_4 = first_child(fragment);

    			each(node_4, 16, () => [...shareStore.selectedElements], (el) => el, ($$anchor, el) => {
    				var fragment_1 = root_2$4();
    				var node_5 = first_child(fragment_1);

    				HighlightColorPicker(node_5, {
    					get element() {
    						return el;
    					}
    				});

    				var node_6 = sibling(node_5, 2);

    				HighlightAnnotationEditor(node_6, {
    					get element() {
    						return el;
    					}
    				});

    				append($$anchor, fragment_1);
    			});

    			append($$anchor, fragment);
    		};

    		if_block(node_3, ($$render) => {
    			if (shareStore.selectionMode === 'highlight') $$render(consequent);
    		});
    	}

    	var node_7 = sibling(node_3, 2);

    	{
    		var consequent_1 = ($$anchor) => {
    			var div_1 = root_3$3();
    			var span = child(div_1);
    			var text = child(span, true);

    			reset(span);
    			reset(div_1);

    			template_effect(() => {
    				set_class(
    					div_1,
    					1,
    					`selection-box ${shareStore.selectionMode === 'hide'
						? 'hide-mode'
						: shareStore.selectionMode === 'highlight' ? 'highlight-mode' : ''}`,
    					'svelte-1dbf58w'
    				);

    				set_style(div_1, `left: ${get(selectionBox).left ?? ''}px; top: ${get(selectionBox).top ?? ''}px; width: ${get(selectionBox).width ?? ''}px; height: ${get(selectionBox).height ?? ''}px;`);

    				set_text(text, shareStore.selectionMode === 'hide'
    					? 'Select to hide'
    					: shareStore.selectionMode === 'highlight' ? 'Select to highlight' : 'Select to show');
    			});

    			append($$anchor, div_1);
    		};

    		if_block(node_7, ($$render) => {
    			if (get(selectionBox)) $$render(consequent_1);
    		});
    	}

    	reset(div);
    	append($$anchor, div);
    	pop();
    }

    var root_1$7 = from_html(`<div class="cv-focus-banner-wrapper svelte-1yqpn7e"><div id="cv-exit-focus-banner" data-cv-scroll-offset="" class="svelte-1yqpn7e"><span>You are viewing a 'focused view' generated by CustardUI.</span> <button type="button" class="svelte-1yqpn7e">See Original Page</button></div></div>`);

    const $$css$c = {
    	hash: 'svelte-1yqpn7e',
    	code: '.cv-focus-banner-wrapper.svelte-1yqpn7e {position:fixed;top:0;left:0;right:0;z-index:9000;background-color:#f3cb52;box-shadow:0 2px 8px rgba(44, 26, 14, 0.15);font-family:system-ui, sans-serif;}#cv-exit-focus-banner.svelte-1yqpn7e {color:#2c1a0e;padding:10px 20px;display:flex;align-items:center;justify-content:center;gap:16px;}button.svelte-1yqpn7e {background:#804b18;color:#fdf6e3;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;font-weight:600;}button.svelte-1yqpn7e:hover {background:#c4853a;}'
    };

    function FocusBanner($$anchor, $$props) {
    	push($$props, false);
    	append_styles$1($$anchor, $$css$c);

    	function handleExit() {
    		focusStore.exit();
    	}

    	init();

    	var fragment = comment();
    	var node = first_child(fragment);

    	{
    		var consequent = ($$anchor) => {
    			var div = root_1$7();
    			var div_1 = child(div);
    			var button = sibling(child(div_1), 2);

    			button.__click = handleExit;
    			reset(div_1);
    			reset(div);
    			transition(3, div, () => slide, () => ({ duration: 250 }));
    			append($$anchor, div);
    		};

    		if_block(node, ($$render) => {
    			if (focusStore.isActive) $$render(consequent);
    		});
    	}

    	append($$anchor, fragment);
    	pop();
    }

    delegate(['click']);

    /**
     * Handles basic modal triggers: ?cv-open or #cv-open
     */
    class OpenModalRule {
        parseForMatch(location) {
            const urlParams = new URLSearchParams(location.search);
            if (urlParams.has('cv-open')) {
                return { type: 'OPEN_MODAL', triggerKey: 'cv-open', triggerSource: 'query' };
            }
            if (location.hash === '#cv-open') {
                return { type: 'OPEN_MODAL', triggerKey: '#cv-open', triggerSource: 'hash' };
            }
            return null;
        }
        getCleanedUrl(location, action) {
            if (action.type !== 'OPEN_MODAL')
                return null;
            return cleanHelper(location, action);
        }
    }
    /**
     * Handles basic share triggers: ?cv-share or #cv-share
     */
    class BasicShareRule {
        parseForMatch(location) {
            const urlParams = new URLSearchParams(location.search);
            if (urlParams.has('cv-share')) {
                return { type: 'START_SHARE', triggerKey: 'cv-share', triggerSource: 'query' };
            }
            if (location.hash === '#cv-share') {
                return { type: 'START_SHARE', triggerKey: '#cv-share', triggerSource: 'hash' };
            }
            return null;
        }
        getCleanedUrl(location, action) {
            if (action.type !== 'START_SHARE' || action.mode)
                return null; // Only basic share
            return cleanHelper(location, action);
        }
    }
    /**
     * Handles specific share mode triggers: ?cv-share-show, ?cv-share-hide, or #cv-share-highlight, etc.
     */
    class SpecificShareModeRule {
        static SHARE_MODES = ['show', 'hide', 'highlight'];
        parseForMatch(location) {
            const urlParams = new URLSearchParams(location.search);
            for (const mode of SpecificShareModeRule.SHARE_MODES) {
                // Check Query
                const param = `cv-share-${mode}`;
                if (urlParams.has(param)) {
                    return { type: 'START_SHARE', mode, triggerKey: param, triggerSource: 'query' };
                }
                // Check Hash
                const hashKey = `#cv-share-${mode}`;
                if (location.hash === hashKey) {
                    return { type: 'START_SHARE', mode, triggerKey: hashKey, triggerSource: 'hash' };
                }
            }
            return null;
        }
        getCleanedUrl(location, action) {
            if (action.type !== 'START_SHARE' || !action.mode)
                return null;
            return cleanHelper(location, action);
        }
    }
    // Helper for common cleanup logic
    function cleanHelper(location, action) {
        const newUrl = new URL(location.href);
        if (action.triggerSource === 'query') {
            newUrl.searchParams.delete(action.triggerKey);
        }
        else if (action.triggerSource === 'hash') {
            if (newUrl.hash === action.triggerKey) {
                newUrl.hash = '';
            }
        }
        return newUrl.toString();
    }
    class UrlActionHandler {
        // The order of array determines priority (First match wins)
        static rules = [
            new OpenModalRule(),
            new BasicShareRule(),
            new SpecificShareModeRule(),
        ];
        /**
         * Pure function: Parses the URL and returns the detected action if any.
         * Iterates through the registry of rules.
         */
        static detectAction(location) {
            for (const rule of this.rules) {
                const action = rule.parseForMatch(location);
                if (action)
                    return action;
            }
            return null; // No match
        }
        /**
         * Pure function: Returns the clean URL string after removing the action trigger.
         * Delegates cleanup to the appropriate rule.
         */
        static getCleanedUrl(location, action) {
            for (const rule of this.rules) {
                const cleanUrl = rule.getCleanedUrl(location, action);
                if (cleanUrl)
                    return cleanUrl;
            }
            // Fallback (shouldn't happen if rules are consistent)
            return cleanHelper(location, action);
        }
    }

    /* url-action-router.svelte.ts generated by Svelte v5.46.1 */

    class UrlActionRouter {
    	options;
    	boundCheck;

    	constructor(options) {
    		this.options = options;
    		this.boundCheck = this.checkURLForAction.bind(this);
    	}

    	init() {
    		this.checkURLForAction();
    		window.addEventListener('popstate', this.boundCheck);
    		window.addEventListener('hashchange', this.boundCheck);
    	}

    	destroy() {
    		window.removeEventListener('popstate', this.boundCheck);
    		window.removeEventListener('hashchange', this.boundCheck);
    	}

    	checkURLForAction() {
    		const action = UrlActionHandler.detectAction(window.location);

    		if (action) {
    			if (action.type === 'OPEN_MODAL') {
    				if (this.options.checkSettingsEnabled()) {
    					this.options.onOpenModal();
    				}
    			} else if (action.type === 'START_SHARE') {
    				this.options.onStartShare(action.mode);
    			}

    			const cleanedUrl = UrlActionHandler.getCleanedUrl(window.location, action);

    			window.history.replaceState({}, '', cleanedUrl);
    		}
    	}
    }

    /* intro-manager.svelte.ts generated by Svelte v5.46.1 */

    class IntroManager {
    	#showCallout = // UI State
    	state(false);

    	get showCallout() {
    		return get(this.#showCallout);
    	}

    	set showCallout(value) {
    		set(this.#showCallout, value, true);
    	}

    	#showPulse = state(false);

    	get showPulse() {
    		return get(this.#showPulse);
    	}

    	set showPulse(value) {
    		set(this.#showPulse, value, true);
    	}

    	persistence;
    	getOptions;
    	hasChecked = false;

    	constructor(persistence, options) {
    		this.persistence = persistence;
    		this.getOptions = typeof options === 'function' ? options : () => options;
    	}

    	/**
    	 * Initializes the manager. Should be called when the component is ready
    	 * and we know there are elements on the current page (toggles, tab groups, or placeholders).
    	 */
    	init(hasElementsOnCurrentPage, settingsEnabled) {
    		const options = this.getOptions();

    		if (settingsEnabled && !this.hasChecked && options?.show) {
    			if (hasElementsOnCurrentPage) {
    				this.hasChecked = true;
    				this.checkAndShow();
    			}
    		}
    	}

    	checkAndShow() {
    		if (!this.persistence.getItem('cv-intro-shown')) {
    			setTimeout(
    				() => {
    					this.showCallout = true;
    					this.showPulse = true;
    				},
    				1000
    			);
    		}
    	}

    	dismiss() {
    		this.showCallout = false;
    		this.showPulse = false;
    		this.persistence.setItem('cv-intro-shown', 'true');
    	}
    }

    var root$b = from_html(`<div class="cv-widget-root" data-cv-share-ignore=""><!> <!> <!> <!> <!> <!></div>`);

    const $$css$b = {
    	hash: 'svelte-1vlfixd',
    	code: '\n  /* Root should allow clicks to pass through to the page unless hitting checking/interactive element */.cv-widget-root {position:fixed;top:0;left:0;width:0;height:0;z-index:9999;pointer-events:none; /* Crucial: Allow clicks to pass through */\n\n    /* Light Theme Defaults */--cv-bg: white;--cv-text: rgba(0, 0, 0, 0.9);--cv-text-secondary: rgba(0, 0, 0, 0.6);--cv-border: rgba(0, 0, 0, 0.1);--cv-bg-hover: rgba(0, 0, 0, 0.05);--cv-primary: #3e84f4;--cv-primary-hover: #2563eb;--cv-danger: #dc2626;--cv-danger-bg: rgba(220, 38, 38, 0.1);--cv-shadow: rgba(0, 0, 0, 0.25);--cv-input-bg: white;--cv-input-border: rgba(0, 0, 0, 0.15);--cv-switch-bg: rgba(0, 0, 0, 0.1);--cv-switch-knob: white;--cv-modal-icon-bg: rgba(0, 0, 0, 0.08);--cv-icon-bg: rgba(255, 255, 255, 0.92);--cv-icon-color: rgba(0, 0, 0, 0.9);--cv-focus-ring: rgba(62, 132, 244, 0.2);--cv-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);--cv-modal-radius: 0.75rem;--cv-card-radius: 0.5rem;--cv-section-label-transform: uppercase;font-family:inherit; /* Inherit font from host */}\n\n  /* But interactive children need pointer-events back */.cv-widget-root > * {pointer-events:auto;}\n\n  /* Exception: ShareOverlay manages its own pointer events */.cv-widget-root .cv-share-overlay {pointer-events:none; /* Overlay often passes clicks until specialized handles active */}.cv-widget-root[data-theme=\'dark\'] {\n    /* Dark Theme Overrides */--cv-bg: #101722;--cv-text: #e2e8f0;--cv-text-secondary: rgba(255, 255, 255, 0.6);--cv-border: rgba(255, 255, 255, 0.1);--cv-bg-hover: rgba(255, 255, 255, 0.05);--cv-primary: #3e84f4;--cv-primary-hover: #60a5fa;--cv-danger: #f87171;--cv-danger-bg: rgba(248, 113, 113, 0.1);--cv-shadow: rgba(0, 0, 0, 0.5);--cv-input-bg: #1e293b;--cv-input-border: rgba(255, 255, 255, 0.1);--cv-switch-bg: rgba(255, 255, 255, 0.1);--cv-switch-knob: #e2e8f0;--cv-modal-icon-bg: rgba(255, 255, 255, 0.08);--cv-icon-bg: #1e293b;--cv-icon-color: #e2e8f0;--cv-focus-ring: rgba(62, 132, 244, 0.5);--cv-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);--cv-modal-radius: 0.75rem;--cv-card-radius: 0.5rem;--cv-section-label-transform: uppercase;}.cv-hidden {display:none !important;}'
    };

    function UIRoot($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$b);

    	const { persistenceManager, resetToDefault } = getContext(RUNTIME_CALLBACKS_CTX);
    	const iconSettingsStore = getContext(ICON_SETTINGS_CTX);

    	// --- Derived State ---
    	const storeConfig = user_derived(() => activeStateStore.config);

    	const settingsEnabled = user_derived(() => $$props.options.settingsEnabled);

    	// --- Services ---
    	const introManager = new IntroManager(persistenceManager, () => $$props.options.callout);

    	const router = new UrlActionRouter({
    		onOpenModal: openModal,
    		onStartShare: handleStartShare,
    		checkSettingsEnabled: () => get(settingsEnabled)
    	});

    	// --- UI State ---
    	let isModalOpen = state(false);

    	// --- Computed Props ---
    	// Share Configuration
    	const shareExclusions = user_derived(() => get(storeConfig).shareExclusions || {});

    	const excludedTags = user_derived(() => [
    		...DEFAULT_EXCLUDED_TAGS,
    		...get(shareExclusions).tags || []
    	]);

    	const excludedIds = user_derived(() => [...DEFAULT_EXCLUDED_IDS, ...get(shareExclusions).ids || []]);

    	// --- Initialization ---
    	onMount(() => {
    		router.init();

    		return () => router.destroy();
    	});

    	// --- Effects ---
    	user_effect(() => {
    		introManager.init(elementStore.hasElementsOnCurrentPage, get(settingsEnabled));
    	});

    	// --- Modal Actions ---
    	function openModal() {
    		if (!get(settingsEnabled)) return;

    		introManager.dismiss();
    		set(isModalOpen, true);
    	}

    	function closeModal() {
    		set(isModalOpen, false);
    	}

    	function handleReset() {
    		resetToDefault();
    		iconSettingsStore.resetPositionAndCollapseState();
    		showToast('Settings reset to default');
    	}

    	function handleStartShare(mode = 'highlight') {
    		closeModal();
    		focusStore.exit();
    		shareStore.setSelectionMode(mode);
    		shareStore.toggleActive(true);
    	}

    	// --- Icon Visibility ---
    	const shouldShowIcon = user_derived(() => get(settingsEnabled) && !iconSettingsStore.isDismissed && (derivedStore.hasMenuOptions || uiStore.uiOptions.showTabGroups || get(isModalOpen)));

    	var div = root$b();
    	var node = child(div);

    	{
    		var consequent = ($$anchor) => {
    			{
    				let $0 = user_derived(() => $$props.options.callout?.message);
    				let $1 = user_derived(() => $$props.options.callout?.enablePulse);
    				let $2 = user_derived(() => $$props.options.callout?.backgroundColor);
    				let $3 = user_derived(() => $$props.options.callout?.textColor);

    				IntroCallout($$anchor, {
    					get position() {
    						return $$props.options.icon.position;
    					},

    					get message() {
    						return get($0);
    					},

    					get enablePulse() {
    						return get($1);
    					},

    					get backgroundColor() {
    						return get($2);
    					},

    					get textColor() {
    						return get($3);
    					},

    					onclose: () => introManager.dismiss()
    				});
    			}
    		};

    		if_block(node, ($$render) => {
    			if (introManager.showCallout && get(settingsEnabled)) $$render(consequent);
    		});
    	}

    	var node_1 = sibling(node, 2);

    	Toast(node_1, {});

    	var node_2 = sibling(node_1, 2);

    	{
    		var consequent_1 = ($$anchor) => {
    			ShareOverlay($$anchor, {
    				get excludedTags() {
    					return get(excludedTags);
    				},

    				get excludedIds() {
    					return get(excludedIds);
    				}
    			});
    		};

    		if_block(node_2, ($$render) => {
    			if (shareStore.isActive) $$render(consequent_1);
    		});
    	}

    	var node_3 = sibling(node_2, 2);

    	FocusBanner(node_3, {});

    	var node_4 = sibling(node_3, 2);

    	{
    		var consequent_2 = ($$anchor) => {
    			{
    				let $0 = user_derived(() => $$props.options.icon?.color);
    				let $1 = user_derived(() => $$props.options.icon?.backgroundColor);
    				let $2 = user_derived(() => $$props.options.icon?.opacity);
    				let $3 = user_derived(() => $$props.options.icon?.scale);

    				SettingsIcon($$anchor, {
    					get position() {
    						return $$props.options.icon.position;
    					},

    					get title() {
    						return uiStore.uiOptions.title;
    					},

    					get pulse() {
    						return introManager.showPulse;
    					},

    					onclick: openModal,

    					get iconColor() {
    						return get($0);
    					},

    					get backgroundColor() {
    						return get($1);
    					},

    					get opacity() {
    						return get($2);
    					},

    					get scale() {
    						return get($3);
    					}
    				});
    			}
    		};

    		if_block(node_4, ($$render) => {
    			if (get(shouldShowIcon) && $$props.options.icon.show) $$render(consequent_2);
    		});
    	}

    	var node_5 = sibling(node_4, 2);

    	{
    		var consequent_3 = ($$anchor) => {
    			Modal($$anchor, {
    				onclose: closeModal,
    				onreset: handleReset,
    				onstartShare: handleStartShare
    			});
    		};

    		if_block(node_5, ($$render) => {
    			if (get(settingsEnabled) && get(isModalOpen)) $$render(consequent_3);
    		});
    	}

    	reset(div);
    	template_effect(() => set_attribute(div, 'data-theme', $$props.options.theme));
    	append($$anchor, div);
    	pop();
    }

    class CustardUIManager {
        app = null;
        options;
        constructor(options) {
            // Set defaults
            this.options = {
                callbacks: options.callbacks,
                container: options.container || document.body,
                settingsEnabled: options.settingsEnabled ?? false,
                theme: options.panel?.theme || 'light',
                callout: {
                    show: options.callout?.show ?? false,
                    message: options.callout?.message || 'Customize your reading experience here.',
                    enablePulse: options.callout?.enablePulse ?? true,
                    backgroundColor: options.callout?.backgroundColor,
                    textColor: options.callout?.textColor,
                },
                icon: {
                    position: options.icon?.position || 'middle-left',
                    color: options.icon?.color,
                    backgroundColor: options.icon?.backgroundColor,
                    opacity: options.icon?.opacity,
                    scale: options.icon?.scale ?? 1,
                    show: options.icon?.show ?? true,
                },
            };
        }
        /**
         * Render the settings widget
         */
        render() {
            if (this.app) {
                return;
            }
            // Map context dependency injection directly into app root
            const rootContext = new Map();
            rootContext.set(ICON_SETTINGS_CTX, this.options.callbacks.iconSettings);
            rootContext.set(RUNTIME_CALLBACKS_CTX, this.options.callbacks);
            // Mount Svelte App using Svelte 5 API
            this.app = mount(UIRoot, {
                target: this.options.container,
                props: {
                    options: this.options,
                },
                context: rootContext,
            });
        }
        /**
         * Remove the settings widget from DOM
         */
        destroy() {
            if (this.app) {
                unmount(this.app);
                this.app = null;
            }
        }
    }
    /**
     * Initializes the UI manager (settings and share UI) using the provided config.
     */
    function initUIManager(runtime, config) {
        const settingsEnabled = config.settings?.enabled === true;
        const callbacks = {
            resetToDefault: () => runtime.resetToDefault(),
            iconSettings: runtime.iconSettingsStore,
            persistenceManager: runtime.persistenceManager,
        };
        const uiManager = new CustardUIManager({
            callbacks,
            settingsEnabled,
            ...config.settings,
        });
        uiManager.render();
        return uiManager;
    }

    /**
     * Manages persistence of custom views state using browser localStorage
     */
    class PersistenceManager {
        // Storage keys for localStorage
        prefix;
        constructor(storageKey) {
            this.prefix = storageKey ? `${storageKey}-` : '';
        }
        /**
         * Check if localStorage is available in the current environment
         */
        isStorageAvailable() {
            return typeof window !== 'undefined' && window.localStorage !== undefined;
        }
        /**
         * Generic set item with prefix
         */
        setItem(key, value) {
            if (!this.isStorageAvailable())
                return;
            try {
                localStorage.setItem(this.getPrefixedKey(key), value);
            }
            catch (error) {
                console.warn(`Failed to persist key ${key}:`, error);
            }
        }
        /**
         * Generic get item with prefix
         * Keys are automatically prefixed with user specified storageKey
         */
        getItem(key) {
            if (!this.isStorageAvailable())
                return null;
            try {
                return localStorage.getItem(this.getPrefixedKey(key));
            }
            catch (error) {
                console.warn(`Failed to get key ${key}:`, error);
                return null;
            }
        }
        /**
         * Generic remove item with prefix
         * Keys are automatically prefixed with user specified storageKey
         */
        removeItem(key) {
            if (!this.isStorageAvailable())
                return;
            try {
                localStorage.removeItem(this.getPrefixedKey(key));
            }
            catch (error) {
                console.warn(`Failed to remove key ${key}:`, error);
            }
        }
        getPrefixedKey(key) {
            return this.prefix + key;
        }
        // --- Type-Safe State Accessors (Wrappers around generic storage) ---
        persistState(state) {
            this.setItem('custardUI-state', JSON.stringify(state));
        }
        getPersistedState() {
            const raw = this.getItem('custardUI-state');
            if (!raw)
                return null;
            try {
                return JSON.parse(raw);
            }
            catch (e) {
                console.error('[CustardUI] Failed to parse persisted state:', e);
                return null;
            }
        }
        clearAll() {
            this.removeItem('custardUI-state');
            this.removeItem('cv-tab-navs-visible');
        }
        persistTabNavVisibility(visible) {
            this.setItem('cv-tab-navs-visible', visible ? 'true' : 'false');
        }
        getPersistedTabNavVisibility() {
            const raw = this.getItem('cv-tab-navs-visible');
            return raw === null ? null : raw === 'true';
        }
        hasPersistedData() {
            return !!this.getPersistedState();
        }
    }

    const STORAGE_KEY = 'cv-adaptation';
    /**
     * Manages the lifecycle of site adaptations (multi-tenancy variants).
     * Handles fetching, persisting, and applying adaptation configs.
     */
    class AdaptationManager {
        static QUERY_PARAM = 'adapt';
        static HASH_PREFIX = '#/';
        /**
         * Initializes adaptation from the URL parameter or localStorage.
         * Must be called before AppRuntime is instantiated so that:
         * - Theme CSS is injected early (FOUC prevention)
         * - ?adapt= param is cleaned before URLStateManager.parseURL() runs
         *
         * Adaptation JSON files are resolved relative to the site's baseUrl:
         *   `{baseUrl}/{id}/{id}.json`
         * e.g. baseUrl="/base", id="nus" → "/base/nus/nus.json"
         *
         * @param baseUrl The site's base URL (from data-base-url, default: '')
         * @param storageKey The project's unique storageKey prefix to use for saving preferences
         * @returns The loaded AdaptationConfig, or null if no adaptation is active
         */
        static async init(baseUrl = '', storageKey) {
            const persistence = new PersistenceManager(storageKey);
            // 1. Read indicators (URL hash first, then ?adapt=)
            const url = new URL(window.location.href);
            const hashMatch = this.getHashAdaptationId(url.hash);
            const queryParamValue = url.searchParams.get(this.QUERY_PARAM);
            // 2. Handle ?adapt=clear
            if (queryParamValue === 'clear') {
                persistence.clearAll(); // wipe custardUI-state and tab nav prefs
                persistence.removeItem(STORAGE_KEY); // wipe the adaptation ID itself
                if (this.hasHashAdaptationId(url.hash)) {
                    this.stripHashFromUrl(url);
                }
                this.stripQueryParamFromUrl(url);
                return null;
            }
            // 4. Determine namespace: page meta tag > URL param > Hash Indicator > localStorage
            const rawId = this.getMetaAdaptationId()
                ?? queryParamValue
                ?? hashMatch
                ?? persistence.getItem(STORAGE_KEY);
            const id = typeof rawId === 'string' ? rawId.trim() : rawId;
            if (!id) {
                // Clear any previously stored invalid/empty id to avoid reusing it
                this.clearStoredId(persistence);
                return null;
            }
            // 5. Fetch adaptation config and validate
            const config = await this.loadAdaptationConfig(baseUrl, id, persistence);
            if (!config) {
                this.clearStoredId(persistence);
                return null;
            }
            // 6. Clean URL indicators given valid adaptation
            if (queryParamValue !== null) {
                // If the query param specifies a new adaptation, we should clear any stale hash indicator
                if (this.hasHashAdaptationId(url.hash) && url.hash !== this.getHashUrlIndicator(queryParamValue)) {
                    this.stripHashFromUrl(url);
                }
                // If hash empty, or matches query param, populate later with hash indicator, so remove query param
                if (url.hash === '' || url.hash === this.getHashUrlIndicator(queryParamValue)) {
                    this.stripQueryParamFromUrl(url);
                }
            }
            // 7. Persist namespace — clear old state if explicitly switching to a different adaptation
            const previousId = persistence.getItem(STORAGE_KEY);
            const isExplicitUrlSwitch = queryParamValue !== null; // ?adapt= was in the URL
            if (isExplicitUrlSwitch && previousId !== null && previousId !== id) {
                persistence.clearAll(); // Remove custardUI-state so new adaptation starts fresh
            }
            persistence.setItem(STORAGE_KEY, id);
            // 8. Apply theme synchronously (FOUC prevention)
            this.applyTheme(config);
            return config;
        }
        /**
         * Adds a visual indicator to the URL bar showing the active adaptation.
         *
         * - Hash free     → append `#/{id}` (clean, no query-string noise)
         * - Hash occupied → set `?adapt={id}` so the indicator survives refreshes;
         *                   init() re-reads and re-applies it each load, and
         *                   rewriteUrlIndicator re-adds it, keeping it stable.
         *
         * Uses replaceState so history is not polluted.
         *
         * @param adaptationId The adaptation namespace/id
         */
        static rewriteUrlIndicator(adaptationId) {
            const url = new URL(window.location.href);
            const targetHash = this.getHashUrlIndicator(adaptationId);
            const hashCorrect = url.hash === targetHash;
            const noStaleParam = !url.searchParams.has(this.QUERY_PARAM);
            if (hashCorrect && noStaleParam)
                return; // Already in correct state
            if (url.hash === '' || url.hash === targetHash) {
                // Hash is free — use #/id and remove any stale ?adapt= param
                url.hash = targetHash;
                url.searchParams.delete(this.QUERY_PARAM);
            }
            else {
                // Hash is occupied (page anchor, #cv-open, etc.), use query param
                if (url.searchParams.get(this.QUERY_PARAM) === adaptationId)
                    return;
                url.searchParams.set(this.QUERY_PARAM, adaptationId);
            }
            history.replaceState({}, '', url.toString());
        }
        /**
         * Injects CSS variables and/or a stylesheet link for the adaptation theme.
         * Idempotent: will not add a second <link> tag for the same adaptation.
         */
        static applyTheme(config) {
            const theme = config.theme;
            if (!theme)
                return;
            // Inject CSS variables onto :root
            if (theme.cssVariables) {
                for (const [property, value] of Object.entries(theme.cssVariables)) {
                    document.documentElement.style.setProperty(property, value);
                }
            }
            // Append stylesheet link (idempotent)
            if (theme.cssFile) {
                const existing = document.querySelector(`link[data-cv-adaptation-id="${CSS.escape(config.id)}"]`);
                if (!existing) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = theme.cssFile;
                    link.setAttribute('data-cv-adaptation-id', config.id);
                    document.head.appendChild(link);
                }
            }
        }
        static clearStoredId(persistence) {
            persistence.removeItem(STORAGE_KEY);
        }
        static hasHashAdaptationId(hash) {
            return hash.startsWith(this.HASH_PREFIX);
        }
        static getHashAdaptationId(hash) {
            if (!this.hasHashAdaptationId(hash))
                return null;
            const encodedId = hash.slice(this.HASH_PREFIX.length);
            try {
                return decodeURIComponent(encodedId);
            }
            catch {
                return encodedId; // fallback if malformed encoding
            }
        }
        static getHashUrlIndicator(id) {
            return `${this.HASH_PREFIX}${encodeURIComponent(id)}`;
        }
        /**
         * Meta tag is in the form <meta name="cv-adapt" content="{id}">
         */
        static getMetaAdaptationId() {
            return document.querySelector('meta[name="cv-adapt"]')?.content || null;
        }
        static stripQueryParamFromUrl(url) {
            url.searchParams.delete(this.QUERY_PARAM);
            history.replaceState({}, '', url.toString());
        }
        static stripHashFromUrl(url) {
            url.hash = '';
            history.replaceState({}, '', url.toString());
        }
        static async loadAdaptationConfig(baseUrl, id, persistence) {
            try {
                if (!id || id.trim() === '')
                    return null;
                const safeId = encodeURIComponent(id.trim());
                const jsonFile = `${safeId}/${safeId}.json`;
                // The base must end in a slash for the URL constructor to treat it as a directory.
                // If baseUrl is empty, this falls back to '/', which resolves against window.location.origin.
                const directoryBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
                const fetchUrl = new URL(jsonFile, new URL(directoryBase, window.location.origin)).toString();
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    console.warn(`[CustardUI] Adaptation "${id}" could not be loaded (HTTP ${response.status}). Clearing stored adaptation.`);
                    this.clearStoredId(persistence);
                    return null;
                }
                const config = await response.json();
                if (config.id !== id) {
                    console.warn(`[CustardUI] Adaptation config ID mismatch: expected "${id}", got "${config.id}". Clearing stored adaptation.`);
                    this.clearStoredId(persistence);
                    return null;
                }
                return config;
            }
            catch (err) {
                console.warn(`[CustardUI] Adaptation "${id}" failed to fetch:`, err, 'Clearing stored adaptation.');
                this.clearStoredId(persistence);
                return null;
            }
        }
    }

    var root$a = from_html(`<div class="cv-context-divider svelte-1a535nn" role="button" tabindex="0"> </div>`);

    const $$css$a = {
    	hash: 'svelte-1a535nn',
    	code: '.cv-context-divider.svelte-1a535nn {padding:12px;margin:16px 0;background-color:#f8f8f8;border-top:1px dashed #ccc;border-bottom:1px dashed #ccc;color:#555;text-align:center;cursor:pointer;font-family:system-ui, sans-serif;font-size:13px;transition:background-color 0.2s;}.cv-context-divider.svelte-1a535nn:hover {background-color:#e8e8e8;color:#333;}'
    };

    function FocusDivider($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$a);

    	// Component is mounted manually via `mount`, use props for communication.
    	let hiddenCount = prop($$props, 'hiddenCount', 3, 0);

    	function handleClick() {
    		if ($$props.onExpand) $$props.onExpand();
    	}

    	var div = root$a();

    	div.__click = handleClick;
    	div.__keydown = (e) => e.key === 'Enter' && handleClick();

    	var text = child(div);

    	reset(div);
    	template_effect(() => set_text(text, `... ${hiddenCount() ?? ''} section${hiddenCount() > 1 ? 's' : ''} hidden (Click to expand) ...`));
    	append($$anchor, div);
    	pop();
    }

    delegate(['click', 'keydown']);

    /**
     * Determines which siblings of the target path elements should be hidden.
     *
     * @param targets The list of elements that are focused (and their ancestors up to root).
     * @param root The root element where focus mode applies (usually document.body or a main wrapper).
     * @param isExcluded Callback to determine if an element should be excluded from hiding (e.g. fixed position elements, overlays).
     */
    function determineHiddenElements(targets, root, isExcluded) {
        const hiddenElements = new SvelteSet();
        // Performs a "reverse" traversal, hides elements that are not in the ancestry path
        // of the focused elements. Siblings of the ancestry path are hidden.
        // 1. Identification of "keep" path
        // All targets and their ancestors up to root are kept.
        const keepSet = new Set();
        targets.forEach((target) => {
            let current = target;
            while (current && current !== root && current.parentElement) {
                keepSet.add(current);
                current = current.parentElement;
            }
            if (current === root)
                keepSet.add(root);
        });
        // 2. Traversal
        // For every element in the keep set (that is not root), we look at its siblings.
        // If a sibling is NOT in the keep set, we hide it.
        const targetsSet = new Set(targets);
        keepSet.forEach((el) => {
            if (el === root) {
                // For root, we look at its children.
                // Logic is slightly different: we hide children of root that are not in KeepSet.
                Array.from(root.children).forEach((child) => {
                    if (child instanceof HTMLElement && !keepSet.has(child)) {
                        if (!isExcluded(child)) {
                            hiddenElements.add(child);
                        }
                    }
                });
                return;
            }
            const parent = el.parentElement;
            // Parent Dominance: If parent is a target, we want to show all its content, so don't hide siblings of el.
            if (parent && targetsSet.has(parent)) {
                return;
            }
            if (parent && keepSet.has(parent)) {
                Array.from(parent.children).forEach((sibling) => {
                    if (sibling instanceof HTMLElement && !keepSet.has(sibling)) {
                        if (!isExcluded(sibling)) {
                            hiddenElements.add(sibling);
                        }
                    }
                });
            }
        });
        return hiddenElements;
    }
    /**
     * Checks if an element should be excluded from hiding logic.
     *
     * TODO: Check how to commonize this between focus and share
     */
    function isElementExcluded(el, options) {
        if (options.hiddenElements.has(el))
            return true;
        if (options.excludedTags.has(el.tagName.toUpperCase()))
            return true;
        if (el.id && options.excludedIds.has(el.id))
            return true;
        if (el.getAttribute('aria-hidden') === 'true')
            return true;
        // Exclude Toast/Banner/Overlay/SettingsIcon/UIRoot
        if (el.closest('.toast-container') ||
            el.id === 'cv-exit-focus-banner' ||
            el.classList.contains('cv-settings-icon') ||
            el.classList.contains('cv-widget-root') ||
            el.closest(`[${CV_SHARE_IGNORE_ATTRIBUTE}]`))
            return true;
        return false;
    }
    /**
     * Scans a list of children and groups consecutive hidden elements.
     * Returns a list of groups where dividers should be inserted.
     */
    function calculateDividerGroups(children, isHidden) {
        const groups = [];
        let hiddenCount = 0;
        let hiddenGroupStart = null;
        children.forEach((child) => {
            if (isHidden(child)) {
                if (hiddenCount === 0)
                    hiddenGroupStart = child;
                hiddenCount++;
            }
            else {
                if (hiddenCount > 0 && hiddenGroupStart) {
                    groups.push({
                        insertBefore: child,
                        startNode: hiddenGroupStart,
                        count: hiddenCount,
                    });
                    hiddenCount = 0;
                    hiddenGroupStart = null;
                }
            }
        });
        // Handle trailing hidden group
        if (hiddenCount > 0 && hiddenGroupStart) {
            // Consistent with service logic: insert divider before the start of the hidden group.
            groups.push({
                insertBefore: hiddenGroupStart,
                startNode: hiddenGroupStart,
                count: hiddenCount,
            });
        }
        return groups;
    }

    var root_4$1 = from_html(`<span>▾</span>`);
    var root_3$2 = from_html(`<!> <span class="cv-ribbon-text cv-ribbon-text--right svelte-1asb212"> </span> <span class="cv-ribbon-grip svelte-1asb212" aria-hidden="true"><span class="svelte-1asb212"></span><span class="svelte-1asb212"></span> <span class="svelte-1asb212"></span><span class="svelte-1asb212"></span> <span class="svelte-1asb212"></span><span class="svelte-1asb212"></span></span>`, 1);
    var root_6$1 = from_html(`<span>▾</span>`);
    var root_5$1 = from_html(`<span class="cv-ribbon-grip svelte-1asb212" aria-hidden="true"><span class="svelte-1asb212"></span><span class="svelte-1asb212"></span> <span class="svelte-1asb212"></span><span class="svelte-1asb212"></span> <span class="svelte-1asb212"></span><span class="svelte-1asb212"></span></span> <span class="cv-ribbon-text svelte-1asb212"> </span> <!>`, 1);
    var root_1$6 = from_html(`<button type="button"><!></button>`);
    var root_7$1 = from_html(`<div class="cv-annotation-card svelte-1asb212" role="region" aria-label="Annotation"><button type="button" class="cv-card-close svelte-1asb212" aria-label="Collapse annotation">✕</button> <span class="cv-card-text svelte-1asb212"> </span></div>`);
    var root$9 = from_html(`<div><!></div>`);

    const $$css$9 = {
    	hash: 'svelte-1asb212',
    	code: '\n  /* ==============================\n     CONTAINER (position, drag, opacity)\n     ============================== */.cv-annotation-container.svelte-1asb212 {position:absolute;z-index:100;pointer-events:auto;touch-action:none;user-select:none;cursor:default;opacity:0.88;transition:opacity 0.2s ease, z-index 0s;}.cv-annotation-container.svelte-1asb212:hover {opacity:1;z-index:110;}\n\n  /* ==============================\n     RIBBON (home-plate)\n     ============================== */.cv-annotation-ribbon.svelte-1asb212 {border:none;padding:6px 20px 6px 8px;min-width:28px;min-height:24px;background:var(--cv-highlight-color);cursor:default;box-shadow:0 2px 8px rgba(0, 0, 0, 0.15);display:flex;align-items:center;justify-content:flex-start;gap:5px;transform-origin:center center;}.cv-annotation-ribbon--intro.svelte-1asb212 {\n    animation: svelte-1asb212-cv-wiggle-intro 0.75s ease-in-out forwards;}.cv-annotation-ribbon--periodic.svelte-1asb212 {\n    animation: svelte-1asb212-cv-wiggle-periodic 5s ease-in-out infinite;}.cv-annotation-ribbon--right.svelte-1asb212 {padding:6px 8px 6px 20px;justify-content:flex-end;}.cv-annotation-ribbon--empty.svelte-1asb212 {min-width:24px;padding:6px 16px 6px 8px;}.cv-annotation-ribbon--expandable.svelte-1asb212 {cursor:pointer;}.cv-annotation-ribbon--expandable.svelte-1asb212:hover {filter:brightness(1.1);}\n\n  /* ==============================\n     RIBBON TEXT (single line)\n     ============================== */.cv-ribbon-text.svelte-1asb212 {display:block;font-family:\'Segoe Print\', \'Bradley Hand\', \'Chilanka\', cursive;font-size:13px;font-weight:700;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;color:#fff;text-shadow:0 1px 3px rgba(0, 0, 0, 0.25);}.cv-ribbon-text--right.svelte-1asb212 {text-align:right;}.cv-ribbon-chevron.svelte-1asb212 {font-size:22px;opacity:1;flex-shrink:0;line-height:1;color:#fff;text-shadow:0 1px 4px rgba(0, 0, 0, 0.4);}.cv-ribbon-chevron--bounce.svelte-1asb212 {\n    animation: svelte-1asb212-cv-chevron-bounce 3s ease-in-out infinite;}\n\n  /* ==============================\n     DRAG GRIP (6-dot grid on flat side)\n     ============================== */.cv-ribbon-grip.svelte-1asb212 {display:grid;grid-template-columns:repeat(2, 3px);gap:3px;flex-shrink:0;opacity:0.7;cursor:grab;padding:2px;}.cv-ribbon-grip.svelte-1asb212:active {cursor:grabbing;}.cv-ribbon-grip.svelte-1asb212 > span:where(.svelte-1asb212) {width:3px;height:3px;border-radius:50%;background:rgba(255, 255, 255, 0.9);box-shadow:0 0 1px rgba(0, 0, 0, 0.4);}\n\n  /* ==============================\n     CARD (sticky note)\n     ============================== */.cv-annotation-card.svelte-1asb212 {background:#FFFDF5;border:1.5px solid var(--cv-highlight-color);border-radius:4px;padding:10px 12px;max-width:280px;min-width:120px;box-shadow:0 4px 20px rgba(0, 0, 0, 0.18);position:relative;\n    animation: svelte-1asb212-cv-cardPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;}.cv-card-close.svelte-1asb212 {position:absolute;top:3px;right:5px;border:none;background:transparent;cursor:pointer;font-size:12px;color:#aaa;padding:2px 4px;line-height:1;font-family:sans-serif;}.cv-card-close.svelte-1asb212:hover {color:#555;}.cv-card-text.svelte-1asb212 {display:block;font-family:\'Segoe Print\', \'Bradley Hand\', \'Chilanka\', cursive;font-size:13px;font-weight:600;color:#333;line-height:1.45;word-break:break-word;white-space:pre-wrap;padding-right:15px;}\n\n  /* ==============================\n     ANIMATIONS\n     ============================== */\n  @keyframes svelte-1asb212-cv-wiggle-intro {\n    0%   { transform: rotate(0deg); }\n    10%  { transform: rotate(-6deg); }\n    25%  { transform: rotate(6deg); }\n    40%  { transform: rotate(-5deg); }\n    55%  { transform: rotate(5deg); }\n    68%  { transform: rotate(-3deg); }\n    80%  { transform: rotate(2.5deg); }\n    90%  { transform: rotate(-1deg); }\n    100% { transform: rotate(0deg); }\n  }\n\n  @keyframes svelte-1asb212-cv-wiggle-periodic {\n    0%, 85%, 100% { transform: rotate(0deg); }\n    87% { transform: rotate(1.2deg); }\n    90% { transform: rotate(-1.2deg); }\n    93% { transform: rotate(0.8deg); }\n    96% { transform: rotate(-0.5deg); }\n  }\n\n  @keyframes svelte-1asb212-cv-cardPop {\n    from { opacity: 0; transform: scale(0.9) translateY(5px); }\n    to { opacity: 1; transform: scale(1) translateY(0); }\n  }\n\n  @keyframes svelte-1asb212-cv-chevron-bounce {\n    0%, 70%, 100% { transform: translateY(0); }\n    78%           { transform: translateY(-3px); }\n    86%           { transform: translateY(1px); }\n    93%           { transform: translateY(-1.5px); }\n  }'
    };

    function HighlightTextAnnotation($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$9);

    	const corner = user_derived(() => $$props.annotationCorner ?? DEFAULT_ANNOTATION_CORNER);
    	const hasText = user_derived(() => $$props.annotation.length > 0);
    	const isShort = user_derived(() => $$props.annotation.length <= ANNOTATION_PREVIEW_LENGTH);
    	const isRightCorner = user_derived(() => get(corner) === 'tr' || get(corner) === 'br');
    	let expanded = state(false);

    	// --- Intro wiggle state ---
    	let introAnimationDone = state(false);

    	function onIntroAnimationEnd(e) {
    		if (e.target !== e.currentTarget) return;

    		set(introAnimationDone, true);
    	}

    	// --- Drag-to-move state ---
    	let dragOffsetX = state(0);

    	let dragOffsetY = state(0);
    	let isDragging = false;
    	let isPointerDown = false;
    	let dragStartX = 0;
    	let dragStartY = 0;
    	let dragStartOffsetX = 0;
    	let dragStartOffsetY = 0;
    	let containerEl;

    	function toggle() {
    		if (get(isShort)) return;

    		set(expanded, !get(expanded));
    	}

    	function handleInteraction(e) {
    		e.stopPropagation();

    		if (!isDragging) toggle();
    	}

    	function onPointerDown(e) {
    		// Only initiate drag when the pointer starts on the grip handle.
    		if (!e.target.closest('.cv-ribbon-grip')) return;

    		isPointerDown = true;
    		isDragging = false;
    		dragStartX = e.clientX;
    		dragStartY = e.clientY;
    		dragStartOffsetX = get(dragOffsetX);
    		dragStartOffsetY = get(dragOffsetY);
    	}

    	// Hard clamp so the element can never leave the viewport.
    	function clampToViewport(newX, newY) {
    		if (!containerEl) return { x: newX, y: newY };

    		const rect = containerEl.getBoundingClientRect();
    		const pad = 8;
    		const vw = window.innerWidth;
    		const vh = window.innerHeight;
    		const origLeft = rect.left - get(dragOffsetX);
    		const origTop = rect.top - get(dragOffsetY);
    		const newLeft = origLeft + newX;
    		const newTop = origTop + newY;
    		let x = newX;
    		let y = newY;

    		if (newLeft < pad) x += pad - newLeft;
    		if (newLeft + rect.width > vw - pad) x -= newLeft + rect.width - (vw - pad);
    		if (newTop < pad) y += pad - newTop;
    		if (newTop + rect.height > vh - pad) y -= newTop + rect.height - (vh - pad);

    		return { x, y };
    	}

    	function onPointerMove(e) {
    		if (!isPointerDown) return;

    		const dx = e.clientX - dragStartX;
    		const dy = e.clientY - dragStartY;

    		if (!isDragging && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
    			isDragging = true;
    			e.currentTarget.setPointerCapture(e.pointerId);
    		}

    		if (isDragging) {
    			const rawX = dragStartOffsetX + dx;
    			const rawY = dragStartOffsetY + dy;
    			const clamped = clampToViewport(rawX, rawY);

    			set(dragOffsetX, clamped.x, true);
    			set(dragOffsetY, clamped.y, true);
    		}
    	}

    	function onPointerUp(e) {
    		if (!isPointerDown) return;

    		isPointerDown = false;

    		if (isDragging) {
    			e.currentTarget.releasePointerCapture(e.pointerId);

    			setTimeout(
    				() => {
    					isDragging = false;
    				},
    				50
    			);
    		}
    	}

    	// Cancel (e.g. touch interrupted by scroll) — reset all drag state cleanly.
    	function onPointerCancel(_e) {
    		isPointerDown = false;
    		isDragging = false;
    	}

    	// Nudge annotation back in-bounds when the viewport shrinks.
    	user_effect(() => {
    		function onResize() {
    			const clamped = clampToViewport(get(dragOffsetX), get(dragOffsetY));

    			set(dragOffsetX, clamped.x, true);
    			set(dragOffsetY, clamped.y, true);
    		}

    		window.addEventListener('resize', onResize);

    		return () => window.removeEventListener('resize', onResize);
    	});

    	/**
    	 * Returns CSS positioning based on the annotation corner.
    	 */
    	function getPositionStyle(c) {
    		switch (c) {
    			case 'tr':
    				return 'top: -6px; right: -6px;';

    			case 'bl':
    				return 'bottom: -6px; left: -6px;';

    			case 'br':
    				return 'bottom: -6px; right: -6px;';

    			case 'tl':

    			default:
    				return 'top: -6px; left: -6px;';
    		}
    	}

    	/**
    	 * Returns the ribbon clip-path. The point faces inward toward the content.
    	 */
    	function getRibbonClipPath(c) {
    		const pointsRight = c === 'tl' || c === 'bl';

    		if (pointsRight) {
    			return 'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)';
    		} else {
    			return 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%)';
    		}
    	}

    	var div = root$9();
    	let classes;

    	div.__pointerdown = onPointerDown;
    	div.__pointermove = onPointerMove;
    	div.__pointerup = onPointerUp;

    	var node = child(div);

    	{
    		var consequent_4 = ($$anchor) => {
    			var button = root_1$6();
    			let classes_1;

    			button.__click = handleInteraction;

    			var node_1 = child(button);

    			{
    				var consequent_3 = ($$anchor) => {
    					var fragment = comment();
    					var node_2 = first_child(fragment);

    					{
    						var consequent_1 = ($$anchor) => {
    							var fragment_1 = root_3$2();
    							var node_3 = first_child(fragment_1);

    							{
    								var consequent = ($$anchor) => {
    									var span = root_4$1();
    									let classes_2;

    									template_effect(() => classes_2 = set_class(span, 1, 'cv-ribbon-chevron svelte-1asb212', null, classes_2, { 'cv-ribbon-chevron--bounce': get(introAnimationDone) }));
    									append($$anchor, span);
    								};

    								if_block(node_3, ($$render) => {
    									if (!get(isShort)) $$render(consequent);
    								});
    							}

    							var span_1 = sibling(node_3, 2);
    							var text = child(span_1, true);

    							reset(span_1);
    							next(2);

    							template_effect(($0) => set_text(text, $0), [
    								() => get(isShort)
    									? $$props.annotation
    									: $$props.annotation.slice(0, ANNOTATION_PREVIEW_LENGTH) + '…'
    							]);

    							append($$anchor, fragment_1);
    						};

    						var alternate = ($$anchor) => {
    							var fragment_2 = root_5$1();
    							var span_2 = sibling(first_child(fragment_2), 2);
    							var text_1 = child(span_2, true);

    							reset(span_2);

    							var node_4 = sibling(span_2, 2);

    							{
    								var consequent_2 = ($$anchor) => {
    									var span_3 = root_6$1();
    									let classes_3;

    									template_effect(() => classes_3 = set_class(span_3, 1, 'cv-ribbon-chevron svelte-1asb212', null, classes_3, { 'cv-ribbon-chevron--bounce': get(introAnimationDone) }));
    									append($$anchor, span_3);
    								};

    								if_block(node_4, ($$render) => {
    									if (!get(isShort)) $$render(consequent_2);
    								});
    							}

    							template_effect(($0) => set_text(text_1, $0), [
    								() => get(isShort)
    									? $$props.annotation
    									: $$props.annotation.slice(0, ANNOTATION_PREVIEW_LENGTH) + '…'
    							]);

    							append($$anchor, fragment_2);
    						};

    						if_block(node_2, ($$render) => {
    							if (get(isRightCorner)) $$render(consequent_1); else $$render(alternate, false);
    						});
    					}

    					append($$anchor, fragment);
    				};

    				if_block(node_1, ($$render) => {
    					if (get(hasText)) $$render(consequent_3);
    				});
    			}

    			reset(button);

    			template_effect(
    				($0) => {
    					classes_1 = set_class(button, 1, 'cv-annotation-ribbon svelte-1asb212', null, classes_1, {
    						'cv-annotation-ribbon--empty': !get(hasText),
    						'cv-annotation-ribbon--right': get(isRightCorner),
    						'cv-annotation-ribbon--expandable': !get(isShort),
    						'cv-annotation-ribbon--intro': !get(introAnimationDone),
    						'cv-annotation-ribbon--periodic': get(introAnimationDone)
    					});

    					set_style(button, `clip-path: ${$0 ?? ''};`);

    					set_attribute(button, 'aria-label', get(hasText)
    						? get(isShort) ? $$props.annotation : 'Expand annotation'
    						: 'Annotation marker');

    					set_attribute(button, 'aria-expanded', get(isShort) ? undefined : get(expanded));
    				},
    				[() => getRibbonClipPath(get(corner))]
    			);

    			event('animationend', button, onIntroAnimationEnd);
    			append($$anchor, button);
    		};

    		var alternate_1 = ($$anchor) => {
    			var div_1 = root_7$1();
    			var button_1 = child(div_1);

    			button_1.__click = handleInteraction;

    			var span_4 = sibling(button_1, 2);
    			var text_2 = child(span_4, true);

    			reset(span_4);
    			reset(div_1);
    			template_effect(() => set_text(text_2, $$props.annotation));
    			append($$anchor, div_1);
    		};

    		if_block(node, ($$render) => {
    			if (!get(expanded)) $$render(consequent_4); else $$render(alternate_1, false);
    		});
    	}

    	reset(div);
    	bind_this(div, ($$value) => containerEl = $$value, () => containerEl);

    	template_effect(
    		($0) => {
    			classes = set_class(div, 1, 'cv-annotation-container svelte-1asb212', null, classes, { 'cv-annotation-container--expanded': get(expanded) });
    			set_style(div, `${$0 ?? ''} transform: translate(${get(dragOffsetX) ?? ''}px, ${get(dragOffsetY) ?? ''}px);`);
    		},
    		[() => getPositionStyle(get(corner))]
    	);

    	event('pointercancel', div, onPointerCancel);
    	append($$anchor, div);
    	pop();
    }

    delegate(['pointerdown', 'pointermove', 'pointerup', 'click']);

    var root_1$5 = from_html(`<div class="cv-annotation-container svelte-ii1txw"><div role="img" aria-label="Annotation marker"></div> <button type="button" class="cv-empty-dismiss svelte-ii1txw" aria-label="Dismiss marker">✕</button></div>`);

    const $$css$8 = {
    	hash: 'svelte-ii1txw',
    	code: '.cv-annotation-container.svelte-ii1txw {position:absolute;z-index:100;pointer-events:auto;touch-action:none;user-select:none;opacity:0.95;transition:opacity 0.2s ease, z-index 0s;}.cv-annotation-container.svelte-ii1txw:hover {opacity:1;z-index:110;}.cv-empty-ribbon.svelte-ii1txw {min-width:45px;min-height:22px;background:var(--cv-highlight-color);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.22);transform-origin:center center;padding:5px 22px 5px 10px;opacity:0.95;transition:opacity 0.2s ease;}.cv-annotation-container.svelte-ii1txw:hover .cv-empty-ribbon:where(.svelte-ii1txw) {opacity:1;}.cv-empty-ribbon--right.svelte-ii1txw {padding:5px 10px 5px 22px;}.cv-empty-ribbon--intro.svelte-ii1txw {\n    animation: svelte-ii1txw-cv-wiggle-intro 0.75s ease-in-out forwards;}.cv-empty-ribbon--periodic.svelte-ii1txw {\n    animation: svelte-ii1txw-cv-wiggle-periodic 5s ease-in-out infinite;}\n\n  /* Dismiss button — hidden until container is hovered */.cv-empty-dismiss.svelte-ii1txw {position:absolute;border:none;background:rgba(100, 100, 100, 0.55);color:#fff;font-size:8px;cursor:pointer;width:14px;height:14px;display:flex;align-items:center;justify-content:center;padding:0;line-height:1;border-radius:50%;box-shadow:0 1px 4px rgba(0, 0, 0, 0.2);opacity:0;pointer-events:none;transition:opacity 0.15s ease, background 0.15s ease, color 0.15s ease;}.cv-annotation-container.svelte-ii1txw:hover .cv-empty-dismiss:where(.svelte-ii1txw) {opacity:1;pointer-events:auto;}.cv-empty-dismiss.svelte-ii1txw:hover {background:rgba(80, 80, 80, 0.8);box-shadow:0 1px 6px rgba(0, 0, 0, 0.28);}\n\n  @keyframes svelte-ii1txw-cv-wiggle-intro {\n    0%   { transform: rotate(0deg); }\n    10%  { transform: rotate(-6deg); }\n    25%  { transform: rotate(6deg); }\n    40%  { transform: rotate(-5deg); }\n    55%  { transform: rotate(5deg); }\n    68%  { transform: rotate(-3deg); }\n    80%  { transform: rotate(2.5deg); }\n    90%  { transform: rotate(-1deg); }\n    100% { transform: rotate(0deg); }\n  }\n\n  @keyframes svelte-ii1txw-cv-wiggle-periodic {\n    0%, 85%, 100% { transform: rotate(0deg); }\n    87% { transform: rotate(1.2deg); }\n    90% { transform: rotate(-1.2deg); }\n    93% { transform: rotate(0.8deg); }\n    96% { transform: rotate(-0.5deg); }\n  }'
    };

    function HighlightEmptyAnnotation($$anchor, $$props) {
    	append_styles$1($$anchor, $$css$8);

    	const corner = user_derived(() => $$props.annotationCorner ?? DEFAULT_ANNOTATION_CORNER);
    	const isRightCorner = user_derived(() => get(corner) === 'tr' || get(corner) === 'br');
    	let dismissed = state(false);
    	let introAnimationDone = state(false);

    	function onIntroAnimationEnd(e) {
    		if (e.target !== e.currentTarget) return;

    		set(introAnimationDone, true);
    	}

    	function getPositionStyle(c) {
    		switch (c) {
    			case 'tr':
    				return 'top: 4px; right: -6px;';

    			case 'bl':
    				return 'bottom: 4px; left: -6px;';

    			case 'br':
    				return 'bottom: 4px; right: -6px;';

    			case 'tl':

    			default:
    				return 'top: 4px; left: -6px;';
    		}
    	}

    	function getRibbonClipPath(c) {
    		const pointsRight = c === 'tl' || c === 'bl';

    		if (pointsRight) {
    			return 'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)';
    		} else {
    			return 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%)';
    		}
    	}

    	// Position the dismiss button at the outermost corner of the container (furthest from the box).
    	function getDismissStyle(c) {
    		switch (c) {
    			case 'tr':
    				return 'top: -5px; right: -5px;';

    			case 'bl':
    				return 'bottom: -5px; left: -5px;';

    			case 'br':
    				return 'bottom: -5px; right: -5px;';

    			case 'tl':

    			default:
    				return 'top: -5px; left: -5px;';
    		}
    	}

    	var fragment = comment();
    	var node = first_child(fragment);

    	{
    		var consequent = ($$anchor) => {
    			var div = root_1$5();
    			var div_1 = child(div);
    			let classes;
    			var button = sibling(div_1, 2);

    			button.__click = () => set(dismissed, true);
    			reset(div);

    			template_effect(
    				($0, $1, $2) => {
    					set_style(div, $0);

    					classes = set_class(div_1, 1, 'cv-empty-ribbon svelte-ii1txw', null, classes, {
    						'cv-empty-ribbon--right': get(isRightCorner),
    						'cv-empty-ribbon--intro': !get(introAnimationDone),
    						'cv-empty-ribbon--periodic': get(introAnimationDone)
    					});

    					set_style(div_1, `clip-path: ${$1 ?? ''};`);
    					set_style(button, $2);
    				},
    				[
    					() => getPositionStyle(get(corner)),
    					() => getRibbonClipPath(get(corner)),
    					() => getDismissStyle(get(corner))
    				]
    			);

    			event('animationend', div_1, onIntroAnimationEnd);
    			append($$anchor, div);
    		};

    		if_block(node, ($$render) => {
    			if (!get(dismissed)) $$render(consequent);
    		});
    	}

    	append($$anchor, fragment);
    }

    delegate(['click']);

    var root_2$3 = from_html(`<button type="button" aria-label="Previous highlight">↑</button> <button type="button" aria-label="Next highlight">↓</button>`, 1);
    var root_1$4 = from_html(`<div class="cv-highlight-group svelte-1mz0neo"><div class="cv-highlight-marker svelte-1mz0neo"></div> <!> <div class="cv-highlight-pill svelte-1mz0neo"><a href="https://custardui.js.org" target="_blank" rel="noopener noreferrer" class="svelte-1mz0neo">Annotated by: CustardUI↗</a></div> <!></div>`);
    var root$8 = from_html(`<div class="cv-highlight-overlay svelte-1mz0neo"></div>`);

    const $$css$7 = {
    	hash: 'svelte-1mz0neo',
    	code: '.cv-highlight-overlay.svelte-1mz0neo {position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:8000;}.cv-highlight-group.svelte-1mz0neo {position:absolute;pointer-events:none;}.cv-highlight-marker.svelte-1mz0neo {position:absolute;inset:0;pointer-events:none;\n    \n    /* Marker Style */border:3.5px solid var(--cv-highlight-color);border-radius:200px 15px 225px 15px / 15px 225px 15px 255px;transform:rotate(-0.5deg);\n    \n    /* 3D INTERNAL VOLUME:\n       Adds depth to the yellow border itself so it looks rounded.\n    */box-shadow:inset 0 1px 2px rgba(129, 73, 25, 0.2),\n      inset 0 -1px 1px rgba(255, 255, 255, 0.7);\n\n    /* 2A-3 DOUBLE LIGHT PROJECTION:\n       Stacks multiple drop-shadows to cast into the box interior.\n    */filter:/* Sharp contact shadow for grounding */\n      drop-shadow(0 2px 2px rgba(44, 26, 14, 0.15)) \n      /* Light Source A: Casts shadow from top-left to bottom-right */\n      drop-shadow(-8px 12px 10px rgba(44, 26, 14, 0.12))\n      /* Light Source B: Casts shadow from top-right to bottom-left */\n      drop-shadow(8px 12px 10px rgba(44, 26, 14, 0.12));\n    \n    animation: svelte-1mz0neo-highlightFadeIn 0.3s ease-out forwards;}.cv-nav-arrow.svelte-1mz0neo {position:absolute;z-index:10;right:-5px;pointer-events:auto;width:14px;height:14px;border-radius:100px;border:1px solid var(--cv-highlight-color);background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:7px;color:#814919;font-weight:700;font-family:ui-sans-serif, system-ui, sans-serif;line-height:1;padding:0;box-shadow:0 4px 12px rgba(44, 26, 14, 0.15);opacity:0.7;}.cv-nav-arrow.svelte-1mz0neo:hover {opacity:1;}.cv-nav-arrow--up.svelte-1mz0neo {top:0px;}.cv-nav-arrow--down.svelte-1mz0neo {bottom:0px;}.cv-nav-arrow--hidden.svelte-1mz0neo {visibility:hidden;pointer-events:none;}.cv-highlight-pill.svelte-1mz0neo {position:absolute;z-index:10;bottom:-2px;right:14px;background:white;height:14px;padding:0 8px;display:flex;align-items:center;border-radius:100px;border:1px solid var(--cv-highlight-color);pointer-events:auto;white-space:nowrap;\n    \n    /* Stronger shadow to match the frame\'s new altitude */box-shadow:0 4px 12px rgba(44, 26, 14, 0.15);}.cv-highlight-pill.svelte-1mz0neo a:where(.svelte-1mz0neo) {font-size:8px;font-weight:700;color:#814919;text-decoration:none;font-family:ui-sans-serif, system-ui, sans-serif;line-height:1;}.cv-highlight-pill.svelte-1mz0neo:hover a:where(.svelte-1mz0neo) {opacity:0.8;}\n\n  @keyframes svelte-1mz0neo-highlightFadeIn {\n    from { \n      opacity: 0; \n      transform: scale(0.98) rotate(-1deg); \n    }\n    to { \n      opacity: 1; \n      transform: scale(1) rotate(-0.5deg); \n    }\n  }'
    };

    function HighlightOverlay($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$7);

    	let rects = user_derived(() => $$props.box.rects);

    	function getColorHex(rect) {
    		const key = rect.color ?? DEFAULT_COLOR_KEY;

    		return HIGHLIGHT_COLORS.find((c) => c.key === key)?.hex ?? HIGHLIGHT_COLORS[0].hex;
    	}

    	function scrollToRect(rect) {
    		rect.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    	}

    	var div = root$8();

    	each(div, 23, () => get(rects), (rect) => rect.element, ($$anchor, rect, i) => {
    		var div_1 = root_1$4();
    		var node = sibling(child(div_1), 2);

    		{
    			var consequent = ($$anchor) => {
    				var fragment = root_2$3();
    				var button = first_child(fragment);
    				let classes;

    				button.__click = () => scrollToRect(get(rects)[get(i) - 1]);

    				var button_1 = sibling(button, 2);
    				let classes_1;

    				button_1.__click = () => scrollToRect(get(rects)[get(i) + 1]);

    				template_effect(() => {
    					classes = set_class(button, 1, 'cv-nav-arrow cv-nav-arrow--up svelte-1mz0neo', null, classes, { 'cv-nav-arrow--hidden': get(i) === 0 });
    					classes_1 = set_class(button_1, 1, 'cv-nav-arrow cv-nav-arrow--down svelte-1mz0neo', null, classes_1, { 'cv-nav-arrow--hidden': get(i) === get(rects).length - 1 });
    				});

    				append($$anchor, fragment);
    			};

    			if_block(node, ($$render) => {
    				if (get(rects).length > 1) $$render(consequent);
    			});
    		}

    		var node_1 = sibling(node, 4);

    		{
    			var consequent_1 = ($$anchor) => {
    				HighlightTextAnnotation($$anchor, {
    					get annotation() {
    						return get(rect).annotation;
    					},

    					get annotationCorner() {
    						return get(rect).annotationCorner;
    					}
    				});
    			};

    			var alternate = ($$anchor) => {
    				HighlightEmptyAnnotation($$anchor, {
    					get annotationCorner() {
    						return get(rect).annotationCorner;
    					}
    				});
    			};

    			if_block(node_1, ($$render) => {
    				if (get(rect).annotation !== undefined && get(rect).annotation.length > 0) $$render(consequent_1); else $$render(alternate, false);
    			});
    		}

    		reset(div_1);
    		template_effect(($0) => set_style(div_1, `top: ${get(rect).top ?? ''}px; left: ${get(rect).left ?? ''}px; width: ${get(rect).width ?? ''}px; height: ${get(rect).height ?? ''}px; --cv-highlight-color: ${$0 ?? ''};`), [() => getColorHex(get(rect))]);
    		append($$anchor, div_1);
    	});

    	reset(div);
    	append($$anchor, div);
    	pop();
    }

    delegate(['click']);

    /**
     * Groups elements by their parent.
     * Returns a Map where keys are parent elements and values are lists of child elements.
     */
    function groupSiblings(elements) {
        const groups = new SvelteMap();
        elements.forEach((t) => {
            const parent = t.parentElement || document.body;
            if (!groups.has(parent)) {
                groups.set(parent, []);
            }
            groups.get(parent).push(t);
        });
        return groups;
    }
    /**
     * Calculates merged rectangles for highlighting from groups of sibling elements.
     *
     * @param groups Map of parent elements to their child elements that need highlighting.
     * @param getRect Callback to retrieve the bounding client rect of an element.
     *                Abstracted to allow testing without real DOM/layout.
     * @param getScroll Callback to retrieve current scroll position {scrollTop, scrollLeft}.
     */
    function calculateMergedRects(groups, getRect, getScroll, colorMap, annotationMap) {
        const mergedRects = [];
        const { scrollTop, scrollLeft } = getScroll();
        // Iterate groups to ensure strict adjacency
        for (const [parent, siblingsInGroup] of groups) {
            if (siblingsInGroup.length === 0)
                continue;
            // Optimization if only 1 child, no need to scan parent
            if (siblingsInGroup.length === 1) {
                addMergedRect(mergedRects, siblingsInGroup, getRect, scrollTop, scrollLeft, colorMap, annotationMap);
                continue;
            }
            // O(1) lookup
            const siblingsSet = new SvelteSet(siblingsInGroup);
            let currentBatch = [];
            // Scan parent children to respect DOM order and interruptions
            // Use parent.children to get Elements only (skip text nodes)
            const children = Array.from(parent.children);
            for (const child of children) {
                if (child instanceof HTMLElement && siblingsSet.has(child)) {
                    // Flush if metadata differs from batch anchor
                    if (currentBatch.length > 0 &&
                        !sameMetadata(currentBatch[0], child, colorMap, annotationMap)) {
                        addMergedRect(mergedRects, currentBatch, getRect, scrollTop, scrollLeft, colorMap, annotationMap);
                        currentBatch = [];
                    }
                    currentBatch.push(child);
                }
                else {
                    // Break in continuity
                    if (currentBatch.length > 0) {
                        addMergedRect(mergedRects, currentBatch, getRect, scrollTop, scrollLeft, colorMap, annotationMap);
                        currentBatch = [];
                    }
                }
            }
            // Finalize last batch
            if (currentBatch.length > 0) {
                addMergedRect(mergedRects, currentBatch, getRect, scrollTop, scrollLeft, colorMap, annotationMap);
            }
        }
        return mergedRects;
    }
    function sameMetadata(a, b, colorMap, annotationMap) {
        if ((colorMap?.get(a) ?? undefined) !== (colorMap?.get(b) ?? undefined))
            return false;
        const annA = annotationMap?.get(a);
        const annB = annotationMap?.get(b);
        if (annA?.text !== annB?.text)
            return false;
        if (annA?.corner !== annB?.corner)
            return false;
        return true;
    }
    function addMergedRect(resultList, elements, getRect, scrollTop, scrollLeft, colorMap, annotationMap) {
        if (elements.length === 0)
            return;
        let minTop = Infinity;
        let minLeft = Infinity;
        let maxRight = -Infinity;
        let maxBottom = -Infinity;
        elements.forEach((t) => {
            const r = getRect(t);
            const top = r.top + scrollTop;
            const left = r.left + scrollLeft;
            const right = left + r.width;
            const bottom = top + r.height;
            if (top < minTop)
                minTop = top;
            if (left < minLeft)
                minLeft = left;
            if (right > maxRight)
                maxRight = right;
            if (bottom > maxBottom)
                maxBottom = bottom;
        });
        const PADDING = 10;
        const rect = {
            top: minTop - PADDING,
            left: minLeft - PADDING,
            width: maxRight - minLeft + PADDING * 2,
            height: maxBottom - minTop + PADDING * 2,
            right: maxRight + PADDING,
            bottom: maxBottom + PADDING,
            element: elements[0],
        };
        const color = colorMap?.get(elements[0]);
        if (color !== undefined)
            rect.color = color;
        const annotation = annotationMap?.get(elements[0]);
        if (annotation !== undefined) {
            if (annotation.text.length > 0)
                rect.annotation = annotation.text;
            rect.annotationCorner = annotation.corner;
        }
        resultList.push(rect);
    }

    /* highlight-service.svelte.ts generated by Svelte v5.46.1 */

    const BODY_HIGHLIGHT_CLASS = 'cv-highlight-mode';

    const ARROW_OVERLAY_ID = 'cv-highlight-overlay';

    class HighlightState {
    	#rects = state(proxy([]));

    	get rects() {
    		return get(this.#rects);
    	}

    	set rects(value) {
    		set(this.#rects, value, true);
    	}
    }

    class HighlightService {
    	rootEl;
    	overlayApp;
    	state = new HighlightState();
    	resizeObserver;
    	activeTargets = [];
    	activeColors = new Map();
    	activeAnnotations = new Map();
    	onWindowResize = () => this.updatePositions();

    	constructor(rootEl) {
    		this.rootEl = rootEl;

    		this.resizeObserver = new ResizeObserver(() => {
    			this.updatePositions();
    		});
    	}

    	resolveTargets(encodedDescriptors) {
    		const descriptors = deserialize(encodedDescriptors);

    		if (!descriptors || descriptors.length === 0) return [];

    		const targets = [];

    		descriptors.forEach((desc) => {
    			const matchingEls = resolve(this.rootEl, desc);

    			if (matchingEls && matchingEls.length > 0) targets.push(...matchingEls);
    		});

    		return targets;
    	}

    	applyEncodedHighlights(encodedDescriptors) {
    		const descriptors = deserialize(encodedDescriptors);

    		if (!descriptors || descriptors.length === 0) return;

    		const targets = [];
    		const colors = new Map();
    		const annotations = new Map();

    		descriptors.forEach((desc) => {
    			const matchingEls = resolve(this.rootEl, desc);

    			if (matchingEls && matchingEls.length > 0) {
    				targets.push(...matchingEls);

    				if (desc.color) {
    					matchingEls.forEach((el) => colors.set(el, desc.color));
    				}

    				if (desc.annotation || desc.annotationCorner) {
    					matchingEls.forEach((el) => annotations.set(el, {
    						text: desc.annotation ?? '',
    						corner: desc.annotationCorner ?? DEFAULT_ANNOTATION_CORNER
    					}));
    				}
    			}
    		});

    		if (targets.length === 0) {
    			showToast('Some highlighted sections could not be found.');
    			this.exit();

    			return;
    		}

    		if (targets.length < descriptors.length) {
    			showToast('Some highlighted sections could not be found.');
    		}

    		// Activate Store
    		focusStore.setIsActive(true);

    		document.body.classList.add(BODY_HIGHLIGHT_CLASS);

    		// Create Overlay across the entire page (App will be mounted into it)
    		this.activeTargets = targets;

    		this.activeColors = colors;
    		this.activeAnnotations = annotations;

    		// Start observing
    		this.activeTargets.forEach((t) => this.resizeObserver.observe(t));

    		this.resizeObserver.observe(document.body); // Catch layout shifts
    		window.addEventListener('resize', this.onWindowResize);
    		this.renderHighlightOverlay();

    		// Scroll topmost highlighted box into view
    		const firstRect = this.state.rects[0];

    		if (firstRect) {
    			this.scrollToTargetSafely(firstRect.element);
    		}
    	}

    	exit() {
    		document.body.classList.remove(BODY_HIGHLIGHT_CLASS);
    		this.resizeObserver.disconnect();
    		window.removeEventListener('resize', this.onWindowResize);
    		this.activeTargets = [];
    		this.activeColors.clear();
    		this.activeAnnotations.clear();
    		this.state.rects = [];

    		const overlay = document.getElementById(ARROW_OVERLAY_ID);

    		if (this.overlayApp) {
    			unmount(this.overlayApp);
    			this.overlayApp = undefined;
    		}

    		if (overlay) overlay.remove();
    	}

    	renderHighlightOverlay() {
    		let overlay = document.getElementById(ARROW_OVERLAY_ID);

    		if (!overlay) {
    			overlay = document.createElement('div');
    			overlay.id = ARROW_OVERLAY_ID;
    			document.body.appendChild(overlay);
    		}

    		overlay.innerHTML = '';

    		// Initial calc
    		this.updatePositions();

    		// 2. Render Overlay Component
    		if (this.overlayApp) {
    			unmount(this.overlayApp);
    		}

    		this.overlayApp = mount(HighlightOverlay, { target: overlay, props: { box: this.state } });
    	}

    	async scrollToTarget(element) {
    		const currentShown = activeStateStore.state.shownToggles ?? [];
    		const currentPeek = activeStateStore.state.peekToggles ?? [];

    		// Walk ancestors, collecting toggle IDs that need expansion
    		const needsExpansion = [];

    		let current = element.parentElement;

    		while (current) {
    			if (current.tagName.toLowerCase() === 'cv-toggle') {
    				(current.getAttribute('toggle-id') || '').split(/\s+/).filter(Boolean).forEach((id) => {
    					if (!currentShown.includes(id)) needsExpansion.push(id);
    				});
    			}

    			current = current.parentElement;
    		}

    		// Expand any collapsed/peek ancestor toggles
    		if (needsExpansion.length > 0) {
    			activeStateStore.setToggles([...new Set([...currentShown, ...needsExpansion])], currentPeek.filter((id) => !needsExpansion.includes(id)));
    		}

    		// Wait for CSS transitions if any toggles are peek, were just expanded, or are hidden (collapsing)
    		if (needsExpansion.length > 0 || currentPeek.length > 0 || derivedStore.hiddenToggleIds.length > 0) {
    			// 350ms = 300ms CSS transition + 50ms buffer
    			await new Promise((resolve) => setTimeout(resolve, 350));
    		}

    		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    	}

    	scrollToTargetSafely(target) {
    		void this.scrollToTarget(target).catch((error) => {
    			console.error('Failed to scroll to target', error);
    		});
    	}

    	updatePositions() {
    		if (this.activeTargets.length === 0) {
    			this.state.rects = [];

    			return;
    		}

    		// Group by Parent (Siblings)
    		const groups = groupSiblings(this.activeTargets);

    		// Calculate Union Rect for each group, sorted top-to-bottom
    		this.state.rects = calculateMergedRects(
    			groups,
    			(el) => el.getBoundingClientRect(),
    			() => ({
    				scrollTop: window.pageYOffset || document.documentElement.scrollTop,
    				scrollLeft: window.pageXOffset || document.documentElement.scrollLeft
    			}),
    			this.activeColors,
    			this.activeAnnotations
    		).sort((a, b) => a.top - b.top);
    	}
    }

    /* focus-service.svelte.ts generated by Svelte v5.46.1 */

    const BODY_SHOW_CLASS = 'cv-show-mode';
    const HIDDEN_CLASS = 'cv-hidden';
    const SHOW_ELEMENT_CLASS = 'cv-show-element';

    class FocusService {
    	rootEl;
    	hiddenElements = new SvelteSet();
    	dividers = new SvelteSet(); // Store Svelte App instances
    	excludedTags;
    	excludedIds;

    	// Call unsubscribe in destroy to stop svelte effects
    	unsubscribe;

    	highlightService;

    	constructor(rootEl, options) {
    		this.rootEl = rootEl;

    		const userTags = options.shareExclusions?.tags || [];
    		const userIds = options.shareExclusions?.ids || [];

    		this.excludedTags = new SvelteSet([...DEFAULT_EXCLUDED_TAGS, ...userTags].map((t) => t.toUpperCase()));
    		this.excludedIds = new SvelteSet([...DEFAULT_EXCLUDED_IDS, ...userIds]);
    		this.highlightService = new HighlightService(this.rootEl);

    		// Subscribe to store for exit signal
    		this.unsubscribe = effect_root(() => {
    			// Store safety check (Store changes affect UI)
    			user_effect(() => {
    				if (!focusStore.isActive && (document.body.classList.contains(BODY_SHOW_CLASS) || document.body.classList.contains(BODY_HIGHLIGHT_CLASS))) {
    					this.exitShowMode(true);
    				}
    			});
    		});

    		// Listen for popstate to re-evaluate URL actions
    		window.addEventListener('popstate', this.handlePopState);

    		// Initial evaluation
    		this.applyModesFromUrl();
    	}

    	/**
    	 * Re-evaluate the URL when the browser's history changes
    	 */
    	handlePopState = () => {
    		this.applyModesFromUrl();
    	};

    	/**
    	 * Reads the current URL and applies the appropriate focus/highlight mode
    	 */
    	applyModesFromUrl() {
    		// eslint-disable-next-line svelte/prefer-svelte-reactivity
    		const url = new URL(window.location.href);

    		const showDescriptors = url.searchParams.get(PARAM_CV_SHOW);
    		const hideDescriptors = url.searchParams.get(PARAM_CV_HIDE);
    		const highlightDescriptors = url.searchParams.get(PARAM_CV_HIGHLIGHT);
    		const hasAnyMode = showDescriptors || hideDescriptors || highlightDescriptors;

    		if (!hasAnyMode) {
    			if (document.body.classList.contains(BODY_SHOW_CLASS) || document.body.classList.contains(BODY_HIGHLIGHT_CLASS)) {
    				this.exitShowMode(false);
    			}

    			return;
    		}

    		// Clear any existing active state once before re-applying
    		if (document.body.classList.contains(BODY_SHOW_CLASS) || document.body.classList.contains(BODY_HIGHLIGHT_CLASS)) {
    			this.exitShowMode(false);
    		}

    		// Pre-resolve highlight targets so show/hide modes can account for them
    		const highlightTargets = highlightDescriptors
    			? this.highlightService.resolveTargets(highlightDescriptors)
    			: [];

    		// Apply show or hide (mutually exclusive with each other).
    		// Pass highlight targets so they are kept visible in show mode / not hidden in hide mode.
    		if (showDescriptors) {
    			this.applyShowMode(showDescriptors, highlightTargets);
    		} else if (hideDescriptors) {
    			this.applyHideMode(hideDescriptors, highlightTargets);
    		}

    		// Call highlightService.applyEncodedHighlights() directly with the encoded descriptors
    		// to skip applyHighlightMode()'s guard, which would otherwise see BODY_SHOW_CLASS
    		// and clear the show mode above.
    		if (highlightDescriptors) {
    			this.highlightService.applyEncodedHighlights(highlightDescriptors);
    		}
    	}

    	/**
    	 * Applies focus mode to the specified descriptors.
    	 * @param encodedDescriptors - The encoded descriptors to apply.
    	 */
    	applyShowMode(encodedDescriptors, keepTargets = []) {
    		// Check if we are already in the right state to avoid re-rendering loops if feasible
    		if (document.body.classList.contains(BODY_SHOW_CLASS) || document.body.classList.contains(BODY_HIGHLIGHT_CLASS)) {
    			// If we are already active, we might want to check if descriptors changed?
    			// For now, simple clear and re-apply.
    			this.exitShowMode(false); // don't clear URL here
    		}

    		const descriptors = deserialize(encodedDescriptors);

    		if (!descriptors || descriptors.length === 0) return;

    		// Resolve anchors to DOM elements
    		const targets = [];

    		descriptors.forEach((desc) => {
    			const matchingEls = resolve(this.rootEl, desc);

    			if (matchingEls && matchingEls.length > 0) {
    				targets.push(...matchingEls);
    			}
    		});

    		if (targets.length === 0) {
    			showToast('Some shared sections could not be found.');
    			this.exitShowMode(); // Clears URL and resets state, preventing effect loop

    			return;
    		}

    		if (targets.length < descriptors.length) {
    			showToast('Some shared sections could not be found.');
    		}

    		// Activate Store
    		focusStore.setIsActive(true);

    		document.body.classList.add(BODY_SHOW_CLASS);

    		// Merge keepTargets (e.g. highlight targets) so they are not hidden by show mode
    		this.renderShowView([...targets, ...keepTargets]);
    	}

    	applyHideMode(encodedDescriptors, excludeTargets = []) {
    		if (document.body.classList.contains(BODY_SHOW_CLASS) || document.body.classList.contains(BODY_HIGHLIGHT_CLASS)) {
    			this.exitShowMode(false);
    		}

    		const descriptors = deserialize(encodedDescriptors);

    		if (!descriptors || descriptors.length === 0) return;

    		const targets = [];

    		descriptors.forEach((desc) => {
    			const matchingEls = resolve(this.rootEl, desc);

    			if (matchingEls && matchingEls.length > 0) {
    				targets.push(...matchingEls);
    			}
    		});

    		if (targets.length === 0) {
    			showToast('Some shared sections could not be found.');
    			this.exitShowMode(); // Clears URL and resets state

    			return;
    		}

    		if (targets.length < descriptors.length) {
    			showToast('Some shared sections could not be found.');
    		}

    		// Activate Store
    		focusStore.setIsActive(true);

    		document.body.classList.add(BODY_SHOW_CLASS);

    		// Exclude highlight targets from being hidden so they stay visible
    		const excludeSet = new Set(excludeTargets);

    		const filteredTargets = excludeTargets.length > 0 ? targets.filter((t) => !excludeSet.has(t)) : targets;

    		this.renderHiddenView(filteredTargets);
    	}

    	applyHighlightMode(encodedDescriptors) {
    		if (document.body.classList.contains(BODY_SHOW_CLASS) || document.body.classList.contains(BODY_HIGHLIGHT_CLASS)) {
    			this.exitShowMode(false);
    		}

    		this.highlightService.applyEncodedHighlights(encodedDescriptors);
    	}

    	renderHiddenView(targets) {
    		// 1. Mark targets as hidden
    		targets.forEach((t) => {
    			t.classList.add(HIDDEN_CLASS);
    			this.hiddenElements.add(t);
    		});

    		// 2. Insert Dividers
    		const processedContainers = new SvelteSet();

    		targets.forEach((el) => {
    			const parent = el.parentElement;

    			if (parent && !processedContainers.has(parent)) {
    				this.insertDividersForContainer(parent);
    				processedContainers.add(parent);
    			}
    		});
    	}

    	renderShowView(targets) {
    		// 1. Mark targets
    		targets.forEach((t) => t.classList.add(SHOW_ELEMENT_CLASS));

    		// 2. Determine what to hide
    		const elementsToHide = determineHiddenElements(targets, document.body, (el) => isElementExcluded(el, {
    			hiddenElements: this.hiddenElements,
    			excludedTags: this.excludedTags,
    			excludedIds: this.excludedIds
    		}));

    		// 3. Apply changes (Hide & Track)
    		elementsToHide.forEach((el) => {
    			el.classList.add(HIDDEN_CLASS);
    			this.hiddenElements.add(el);
    		});

    		// 4. Identify Elements to Keep Visible (Targets + Ancestors)
    		// We still need this for divider insertion optimization?
    		// Actually insertDividersForContainer uses processedContainers logic.
    		const keepVisible = new SvelteSet();

    		targets.forEach((t) => {
    			let curr = t;

    			while (curr && curr !== document.body && curr !== document.documentElement) {
    				keepVisible.add(curr);
    				curr = curr.parentElement;
    			}
    		});

    		// 5. Insert Dividers
    		const processedContainers = new SvelteSet();

    		keepVisible.forEach((el) => {
    			const parent = el.parentElement;

    			if (parent && !processedContainers.has(parent)) {
    				this.insertDividersForContainer(parent);
    				processedContainers.add(parent);
    			}
    		});
    	}

    	insertDividersForContainer(container) {
    		const children = Array.from(container.children);
    		const isHidden = (el) => el.classList.contains(HIDDEN_CLASS);
    		const groups = calculateDividerGroups(children, isHidden);

    		groups.forEach((group) => {
    			// Insert the divider before first hidden element of the group.
    			this.createDivider(container, group.startNode, group.count);
    		});
    	}

    	createDivider(container, insertBeforeEl, count) {
    		const wrapper = document.createElement('div');

    		wrapper.className = 'cv-divider-wrapper';
    		container.insertBefore(wrapper, insertBeforeEl);

    		const app = mount(FocusDivider, {
    			target: wrapper,

    			props: {
    				hiddenCount: count,

    				onExpand: () => {
    					this.expandContext(insertBeforeEl, count, app, wrapper);
    				}
    			}
    		});

    		this.dividers.add(app);
    	}

    	expandContext(firstHidden, count, app, wrapper) {
    		let curr = firstHidden;
    		let expanded = 0;

    		while (curr && expanded < count) {
    			if (curr instanceof HTMLElement && curr.classList.contains(HIDDEN_CLASS)) {
    				curr.classList.remove(HIDDEN_CLASS);
    				this.hiddenElements.delete(curr);
    			}

    			curr = curr.nextElementSibling;
    			expanded++;
    		}

    		// Cleanup
    		unmount(app);

    		this.dividers.delete(app);
    		wrapper.remove();

    		// If no more hidden elements, exit completely
    		if (this.hiddenElements.size === 0) {
    			focusStore.exit();
    		}
    	}

    	exitShowMode(updateUrl = true) {
    		document.body.classList.remove(BODY_SHOW_CLASS, BODY_HIGHLIGHT_CLASS);
    		this.hiddenElements.forEach((el) => el.classList.remove(HIDDEN_CLASS));
    		this.hiddenElements.clear();

    		// Remove dividers
    		this.dividers.forEach((app) => unmount(app));

    		this.dividers.clear();

    		// Remove wrappers?
    		document.querySelectorAll('.cv-divider-wrapper').forEach((el) => el.remove());

    		// Remove styling from targets
    		const targets = document.querySelectorAll(`.${SHOW_ELEMENT_CLASS}`);

    		targets.forEach((t) => t.classList.remove(SHOW_ELEMENT_CLASS));
    		this.highlightService.exit();

    		if (focusStore.isActive) {
    			focusStore.setIsActive(false);
    		}

    		if (updateUrl) {
    			// eslint-disable-next-line svelte/prefer-svelte-reactivity
    			const url = new URL(window.location.href);

    			let changed = false;

    			if (url.searchParams.has(PARAM_CV_SHOW)) {
    				url.searchParams.delete(PARAM_CV_SHOW);
    				changed = true;
    			}

    			if (url.searchParams.has(PARAM_CV_HIDE)) {
    				url.searchParams.delete(PARAM_CV_HIDE);
    				changed = true;
    			}

    			if (url.searchParams.has(PARAM_CV_HIGHLIGHT)) {
    				url.searchParams.delete(PARAM_CV_HIGHLIGHT);
    				changed = true;
    			}

    			if (changed) {
    				window.history.replaceState({}, '', url.toString());
    			}
    		}
    	}

    	destroy() {
    		this.exitShowMode();
    		this.unsubscribe();
    		window.removeEventListener('popstate', this.handlePopState);
    	}
    }

    /**
     * DOM Scanner for Variable Interpolation
     *
     * Scans the DOM for [[ variable_name ]] patterns and replaces them with
     * reactive spans that update when the variable store changes.
     */
    // Regex to find [[ variable : fallback ]] or [[ variable ? truthy : falsy ]]
    // Group 1: escape character (backslashes)
    // Group 2: variable name (alphanumeric, underscores, hyphens)
    // Group 3 (optional): * modifier — when present, conditional resolves any value (user OR registry default)
    // Group 4 (optional): conditional truthy template (only when ? is present)
    // Group 5 (optional): conditional falsy string (only when ? is present)
    // Group 6 (optional): fallback value (only when : without ?)
    const VAR_REGEX = /(\\)?\[\[\s*([a-zA-Z0-9_-]+)(\*)?\s*(?:\?\s*(.*?)\s*:\s*(.*?)|:\s*(.*?))?\s*\]\]/g;
    // Non-global version for stateless testing
    const VAR_TESTER = /(\\)?\[\[\s*([a-zA-Z0-9_-]+)(\*)?\s*(?:\?\s*(.*?)\s*:\s*(.*?)|:\s*(.*?))?\s*\]\]/;
    class PlaceholderBinder {
        /**
         * Scans the root element for text nodes containing variable placeholders.
         * Also scans for elements with .cv-bind or [data-cv-bind] to setup attribute bindings.
         */
        static scanAndHydrate(root) {
            this.scanTextNodes(root);
            this.scanAttributeBindings(root);
        }
        /**
         * Updates attribute bindings for all elements participating in placeholder binding.
         * Specifically updates attributes on elements with [data-cv-attr-templates].
         * Text content is updated separately via <cv-placeholder> component reactivity.
         */
        static updateAll(values) {
            this.updateAttributeBindings(values);
        }
        // =========================================================================
        // Scanning Logic
        // =========================================================================
        static scanTextNodes(root) {
            const textNodes = [];
            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    // Skip script/style tags
                    if (node.parentElement && ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    // Skip existing placeholders to prevent observer loops
                    if (node.parentElement && node.parentElement.tagName === 'CV-PLACEHOLDER') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return VAR_TESTER.test(node.nodeValue || '')
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_SKIP;
                },
            });
            while (walker.nextNode()) {
                textNodes.push(walker.currentNode);
            }
            // Process nodes
            textNodes.forEach((node) => {
                PlaceholderBinder.processTextNode(node);
            });
        }
        static scanAttributeBindings(root) {
            // Attribute Scanning (Opt-in)
            const candidates = root.querySelectorAll('.cv-bind, [data-cv-bind]');
            candidates.forEach((el) => {
                if (el instanceof HTMLElement) {
                    PlaceholderBinder.processElementAttributes(el);
                }
            });
        }
        static processTextNode(textNode) {
            const text = textNode.nodeValue || '';
            let match;
            let lastIndex = 0;
            const fragment = document.createDocumentFragment();
            let hasMatch = false;
            // Reset regex state
            VAR_REGEX.lastIndex = 0;
            while ((match = VAR_REGEX.exec(text)) !== null) {
                hasMatch = true;
                const [fullMatch, escape, name, modifier, condTruthy, condFalsy, fallback] = match;
                const index = match.index;
                if (!name)
                    continue;
                // Append text before match
                if (index > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));
                }
                if (escape) {
                    // If escaped, append the text without the backslash
                    // fullMatch matches '\[[...]]', slice(1) gives '[[...]]'
                    fragment.appendChild(document.createTextNode(fullMatch.slice(1)));
                }
                else {
                    // Create Placeholder Custom Element
                    const el = document.createElement('cv-placeholder');
                    el.setAttribute('name', name);
                    if (condTruthy !== undefined) {
                        el.setAttribute('truthy', condTruthy);
                        el.setAttribute('falsy', condFalsy ?? '');
                        if (modifier === '*')
                            el.setAttribute('any-value', '');
                    }
                    else if (fallback !== undefined) {
                        el.setAttribute('fallback', fallback);
                    }
                    fragment.appendChild(el);
                    // Register detection
                    elementStore.registerPlaceholder(name);
                }
                lastIndex = VAR_REGEX.lastIndex;
            }
            if (hasMatch) {
                // Append remaining text
                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                }
                textNode.replaceWith(fragment);
            }
        }
        static processElementAttributes(el) {
            if (el.dataset.cvAttrTemplates)
                return; // Already processed
            const templates = {};
            let hasBindings = false;
            // Iterate all attributes
            for (const attr of Array.from(el.attributes)) {
                // Skip system attributes and class (to avoid conflicts with dynamic class manipulation)
                if (attr.name === 'data-cv-bind' ||
                    attr.name === 'data-cv-attr-templates' ||
                    attr.name === 'class') {
                    continue;
                }
                if (VAR_TESTER.test(attr.value)) {
                    templates[attr.name] = attr.value;
                    hasBindings = true;
                }
            }
            if (hasBindings) {
                el.dataset.cvAttrTemplates = JSON.stringify(templates);
                const matcher = new RegExp(VAR_REGEX.source, 'g');
                Object.values(templates).forEach((tmpl) => {
                    matcher.lastIndex = 0; // Reset regex state for each template
                    let match;
                    while ((match = matcher.exec(tmpl)) !== null) {
                        if (!match[1] && match[2]) {
                            elementStore.registerPlaceholder(match[2]);
                        }
                    }
                });
            }
        }
        // =========================================================================
        // Update Logic
        // =========================================================================
        static updateAttributeBindings(values) {
            const attrElements = document.querySelectorAll('[data-cv-attr-templates]');
            attrElements.forEach((el) => {
                if (el instanceof HTMLElement) {
                    try {
                        const templates = JSON.parse(el.dataset.cvAttrTemplates || '{}');
                        Object.entries(templates).forEach(([attrName, template]) => {
                            const newValue = PlaceholderBinder.interpolateString(template, values, attrName);
                            el.setAttribute(attrName, newValue);
                        });
                    }
                    catch (e) {
                        console.warn('Failed to parse cv-attr-templates', e);
                    }
                }
            });
        }
        /**
         * Checks if a value is a full URL with protocol
         * (e.g., http://, https://, ftp://, data:, mailto:)
         */
        static isFullUrl(value) {
            // Match protocol://... OR protocol: (for mailto:, data:, tel:, etc.)
            // Protocol must start with letter per RFC 3986
            return /^[a-z][a-z0-9+.-]*:/i.test(value);
        }
        /**
         * Checks if a value is a relative URL path (e.g., /, ./, ../)
         */
        static isRelativeUrl(value) {
            return value.startsWith('/') || value.startsWith('./') || value.startsWith('../');
        }
        /**
         * Resolves value for a placeholder using only user-set values (no registry defaults).
         * Returns undefined if the user has not explicitly set a non-empty value.
         *
         * Used by conditional syntax `[[name ? truthy : falsy]]` (without `*`) and
         * `<cv-toggle placeholder-id="name">` (without `*`).
         *
         * @param name - The placeholder name to resolve
         * @param values - Record of user-set placeholder values
         * @returns The user-set value, or undefined if not set
         */
        static resolveUserValue(name, values) {
            const userVal = values[name];
            return userVal !== undefined && userVal !== '' ? userVal : undefined;
        }
        /**
         * Resolves value for a placeholder by checking and using sources in order of:
         * 1. user-set value, 2. registry default value, 3. inline fallback value
         *
         * Empty strings are treated as "not set" and will fall through to the next priority level.
         *
         * @param name - The placeholder name to resolve
         * @param fallback - Optional inline fallback value from the usage syntax (e.g., `[[ name : fallback ]]`)
         * @param values - Record of user-set placeholder values
         * @returns The resolved value, or undefined if no value is available from any source
         */
        static resolveValue(name, fallback, values) {
            const userVal = values[name];
            // Look up registry definition
            const def = placeholderRegistryStore.get(name);
            const registryDefault = def?.defaultValue;
            if (userVal !== undefined && userVal !== '') {
                return userVal;
            }
            else if (fallback !== undefined) {
                return fallback;
            }
            else if (registryDefault !== undefined && registryDefault !== '') {
                return registryDefault;
            }
            return undefined;
        }
        /**
         * Interpolates placeholder patterns in a template string with their resolved values.
         *
         * Replaces all `[[ name ]]` or `[[ name : fallback ]]` patterns with their resolved values.
         * Escaped patterns (e.g., `\[[ name ]]`) are preserved as literal text.
         *
         * For `href` and `src` attributes, applies context-aware URL encoding:
         * - Full URLs (http://, https://, mailto:, data:, etc.) are preserved as-is
         * - Relative URLs (/, ./, ../) are preserved as-is
         * - URL components (query parameters, path segments) are encoded with encodeURIComponent
         *
         * @param template - The template string containing placeholder patterns
         * @param values - Record of user-set placeholder values
         * @param attrName - Optional attribute name (enables URL encoding for 'href' and 'src')
         * @returns The interpolated string with all placeholders replaced
         */
        static interpolateString(template, values, attrName) {
            return template.replace(VAR_REGEX, (_full, escape, name, modifier, condTruthy, condFalsy, fallback) => {
                if (escape)
                    return `[[${name}]]`;
                if (condTruthy !== undefined) {
                    let val = modifier === '*'
                        ? PlaceholderBinder.resolveValue(name, undefined, values)
                        : PlaceholderBinder.resolveUserValue(name, values);
                    if (val === undefined)
                        return condFalsy ?? '';
                    // URL-encode the value component (same as regular placeholders)
                    if (attrName && (attrName === 'href' || attrName === 'src')) {
                        if (!PlaceholderBinder.isFullUrl(val) && !PlaceholderBinder.isRelativeUrl(val)) {
                            val = encodeURIComponent(val);
                        }
                    }
                    return condTruthy.replace(/\$/g, () => val);
                }
                let val = PlaceholderBinder.resolveValue(name, fallback, values);
                if (val === undefined)
                    return `[[${name}]]`;
                // Context-aware encoding for URL attributes
                if (attrName && (attrName === 'href' || attrName === 'src')) {
                    // Don't encode full URLs or relative URLs - only encode URL components
                    if (!PlaceholderBinder.isFullUrl(val) && !PlaceholderBinder.isRelativeUrl(val)) {
                        val = encodeURIComponent(val);
                    }
                }
                return val;
            });
        }
    }

    /* adaptation-store.svelte.ts generated by Svelte v5.46.1 */

    class AdaptationStore {
    	#activeConfig = state(null);

    	get activeConfig() {
    		return get(this.#activeConfig);
    	}

    	set activeConfig(value) {
    		set(this.#activeConfig, value, true);
    	}

    	init(config) {
    		this.activeConfig = config;
    	}
    }

    const adaptationStore = new AdaptationStore();

    /* runtime.svelte.ts generated by Svelte v5.46.1 */

    function stripAdaptationPlaceholders(state) {
    	if (!state.placeholders) return state;

    	const filtered = {};

    	for (const [key, value] of Object.entries(state.placeholders)) {
    		const def = placeholderRegistryStore.get(key);

    		if (!def?.adaptationPlaceholder) filtered[key] = value;
    	}

    	return { ...state, placeholders: filtered };
    }

    /**
     * The reactive runtime for CustardUI. Manages the full lifecycle: initialization,
     * state resolution, reactive side-effects (URL sync, persistence), DOM observation, and teardown.
     * Components (Toggle, TabGroup) are self-contained and self-managing via the global store.
     */
    class AppRuntime {
    	rootEl;
    	persistenceManager;
    	focusService;
    	iconSettingsStore;
    	observer;
    	destroyEffectRoot;
    	onHashChange;

    	constructor(opt) {
    		this.rootEl = opt.rootEl || document.body;
    		this.persistenceManager = new PersistenceManager(opt.storageKey);
    		this.iconSettingsStore = new IconSettingsStore(this.persistenceManager);

    		// Initialize all store singletons with config
    		this.initStores(opt.configFile);

    		// Initialize adaptation store
    		adaptationStore.init(opt.adaptationConfig ?? null);

    		// Initial State Resolution:
    		// URL (Sparse Override) > Persistence (Full) > Adaptation Defaults > Config Default
    		this.resolveInitialState(opt.adaptationConfig ?? null);

    		// Resolve Exclusions
    		this.focusService = new FocusService(this.rootEl, {
    			shareExclusions: opt.configFile.config?.shareExclusions || {}
    		});
    	}

    	/**
    	 * Initialize all stores with configuration from the config file.
    	 * Populates the singleton sub-stores with real data.
    	 */
    	initStores(configFile) {
    		const config = configFile.config || {};
    		const settings = configFile.settings?.panel || {};

    		// Process Global Placeholders from Config
    		placeholderManager.registerConfigPlaceholders(config);

    		// Initialize ActiveStateStore with config
    		activeStateStore.init(config);

    		// Register tab-group placeholders AFTER global config placeholders to preserve precedence
    		placeholderManager.registerTabGroupPlaceholders(config);

    		// Initialize UI Options from Settings
    		uiStore.setUIOptions({
    			showTabGroups: settings.showTabGroups ?? true,
    			showReset: settings.showReset ?? true,
    			title: settings.title ?? 'Customize View',
    			description: settings.description ?? ''
    		});
    	}

    	/**
    	 * Resolves the starting application state by layering sources:
    	 *
    	 * 1. **Baseline**: `ActiveStateStore` initializes with defaults from the config file.
    	 * 2. **Adaptation Defaults**: If an adaptation is active, its defaults are applied
    	 *    on top of the config defaults (before persisted state, so user choices can win).
    	 * 3. **Persistence**: If local storage has a saved state, it replaces the baseline (`applyState`).
    	 * 4. **URL Overrides**: If the URL contains parameters (`?t-show=X`), these are applied
    	 *    as **sparse overrides** (`applyDifferenceInState`). Toggles not mentioned in the URL
    	 *    retain their values from persistence/defaults.
    	 */
    	resolveInitialState(adaptationConfig) {
    		// 1. Apply adaptation defaults on top of config defaults (before persisted state)
    		if (adaptationConfig?.defaults) {
    			activeStateStore.applyAdaptationDefaults(adaptationConfig.defaults);
    		}

    		// 2. Apply persisted base state on top of defaults (user choices win over adaptation defaults).
    		const persistedState = this.persistenceManager.getPersistedState();

    		if (persistedState) {
    			activeStateStore.applyState(persistedState);
    		}

    		// 3. Layer URL delta on top, then clear the URL parameters so they don't persist
    		const urlDelta = URLStateManager.parseURL();

    		if (urlDelta) {
    			activeStateStore.applyDifferenceInState(urlDelta);
    			URLStateManager.clearURL();
    		}

    		// 4. Restore UI preferences
    		const navPref = this.persistenceManager.getPersistedTabNavVisibility();

    		if (navPref !== null) {
    			uiStore.isTabGroupNavHeadingVisible = navPref;
    		}
    	}

    	/**
    	 * Starts the CustardUI execution engine.
    	 *
    	 * Components (Toggle, TabGroup) self-register during their mount lifecycle.
    	 * This method starts the global observers for DOM changes and reactive state side-effects.
    	 */
    	start() {
    		this.scanDOM();
    		this.startComponentObserver();
    		this.startGlobalReactivity();
    	}

    	// --- Execution Helpers ---
    	/**
    	 * Performs an initial, non-reactive scan of the DOM for placeholders.
    	 */
    	scanDOM() {
    		// Clear previous page detections if any (SPA support)
    		elementStore.clearDetectedPlaceholders();

    		PlaceholderBinder.scanAndHydrate(this.rootEl);
    	}

    	/**
    	 * Sets up global reactivity using `$effect.root` for persistence and placeholder binding.
    	 */
    	startGlobalReactivity() {
    		this.destroyEffectRoot = effect_root(() => {
    			// Automatic Persistence
    			user_effect(() => {
    				this.persistenceManager.persistState(stripAdaptationPlaceholders(activeStateStore.state));
    				this.persistenceManager.persistTabNavVisibility(uiStore.isTabGroupNavHeadingVisible);
    			});

    			// Automatic Placeholder Updates
    			user_effect(() => {
    				PlaceholderBinder.updateAll(activeStateStore.state.placeholders ?? {});
    			});
    		});

    		// When the user navigates to a hash anchor (#section), the hash indicator
    		// (#/id) is replaced by the browser. Re-run the indicator logic so it
    		// falls back to ?adapt=id for the now-occupied hash.
    		const activeAdaptationId = adaptationStore.activeConfig?.id;

    		if (activeAdaptationId) {
    			this.onHashChange = () => {
    				AdaptationManager.rewriteUrlIndicator(activeAdaptationId);
    			};

    			window.addEventListener('hashchange', this.onHashChange);
    		}
    	}

    	/**
    	 * Sets up a MutationObserver to detect content added dynamically to the page
    	 * (e.g. by other scripts, lazy loading, or client-side routing).
    	 */
    	startComponentObserver() {
    		this.observer = new MutationObserver((mutations) => {
    			for (const mutation of mutations) {
    				if (mutation.type !== 'childList') continue;

    				mutation.addedNodes.forEach((node) => this.handleForPlaceholders(node));
    			}
    		});

    		// Observe the entire document tree for changes
    		this.observer.observe(this.rootEl, { childList: true, subtree: true });
    	}

    	/**
    	 * Processes a newly added DOM node to check for and hydrate placeholders.
    	 */
    	handleForPlaceholders(node) {
    		// Skip our own custom elements to avoid unnecessary scanning
    		if (node.nodeType === Node.ELEMENT_NODE) {
    			const el = node;

    			if (el.tagName === 'CV-PLACEHOLDER' || el.tagName === 'CV-PLACEHOLDER-INPUT') {
    				return;
    			}
    		}

    		// Case 1: A new HTML element was added (e.g. via innerHTML or appendChild).
    		// Recursively scan inside for any new placeholders.
    		if (node.nodeType === Node.ELEMENT_NODE) {
    			PlaceholderBinder.scanAndHydrate(node);
    		} else // Case 2: A raw text node was added directly.
    		// Check looks like a variable `[[...]]` to avoid unnecessary scans of plain text.
    		if (node.nodeType === Node.TEXT_NODE && node.parentElement && node.nodeValue?.includes('[[') && node.nodeValue?.includes(']]')) {
    			// Re-scan parent to properly wrap text node in reactive span.
    			PlaceholderBinder.scanAndHydrate(node.parentElement);
    		}
    	}

    	// --- Public APIs for Widget/Other ---
    	resetToDefault() {
    		this.persistenceManager.clearAll();
    		activeStateStore.reset();

    		// Re-apply adaptation defaults so adaptation-controlled placeholders are not wiped by reset.
    		if (adaptationStore.activeConfig?.defaults) {
    			activeStateStore.applyAdaptationDefaults(adaptationStore.activeConfig.defaults);
    		}

    		uiStore.reset();
    		uiStore.isTabGroupNavHeadingVisible = true;
    	}

    	destroy() {
    		this.observer?.disconnect();
    		this.destroyEffectRoot?.();
    		this.focusService.destroy();

    		if (this.onHashChange) {
    			window.removeEventListener('hashchange', this.onHashChange);
    		}
    	}
    }

    var root$7 = from_svg(`<svg><polyline points="6 9 12 15 18 9"></polyline></svg>`);

    function IconChevronDown($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$7();

    	attribute_effect(svg, () => ({
    		viewBox: '0 0 24 24',
    		width: '24',
    		height: '24',
    		fill: 'none',
    		stroke: 'currentColor',
    		'stroke-width': '2',
    		'stroke-linecap': 'round',
    		'stroke-linejoin': 'round',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root$6 = from_svg(`<svg><polyline points="18 15 12 9 6 15"></polyline></svg>`);

    function IconChevronUp($$anchor, $$props) {
    	let rest = rest_props($$props, ['$$slots', '$$events', '$$legacy']);
    	var svg = root$6();

    	attribute_effect(svg, () => ({
    		viewBox: '0 0 24 24',
    		width: '24',
    		height: '24',
    		fill: 'none',
    		stroke: 'currentColor',
    		'stroke-width': '2',
    		'stroke-linecap': 'round',
    		'stroke-linejoin': 'round',
    		...rest
    	}));

    	append($$anchor, svg);
    }

    var root_2$2 = from_html(`<span class="cv-placeholder-label svelte-1ka2eec"> </span>`);
    var root_3$1 = from_html(`<button type="button"></button>`);
    var root_1$3 = from_html(`<div class="cv-toggle-placeholder svelte-1ka2eec" role="group"><!> <div class="cv-state-dots svelte-1ka2eec" role="group" aria-label="Visibility states"></div></div>`);
    var root_4 = from_html(`<div class="cv-toggle-label svelte-1ka2eec"> </div>`);
    var root_6 = from_html(`<button type="button"></button>`);
    var root_5 = from_html(`<div class="cv-state-dots cv-state-dots--floating svelte-1ka2eec" role="group" aria-label="Visibility states"></div>`);
    var root_8 = from_html(`<!> <span class="cv-expand-label svelte-1ka2eec">Show less</span>`, 1);
    var root_9 = from_html(`<!> <span class="cv-expand-label svelte-1ka2eec">Show more</span>`, 1);
    var root_7 = from_html(`<button type="button" class="cv-expand-btn svelte-1ka2eec"><!></button>`);
    var root$5 = from_html(`<!> <div><!> <!> <div class="cv-toggle-content svelte-1ka2eec"><div class="cv-toggle-inner svelte-1ka2eec"><!></div></div> <!></div>`, 1);

    const $$css$6 = {
    	hash: 'svelte-1ka2eec',
    	code: ':host {display:block;position:relative;z-index:1;overflow:visible;}\n\n  /* Host visibility control */:host([hidden]) {display:none;}.cv-toggle-wrapper.svelte-1ka2eec {position:relative;width:100%;transition:all 0.35s cubic-bezier(0.4, 0, 0.2, 1);margin-bottom:4px;}.cv-toggle-wrapper.hidden.svelte-1ka2eec {margin-bottom:0;}.cv-toggle-wrapper.peek-mode.svelte-1ka2eec {margin-bottom:28px;}.cv-toggle-content.svelte-1ka2eec {overflow:hidden;transition:max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n      opacity 0.3s ease,\n      overflow 0s 0s;}.cv-toggle-inner.svelte-1ka2eec {display:flow-root; /* Ensures margins of children are contained */}\n\n  /* Hidden State */.hidden.svelte-1ka2eec .cv-toggle-content:where(.svelte-1ka2eec) {opacity:0;pointer-events:none;}\n\n  /* Bordered State */.has-border.svelte-1ka2eec {box-sizing:border-box;border:2px dashed rgba(0, 0, 0, 0.15);border-bottom:none;box-shadow:0 2px 8px rgba(0, 0, 0, 0.05),\n      inset 0 -15px 10px -10px rgba(0, 0, 0, 0.1);border-radius:8px 8px 0 0;padding:12px 0 0 0;margin-top:4px;}\n\n  /* Visible / Expanded State */.expanded.svelte-1ka2eec .cv-toggle-content:where(.svelte-1ka2eec) {opacity:1;transform:translateY(0);overflow:visible;transition:max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n      opacity 0.3s ease,\n      overflow 0s 0.35s;}\n\n  /* When expanded, complete the border */.has-border.expanded.svelte-1ka2eec {border-bottom:2px dashed rgba(0, 0, 0, 0.15);border-radius:8px;padding-bottom:12px;box-shadow:0 2px 8px rgba(0, 0, 0, 0.05);}\n\n  /* Peek State — smoother gradient */.peeking.svelte-1ka2eec .cv-toggle-content:where(.svelte-1ka2eec) {opacity:1;mask-image:linear-gradient(to bottom, black 30%, rgba(0,0,0,0.5) 70%, transparent 100%);-webkit-mask-image:linear-gradient(to bottom, black 30%, rgba(0,0,0,0.5) 70%, transparent 100%);}\n\n  /* Label Style */.cv-toggle-label.svelte-1ka2eec {position:absolute;top:-12px;left:0;background:#e0e0e0;color:#333;font-size:0.75rem;font-weight:600;padding:2px 8px;border-radius:4px;z-index:10;pointer-events:auto;box-shadow:0 1px 2px rgba(0, 0, 0, 0.1);}\n\n  /* Adjust label position if bordered */.has-border.svelte-1ka2eec .cv-toggle-label:where(.svelte-1ka2eec) {top:-10px;left:0;}\n\n  /* Hidden-state placeholder bar */.cv-toggle-placeholder.svelte-1ka2eec {display:flex;align-items:center;justify-content:space-between;padding:4px 8px;min-height:24px;border:1px solid rgba(0, 0, 0, 0.06);border-radius:6px;background:rgba(0, 0, 0, 0.015);margin-bottom:4px;transition:border-color 0.2s ease, background 0.2s ease;}.cv-toggle-placeholder.svelte-1ka2eec:hover {border-color:rgba(0, 0, 0, 0.12);background:rgba(0, 0, 0, 0.025);}.cv-placeholder-label.svelte-1ka2eec {font-size:0.7rem;font-weight:500;color:rgba(0, 0, 0, 0.35);letter-spacing:0.02em;user-select:none;}\n\n  /* 3-dot state indicator */.cv-state-dots.svelte-1ka2eec {display:flex;align-items:center;gap:5px;}\n\n  /* Floating position (top-right of content) */.cv-state-dots--floating.svelte-1ka2eec {position:absolute;top:-2px;right:0;z-index:10;opacity:0;transition:opacity 0.2s ease;}.cv-toggle-wrapper.svelte-1ka2eec:hover .cv-state-dots--floating:where(.svelte-1ka2eec),\n  .cv-state-dots--floating.svelte-1ka2eec:focus-within {opacity:1;}\n\n  /* Adjust floating dots when bordered */.has-border.svelte-1ka2eec .cv-state-dots--floating:where(.svelte-1ka2eec) {top:4px;right:8px;}.cv-dot.svelte-1ka2eec {position:relative;width:7px;height:7px;border-radius:50%;border:1.5px solid rgba(0, 0, 0, 0.2);background:transparent;padding:0;cursor:pointer;transition:all 0.15s ease;flex-shrink:0;}\n\n  /* Expand tap target to ~20px while keeping dot visually small */.cv-dot.svelte-1ka2eec::before {content:\'\';position:absolute;top:50%;left:50%;width:20px;height:20px;transform:translate(-50%, -50%);border-radius:50%;}.cv-dot.svelte-1ka2eec:hover {border-color:rgba(0, 0, 0, 0.5);transform:scale(1.3);}.cv-dot.active.svelte-1ka2eec {background:var(--cv-primary, #3E84F4);border-color:var(--cv-primary, #3E84F4);}.cv-dot.active.svelte-1ka2eec:hover {transform:scale(1.3);}\n\n  /* Expand Button — upgraded to pill style */.cv-expand-btn.svelte-1ka2eec {position:absolute;bottom:-28px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(0, 0, 0, 0.04);border:1px solid rgba(0, 0, 0, 0.08);border-radius:999px;padding:3px 12px;cursor:pointer;z-index:100;color:#666;font-size:0.7rem;font-weight:500;font-family:inherit;line-height:1;transition:all 0.2s ease;}.cv-expand-btn.svelte-1ka2eec:hover {background:rgba(0, 0, 0, 0.08);border-color:rgba(0, 0, 0, 0.15);color:#333;transform:translateX(-50%) scale(1.02);}.cv-expand-btn.svelte-1ka2eec svg {display:block;width:14px;height:14px;opacity:0.6;flex-shrink:0;}.cv-expand-btn.svelte-1ka2eec:hover svg {opacity:1;}.cv-expand-label.svelte-1ka2eec {white-space:nowrap;}'
    };

    function Toggle($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$6);

    	// Props using Svelte 5 runes
    	let toggleId = prop($$props, 'toggleId', 7, ''),
    		showPeekBorder = prop($$props, 'showPeekBorder', 7, false),
    		showLabel = prop($$props, 'showLabel', 7, false),
    		showInlineControl = prop($$props, 'showInlineControl', 7, false),
    		placeholderId = prop($$props, 'placeholderId', 7, '');

    	// Derive toggle IDs from toggle-id prop (can have multiple space-separated IDs)
    	let toggleIds = user_derived(() => (toggleId() || '').split(/\s+/).filter(Boolean));

    	let toggleConfig = user_derived(() => activeStateStore.config.toggles?.find((t) => t.toggleId === get(toggleIds)[0]));

    	user_effect(() => {
    		get(toggleIds).forEach((id) => elementStore.registerToggle(id));
    	});

    	// Placeholder mode: show/hide based on whether a placeholder has a value
    	let placeholderName = user_derived(() => placeholderId().replace(/\*$/, ''));

    	let placeholderAny = user_derived(() => placeholderId().endsWith('*'));
    	let isPlaceholderMode = user_derived(() => !!placeholderId());

    	let placeholderVisible = user_derived(() => {
    		if (!get(isPlaceholderMode)) return false;

    		const values = activeStateStore.state.placeholders ?? {};

    		if (get(placeholderAny)) {
    			return PlaceholderBinder.resolveValue(get(placeholderName), undefined, values) !== undefined;
    		}

    		return PlaceholderBinder.resolveUserValue(get(placeholderName), values) !== undefined;
    	});

    	user_effect(() => {
    		if (placeholderId() && toggleId()) {
    			console.warn(`[cv-toggle] Both 'toggle-id' and 'placeholder-id' are set. ` + `'placeholder-id' will take precedence and 'toggle-id' will be ignored.`);
    		}

    		if (placeholderId()) elementStore.registerPlaceholder(get(placeholderName));
    	});

    	// Derive label text from config
    	let labelText = user_derived(() => {
    		if (!get(toggleConfig)) return '';

    		return get(toggleConfig).label || get(toggleIds)[0];
    	});

    	let localExpanded = state(false);
    	let isUnconstrained = state(false /* New state to track if we can release max-height */);
    	let contentEl;
    	let innerEl;
    	let scrollHeight = state(0);

    	// Derive visibility from store state
    	let showState = user_derived(() => {
    		// Default to SHOWN if config hasn't loaded yet (prevent pop-in)
    		if (!activeStateStore.config.toggles) return true;

    		const shownToggles = activeStateStore.state.shownToggles ?? [];

    		return get(toggleIds).some((id) => shownToggles.includes(id));
    	});

    	// Derive peek state from store state
    	let peekState = user_derived(() => {
    		const peekToggles = activeStateStore.state.peekToggles ?? [];

    		return !get(showState) && get(toggleIds).some((id) => peekToggles.includes(id));
    	});

    	const PEEK_HEIGHT = 70;
    	let isSmallContent = state(false);

    	// Setup ResizeObserver to track content height changes (e.g. images loading, window resize)
    	user_effect(() => {
    		if (!contentEl) return;

    		const observer = new ResizeObserver(() => {
    			// We measure the inner element's height
    			// contentEl is the window, innerEl is the content
    			if (innerEl) {
    				set(scrollHeight, innerEl.offsetHeight, true);
    			}

    			// Always track small content state to avoid race conditions/stale state
    			if (get(scrollHeight) > 0) {
    				if (get(scrollHeight) <= PEEK_HEIGHT) {
    					set(isSmallContent, true);
    				} else if (!get(isSmallContent)) {
    					// Only set to false if it wasn't already true (latch behavior)
    					// This ensures if it STARTS small, growing won't add the button.
    					set(isSmallContent, false);
    				}
    			}
    		});

    		if (innerEl) {
    			observer.observe(innerEl);
    			set(scrollHeight, innerEl.offsetHeight, true);
    		}

    		return () => {
    			observer.disconnect();
    		};
    	});

    	let showFullContent = user_derived(() => get(isPlaceholderMode)
    		? get(placeholderVisible)
    		: get(showState) || get(peekState) && get(localExpanded) || get(peekState) && get(isSmallContent));

    	// Reset unconstrained state when toggling
    	user_effect(() => {
    		if (get(showFullContent)) {
    			// Expanding: start constrained (to animate), will unlock on transitionend
    			set(isUnconstrained, false);
    		} else {
    			// Collapsing: must recapture height immediately (snap) or stay constrained
    			set(isUnconstrained, false);
    		}
    	});

    	// Only show peek styling (mask) if it's peeking, not expanded locally, AND content is actually taller than peek height
    	let showPeekContent = user_derived(() => !get(showState) && get(peekState) && !get(localExpanded) && !get(isSmallContent));

    	let isHidden = user_derived(() => get(isPlaceholderMode)
    		? !get(placeholderVisible)
    		: !get(showState) && !get(peekState));

    	// Calculate dynamic max-height for animation
    	let currentMaxHeight = user_derived(() => {
    		if (get(isHidden)) return '0px';
    		if (get(isUnconstrained) && get(showFullContent)) return 'none'; /* Release constraint when stable */
    		if (get(showPeekContent)) return `${PEEK_HEIGHT}px`;
    		if (get(showFullContent)) return get(scrollHeight) > 0 ? `${get(scrollHeight)}px` : '9999px';

    		return '0px';
    	});

    	function handleTransitionEnd(e) {
    		// Only care about max-height transitions on the content element
    		if (e.propertyName !== 'max-height' || e.target !== contentEl) return;

    		// If we finished expanding, release the height constraint
    		if (get(showFullContent)) {
    			set(isUnconstrained, true);
    		}
    	}

    	function toggleExpand(e) {
    		e.stopPropagation();
    		set(localExpanded, !get(localExpanded));
    	}

    	// Derive current state for inline 3-dot indicator
    	let currentInlineState = user_derived(() => {
    		if (get(showState)) return 'show';
    		if (get(peekState)) return 'peek';

    		return 'hide';
    	});

    	// Set toggle to a specific state (used by inline dot controls)
    	function setToggleState(e, targetState) {
    		e.stopPropagation();
    		get(toggleIds).forEach((id) => activeStateStore.updateToggleState(id, targetState));
    	}

    	var $$exports = {
    		get toggleId() {
    			return toggleId();
    		},

    		set toggleId($$value = '') {
    			toggleId($$value);
    			flushSync();
    		},

    		get showPeekBorder() {
    			return showPeekBorder();
    		},

    		set showPeekBorder($$value = false) {
    			showPeekBorder($$value);
    			flushSync();
    		},

    		get showLabel() {
    			return showLabel();
    		},

    		set showLabel($$value = false) {
    			showLabel($$value);
    			flushSync();
    		},

    		get showInlineControl() {
    			return showInlineControl();
    		},

    		set showInlineControl($$value = false) {
    			showInlineControl($$value);
    			flushSync();
    		},

    		get placeholderId() {
    			return placeholderId();
    		},

    		set placeholderId($$value = '') {
    			placeholderId($$value);
    			flushSync();
    		}
    	};

    	var fragment = root$5();
    	var node = first_child(fragment);

    	{
    		var consequent_1 = ($$anchor) => {
    			var div = root_1$3();
    			var node_1 = child(div);

    			{
    				var consequent = ($$anchor) => {
    					var span = root_2$2();
    					var text = child(span, true);

    					reset(span);
    					template_effect(() => set_text(text, get(labelText)));
    					append($$anchor, span);
    				};

    				if_block(node_1, ($$render) => {
    					if (get(labelText)) $$render(consequent);
    				});
    			}

    			var div_1 = sibling(node_1, 2);

    			each(div_1, 20, () => ['hide', 'peek', 'show'], index, ($$anchor, dotState) => {
    				var button = root_3$1();

    				button.__click = (e) => setToggleState(e, dotState);

    				template_effect(
    					($0, $1) => {
    						set_class(button, 1, `cv-dot ${get(currentInlineState) === dotState ? 'active' : ''}`, 'svelte-1ka2eec');
    						set_attribute(button, 'aria-label', $0);
    						set_attribute(button, 'title', $1);
    						set_attribute(button, 'aria-pressed', get(currentInlineState) === dotState);
    					},
    					[
    						() => dotState.charAt(0).toUpperCase() + dotState.slice(1),
    						() => dotState.charAt(0).toUpperCase() + dotState.slice(1)
    					]
    				);

    				append($$anchor, button);
    			});

    			reset(div_1);
    			reset(div);
    			template_effect(() => set_attribute(div, 'aria-label', `Toggle: ${get(labelText) ?? ''}`));
    			append($$anchor, div);
    		};

    		if_block(node, ($$render) => {
    			if (showInlineControl() && !get(isPlaceholderMode) && get(isHidden)) $$render(consequent_1);
    		});
    	}

    	var div_2 = sibling(node, 2);
    	let classes;
    	var node_2 = child(div_2);

    	{
    		var consequent_2 = ($$anchor) => {
    			var div_3 = root_4();
    			var text_1 = child(div_3, true);

    			reset(div_3);
    			template_effect(() => set_text(text_1, get(labelText)));
    			append($$anchor, div_3);
    		};

    		if_block(node_2, ($$render) => {
    			if (showLabel() && get(labelText) && !get(isHidden)) $$render(consequent_2);
    		});
    	}

    	var node_3 = sibling(node_2, 2);

    	{
    		var consequent_3 = ($$anchor) => {
    			var div_4 = root_5();

    			each(div_4, 20, () => ['hide', 'peek', 'show'], index, ($$anchor, dotState) => {
    				var button_1 = root_6();

    				button_1.__click = (e) => setToggleState(e, dotState);

    				template_effect(
    					($0, $1) => {
    						set_class(button_1, 1, `cv-dot ${get(currentInlineState) === dotState ? 'active' : ''}`, 'svelte-1ka2eec');
    						set_attribute(button_1, 'aria-label', $0);
    						set_attribute(button_1, 'title', $1);
    						set_attribute(button_1, 'aria-pressed', get(currentInlineState) === dotState);
    					},
    					[
    						() => dotState.charAt(0).toUpperCase() + dotState.slice(1),
    						() => dotState.charAt(0).toUpperCase() + dotState.slice(1)
    					]
    				);

    				append($$anchor, button_1);
    			});

    			reset(div_4);
    			append($$anchor, div_4);
    		};

    		if_block(node_3, ($$render) => {
    			if (showInlineControl() && !get(isPlaceholderMode) && !get(isHidden)) $$render(consequent_3);
    		});
    	}

    	var div_5 = sibling(node_3, 2);
    	let styles;
    	var div_6 = child(div_5);
    	var node_4 = child(div_6);

    	slot(node_4, $$props, 'default', {});
    	reset(div_6);
    	bind_this(div_6, ($$value) => innerEl = $$value, () => innerEl);
    	reset(div_5);
    	bind_this(div_5, ($$value) => contentEl = $$value, () => contentEl);

    	var node_5 = sibling(div_5, 2);

    	{
    		var consequent_5 = ($$anchor) => {
    			var button_2 = root_7();

    			button_2.__click = toggleExpand;

    			var node_6 = child(button_2);

    			{
    				var consequent_4 = ($$anchor) => {
    					var fragment_1 = root_8();
    					var node_7 = first_child(fragment_1);

    					IconChevronUp(node_7, {});
    					next(2);
    					append($$anchor, fragment_1);
    				};

    				var alternate = ($$anchor) => {
    					var fragment_2 = root_9();
    					var node_8 = first_child(fragment_2);

    					IconChevronDown(node_8, {});
    					next(2);
    					append($$anchor, fragment_2);
    				};

    				if_block(node_6, ($$render) => {
    					if (get(localExpanded)) $$render(consequent_4); else $$render(alternate, false);
    				});
    			}

    			reset(button_2);
    			template_effect(() => set_attribute(button_2, 'aria-label', get(localExpanded) ? 'Show less' : 'Show more'));
    			append($$anchor, button_2);
    		};

    		if_block(node_5, ($$render) => {
    			if (get(peekState) && !get(isSmallContent)) $$render(consequent_5);
    		});
    	}

    	reset(div_2);

    	template_effect(() => {
    		classes = set_class(div_2, 1, 'cv-toggle-wrapper svelte-1ka2eec', null, classes, {
    			expanded: get(showFullContent) && !get(showPeekContent),
    			peeking: get(showPeekContent),
    			'peek-mode': get(peekState),
    			hidden: get(isHidden),
    			'has-border': showPeekBorder() && get(peekState),
    			'has-inline-control': showInlineControl() && !get(isPlaceholderMode)
    		});

    		styles = set_style(div_5, '', styles, { 'max-height': get(currentMaxHeight) });
    	});

    	event('transitionend', div_5, handleTransitionEnd);
    	append($$anchor, fragment);

    	return pop($$exports);
    }

    delegate(['click']);

    customElements.define('cv-toggle', create_custom_element(
    	Toggle,
    	{
    		toggleId: { attribute: 'toggle-id', reflect: true, type: 'String' },

    		showPeekBorder: {
    			attribute: 'show-peek-border',
    			reflect: true,
    			type: 'Boolean'
    		},

    		showLabel: { attribute: 'show-label', reflect: true, type: 'Boolean' },

    		showInlineControl: {
    			attribute: 'show-inline-control',
    			reflect: true,
    			type: 'Boolean'
    		},

    		placeholderId: { attribute: 'placeholder-id', reflect: true, type: 'String' }
    	},
    	['default'],
    	[],
    	true
    ));

    var root$4 = from_html(`<div><!></div>`);

    const $$css$5 = {
    	hash: 'svelte-8qj5x2',
    	code: ':host {display:block;}:host(.cv-hidden) {display:none !important;}:host(.cv-visible) {display:block !important;}:host([active=\'true\']) {display:block;}.cv-tab-content.svelte-8qj5x2 {display:none;\n    animation: svelte-8qj5x2-fade-in 0.2s ease-in-out;padding-top:1rem;padding-bottom:0.5rem;padding-left:0;padding-right:0;}.cv-tab-content.active.svelte-8qj5x2 {display:block;}\n\n  /* Hide cv-tab-header source element; content is extracted to nav link */.svelte-8qj5x2::slotted(cv-tab-header) {display:none !important;}\n\n  /* Allow cv-tab-body to flow naturally */.svelte-8qj5x2::slotted(cv-tab-body) {display:block;}\n\n  @keyframes svelte-8qj5x2-fade-in {\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n  }'
    };

    function Tab($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$5);

    	// Props using Svelte 5 runes
    	// tabId and header are used in TabGroup directly.
    	// let { active = false, tabId = '', header = '' }: { active?: boolean; tabId?: string; header?: string } = $props();
    	let active = prop($$props, 'active', 7, false);

    	var $$exports = {
    		get active() {
    			return active();
    		},

    		set active($$value = false) {
    			active($$value);
    			flushSync();
    		}
    	};

    	var div = root$4();
    	let classes;
    	var node = child(div);

    	slot(node, $$props, 'default', {});
    	reset(div);
    	template_effect(() => classes = set_class(div, 1, 'cv-tab-content svelte-8qj5x2', null, classes, { active: active() }));
    	append($$anchor, div);

    	return pop($$exports);
    }

    customElements.define('cv-tab', create_custom_element(
    	Tab,
    	{
    		tabId: { attribute: 'tab-id', reflect: true, type: 'String' },
    		header: { attribute: 'header', reflect: true, type: 'String' },
    		active: {}
    	},
    	['default'],
    	[],
    	true
    ));

    var root_1$2 = from_svg(`<path d="M4 2v13l4-2.5L12 15V2H4z"></path>`);
    var root_2$1 = from_svg(`<path d="M4 2v13l4-2.5L12 15V2H4zm1 1h6v10.5l-3-1.88L5 13.5V3z"></path>`);
    var root$3 = from_svg(`<svg><!></svg>`);

    function IconMark($$anchor, $$props) {
    	let isMarked = prop($$props, 'isMarked', 3, false),
    		rest = rest_props($$props, ['$$slots', '$$events', '$$legacy', 'isMarked']);

    	// Derived opacity based on isMarked
    	const extraOpacity = user_derived(() => isMarked() ? '1' : '0.6');

    	var svg = root$3();

    	attribute_effect(svg, () => ({
    		width: '16',
    		height: '16',
    		viewBox: '0 0 16 16',
    		fill: 'currentColor',
    		opacity: get(extraOpacity),
    		xmlns: 'http://www.w3.org/2000/svg',
    		...rest
    	}));

    	var node = child(svg);

    	{
    		var consequent = ($$anchor) => {
    			var path = root_1$2();

    			append($$anchor, path);
    		};

    		var alternate = ($$anchor) => {
    			var path_1 = root_2$1();

    			append($$anchor, path_1);
    		};

    		if_block(node, ($$render) => {
    			if (isMarked()) $$render(consequent); else $$render(alternate, false);
    		});
    	}

    	reset(svg);
    	append($$anchor, svg);
    }

    var root_2 = from_html(`<li class="cv-tabgroup-item svelte-1ujqpe3"><div><a role="tab" title="Double-click a tab to 'mark' it in all similar tab groups."><span class="cv-tab-header-text svelte-1ujqpe3"><!></span></a> <button type="button"><!></button></div></li>`);
    var root_1$1 = from_html(`<ul class="cv-tabgroup-nav svelte-1ujqpe3" role="tablist"></ul>`);
    var root_3 = from_html(`<link rel="stylesheet"/>`);
    var root$2 = from_html(`<div class="cv-tabgroup-container"><!> <!> <div class="cv-tabgroup-content"><!></div> <div class="cv-tabgroup-bottom-border svelte-1ujqpe3"></div></div>`);

    const $$css$4 = {
    	hash: 'svelte-1ujqpe3',
    	code: ':host {display:block;margin-bottom:24px;}\n\n  /* Tab navigation styles */ul.cv-tabgroup-nav.svelte-1ujqpe3 {display:flex;flex-wrap:wrap;padding-left:0;margin-top:0.5rem;margin-bottom:0;list-style:none;border-bottom:1px solid var(--cv-border, rgba(128, 128, 128, 0.3));align-items:stretch;gap:0.5rem;}.cv-tabgroup-item.svelte-1ujqpe3 {margin-bottom:-1px;list-style:none;display:flex;align-items:stretch;}.cv-tabgroup-link.svelte-1ujqpe3 {display:flex;align-items:center;justify-content:center;padding:0.5rem 0.75rem;color:inherit;opacity:0.7;text-decoration:none;background-color:transparent !important;border:none;border-bottom:2px solid transparent;transition:opacity 0.15s ease-in-out,\n      border-color 0.15s ease-in-out;cursor:pointer;min-height:2.5rem;box-sizing:border-box;font-weight:500;}.cv-tabgroup-link.svelte-1ujqpe3 p {margin:0;display:inline;}.cv-tabgroup-link.svelte-1ujqpe3:hover,\n  .cv-tabgroup-link.svelte-1ujqpe3:focus {opacity:1;border-bottom-color:var(--cv-border, rgba(128, 128, 128, 0.3));isolation:isolate;}.cv-tabgroup-link.active.svelte-1ujqpe3 {opacity:1;background-color:transparent !important;}.cv-tabgroup-link.svelte-1ujqpe3:focus {outline:0;}.cv-tab-wrapper.svelte-1ujqpe3 {display:flex;align-items:center;border-bottom:2px solid transparent;transition:border-color 0.15s ease-in-out;}.cv-tab-wrapper.svelte-1ujqpe3:hover,\n  .cv-tab-wrapper.svelte-1ujqpe3:focus-within {border-bottom-color:var(--cv-border, rgba(128, 128, 128, 0.3));}.cv-tab-wrapper.active.svelte-1ujqpe3 {border-bottom-color:currentColor;}.cv-tab-header-text.svelte-1ujqpe3 {line-height:1;}.cv-tab-marked-icon.svelte-1ujqpe3 {display:inline-flex;align-items:center;justify-content:center;line-height:0;flex-shrink:0;opacity:0;transition:opacity 0.15s ease-out;background:none;border:none;padding:0 8px 0 0;margin:0;cursor:pointer;color:inherit;height:100%;}.cv-tab-wrapper.svelte-1ujqpe3:hover .cv-tab-marked-icon:where(.svelte-1ujqpe3),\n  .cv-tab-wrapper.svelte-1ujqpe3:focus-within .cv-tab-marked-icon:where(.svelte-1ujqpe3),\n  .cv-tab-marked-icon.is-marked.svelte-1ujqpe3 {opacity:1;}.cv-tab-marked-icon.svelte-1ujqpe3 svg {vertical-align:middle;width:14px;height:14px;}.cv-tabgroup-bottom-border.svelte-1ujqpe3 {border-bottom:1px solid var(--cv-border, rgba(128, 128, 128, 0.3));}\n\n  @media print {ul.cv-tabgroup-nav.svelte-1ujqpe3 {display:none !important;}\n  }'
    };

    function TabGroup($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$4);

    	//  ID of the tabgroup Group
    	let groupId = prop($$props, 'groupId', 7),
    		stabilizeScroll = prop($$props, 'stabilizeScroll', 7, true);

    	user_effect(() => {
    		if (groupId()) elementStore.registerTabGroup(groupId());
    	});

    	let tabs = state(proxy([]));
    	let containerEl = state(void 0);
    	let contentWrapper = state(void 0);
    	let slotEl = state(null);
    	let initialized = state(false);

    	// Local active tab state (independent per group instance)
    	let localActiveTabId = state('');

    	// Derive markedTab from store (shared across groups with same ID)
    	let markedTab = user_derived(() => {
    		const tabs$ = activeStateStore.state.tabs ?? {};

    		return groupId() && tabs$[groupId()] ? tabs$[groupId()] : null;
    	});

    	// Track the last seen store state to detect real changes
    	let lastSeenStoreState = state(null);

    	// Authoritative Sync: Only sync when store actually changes.
    	// NOTE: Scroll stabilization is NOT done here — it's the responsibility of
    	// the initiating action (handleTabDoubleClick, handleMarkClick, or Modal).
    	// If this $effect also stabilized, its rAF would compete with the initiator's
    	// rAF and undo the correction.
    	user_effect(() => {
    		if (get(markedTab) !== get(lastSeenStoreState)) {
    			set(lastSeenStoreState, get(markedTab), true);

    			if (get(markedTab)) {
    				if (get(localActiveTabId) !== get(markedTab)) {
    					set(localActiveTabId, get(markedTab), true);
    					updateVisibility();
    				}
    			}
    		}
    	});

    	// Sync isTabGroupNavHeadingVisible from store
    	let navHeadingVisible = user_derived(() => uiStore.isTabGroupNavHeadingVisible);

    	// Icons
    	onMount(() => {
    		if (get(contentWrapper)) {
    			set(slotEl, get(contentWrapper).querySelector('slot'), true);

    			if (get(slotEl)) {
    				get(slotEl).addEventListener('slotchange', handleSlotChange);
    				handleSlotChange();
    			}
    		}
    	});

    	function splitTabIds(tabId) {
    		return tabId.split(/[\s|]+/).filter((id) => id.trim() !== '').map((id) => id.trim());
    	}

    	// Todo: For handleSlotChange(), consider if there is a svelte way
    	// to do this without the need for the slotchange event.
    	/**
    	 * Handler for the slotchange event.
    	 * Scans the assigned elements in the slot to find `<cv-tab>` components.
    	 * Builds the internal `tabs` state used to render the navigation.
    	 * Also initializes the active tab if not already set.
    	 */
    	function handleSlotChange() {
    		if (!get(slotEl)) return;

    		const elements = get(slotEl).assignedElements().filter((el) => el.tagName.toLowerCase() === 'cv-tab');

    		set(
    			tabs,
    			elements.map((el, index) => {
    				const element = el;
    				let rawId = element.getAttribute('tab-id');

    				// If tab has no tab-id, generate one based on position
    				if (!rawId) {
    					rawId = `${groupId() || 'tabgroup'}-tab-${index}`;
    					element.setAttribute('data-cv-internal-id', rawId);
    				}

    				const splitIds = splitTabIds(rawId);
    				const primaryId = splitIds[0] || rawId;

    				// Extract Header
    				let header = '';

    				// Check for <cv-tab-header>
    				const headerEl = element.querySelector('cv-tab-header');

    				if (headerEl) {
    					header = headerEl.innerHTML.trim();
    				} else {
    					// Attribute syntax
    					header = element.header || element.getAttribute('header') || '';

    					if (!header) {
    						// Fallback to tab-id or default
    						header = element.getAttribute('tab-id') ? primaryId : `Tab ${index + 1}`;
    					}
    				}

    				return { id: primaryId, rawId, header, element };
    			}),
    			true
    		);

    		if (!get(initialized) && get(tabs).length > 0) {
    			// Initialize active tab by dispatching event if none is set
    			if (!get(localActiveTabId)) {
    				const firstTabId = get(tabs)[0].id;

    				set(localActiveTabId, firstTabId, true);
    			} else {
    				updateVisibility();
    			}

    			set(initialized, true);
    		} else if (get(initialized)) {
    			// Re-run visibility in case new tabs matched current activeTab
    			updateVisibility();
    		}
    	}

    	/**
    	 * Updates the visibility of the child `<cv-tab>` elements based on the current `activeTab`.
    	 * Sets the `active` attribute and `cv-visible`/`cv-hidden` classes on the child elements.
    	 */
    	function updateVisibility() {
    		if (!get(tabs).length) return;

    		get(tabs).forEach((tab) => {
    			const splitIds = splitTabIds(tab.rawId);
    			const isActive = splitIds.includes(get(localActiveTabId));

    			// Set property directly to trigger Svelte component reactivity
    			// eslint-disable-next-line @typescript-eslint/no-explicit-any
    			tab.element.active = isActive;
    		});
    	}

    	/**
    	 * Handles click events on the navigation tabs.
    	 * Updates the local active tab (visibility is updated automatically via $effect).
    	 */
    	function handleTabClick(tabId, event) {
    		event.preventDefault();

    		if (get(localActiveTabId) !== tabId) {
    			const anchor = stabilizeScroll() && get(containerEl) ? captureScrollAnchor(get(containerEl)) : null;

    			set(localActiveTabId, tabId, true);
    			updateVisibility();

    			if (anchor) restoreScrollAnchor(anchor);
    		}
    	}

    	/**
    	 * Handles double-click events on the navigation tabs.
    	 * Updates the store to "mark" the tab globally across all tab groups with the same ID.
    	 * Stabilizes scroll position because syncing may change height of OTHER groups above.
    	 */
    	async function handleTabDoubleClick(tabId, event) {
    		event.preventDefault();

    		if (!groupId()) return;

    		const anchor = stabilizeScroll() && get(containerEl) ? captureScrollAnchor(get(containerEl)) : null;

    		activeStateStore.setMarkedTab(groupId(), tabId);

    		if (anchor) {
    			await tick();
    			restoreScrollAnchor(anchor);
    		}
    	}

    	/**
    	 * Handles click events specifically on the mark icon.
    	 * Stabilizes scroll position because syncing may change height of OTHER groups above.
    	 */
    	async function handleMarkClick(tabId, event) {
    		event.preventDefault();
    		event.stopPropagation();

    		if (!groupId()) return;

    		const anchor = stabilizeScroll() && get(containerEl) ? captureScrollAnchor(get(containerEl)) : null;

    		activeStateStore.setMarkedTab(groupId(), tabId);

    		if (anchor) {
    			await tick();
    			restoreScrollAnchor(anchor);
    		}
    	}

    	var $$exports = {
    		get groupId() {
    			return groupId();
    		},

    		set groupId($$value) {
    			groupId($$value);
    			flushSync();
    		},

    		get stabilizeScroll() {
    			return stabilizeScroll();
    		},

    		set stabilizeScroll($$value = true) {
    			stabilizeScroll($$value);
    			flushSync();
    		}
    	};

    	var div = root$2();
    	var node = child(div);

    	{
    		var consequent = ($$anchor) => {
    			var ul = root_1$1();

    			each(ul, 21, () => get(tabs), (tab) => tab.id, ($$anchor, tab) => {
    				const splitIds = user_derived(() => splitTabIds(get(tab).rawId));
    				const isActive = user_derived(() => get(splitIds).includes(get(localActiveTabId)));
    				const isMarked = user_derived(() => get(markedTab) && get(splitIds).includes(get(markedTab)));
    				var li = root_2();
    				var div_1 = child(li);
    				let classes;
    				var a = child(div_1);
    				let classes_1;

    				a.__click = (e) => handleTabClick(get(tab).id, e);
    				a.__dblclick = (e) => handleTabDoubleClick(get(tab).id, e);

    				var span = child(a);
    				var node_1 = child(span);

    				html(node_1, () => get(tab).header);
    				reset(span);
    				reset(a);

    				var button = sibling(a, 2);
    				let classes_2;

    				button.__click = (e) => handleMarkClick(get(tab).id, e);

    				button.__dblclick = (e) => {
    					e.stopPropagation();
    				};

    				var node_2 = child(button);

    				IconMark(node_2, {
    					get isMarked() {
    						return get(isMarked);
    					}
    				});

    				reset(button);
    				reset(div_1);
    				reset(li);

    				template_effect(() => {
    					classes = set_class(div_1, 1, 'cv-tab-wrapper svelte-1ujqpe3', null, classes, { active: get(isActive) });
    					classes_1 = set_class(a, 1, 'cv-tabgroup-link svelte-1ujqpe3', null, classes_1, { active: get(isActive) });
    					set_attribute(a, 'href', '#' + get(tab).id);
    					set_attribute(a, 'aria-selected', get(isActive));
    					set_attribute(a, 'data-tab-id', get(tab).id);
    					set_attribute(a, 'data-raw-tab-id', get(tab).rawId);
    					set_attribute(a, 'data-group-id', groupId());
    					classes_2 = set_class(button, 1, 'cv-tab-marked-icon svelte-1ujqpe3', null, classes_2, { 'is-marked': get(isMarked) });
    					set_attribute(button, 'title', get(isMarked) ? "Unmark this tab" : "Mark this tab");
    					set_attribute(button, 'aria-label', get(isMarked) ? "Unmark this tab" : "Mark this tab");
    					set_attribute(button, 'aria-pressed', !!get(isMarked));
    				});

    				append($$anchor, li);
    			});

    			reset(ul);
    			append($$anchor, ul);
    		};

    		if_block(node, ($$render) => {
    			if (get(tabs).length > 0 && get(navHeadingVisible)) $$render(consequent);
    		});
    	}

    	var node_3 = sibling(node, 2);

    	each(node_3, 16, () => Array.from(document.querySelectorAll('link[rel="stylesheet"]')), (link) => link.href, ($$anchor, link) => {
    		var link_1 = root_3();

    		template_effect(() => set_attribute(link_1, 'href', link.href));
    		append($$anchor, link_1);
    	});

    	var div_2 = sibling(node_3, 2);
    	var node_4 = child(div_2);

    	slot(node_4, $$props, 'default', {});
    	reset(div_2);
    	bind_this(div_2, ($$value) => set(contentWrapper, $$value), () => get(contentWrapper));
    	next(2);
    	reset(div);
    	bind_this(div, ($$value) => set(containerEl, $$value), () => get(containerEl));
    	append($$anchor, div);

    	return pop($$exports);
    }

    delegate(['click', 'dblclick']);

    customElements.define('cv-tabgroup', create_custom_element(
    	TabGroup,
    	{
    		groupId: { attribute: 'group-id', reflect: true, type: 'String' },

    		stabilizeScroll: {
    			attribute: 'stabilize-scroll',
    			reflect: true,
    			type: 'Boolean'
    		}
    	},
    	['default'],
    	[],
    	true
    ));

    const $$css$3 = {
    	hash: 'svelte-1hl11lz',
    	code: ':host {display:none; /* Semantic container only, usually read by parent and hidden */}'
    };

    function TabHeader($$anchor, $$props) {
    	append_styles$1($$anchor, $$css$3);

    	var fragment = comment();
    	var node = first_child(fragment);

    	slot(node, $$props, 'default', {});
    	append($$anchor, fragment);
    	// No logic needed, just a container
    }

    customElements.define('cv-tab-header', create_custom_element(TabHeader, {}, ['default'], [], true));

    const $$css$2 = { hash: 'svelte-eizj8y', code: ':host {display:block;}' };

    function TabBody($$anchor, $$props) {
    	append_styles$1($$anchor, $$css$2);

    	var fragment = comment();
    	var node = first_child(fragment);

    	slot(node, $$props, 'default', {});
    	append($$anchor, fragment);
    	// No logic needed, just a container
    }

    customElements.define('cv-tab-body', create_custom_element(TabBody, {}, ['default'], [], true));

    var root$1 = from_html(`<span class="cv-var"> </span>`);
    const $$css$1 = { hash: 'svelte-1tffxwo', code: ':host {display:inline;}' };

    function Placeholder($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css$1);

    	let name = prop($$props, 'name', 7),
    		fallback = prop($$props, 'fallback', 7),
    		truthy = prop($$props, 'truthy', 7),
    		falsy = prop($$props, 'falsy', 7),
    		anyValue = prop($$props, 'anyValue', 7);

    	let value = user_derived(() => {
    		if (!name()) return '';

    		if (truthy() !== undefined) {
    			const placeholders = activeStateStore.state.placeholders ?? {};

    			const val = anyValue()
    				? PlaceholderBinder.resolveValue(name(), undefined, placeholders)
    				: PlaceholderBinder.resolveUserValue(name(), placeholders);

    			return val !== undefined ? truthy().replace(/\$/g, () => val) : falsy() ?? '';
    		}

    		// 1. User Value
    		const userVal = activeStateStore.state.placeholders?.[name()];

    		if (userVal !== undefined && userVal !== '') return userVal;

    		// 2. Fallback (explicit empty string is valid — shows nothing)
    		if (fallback() !== undefined) return fallback();

    		// 3. Registry Default
    		const def = placeholderRegistryStore.get(name());

    		if (def?.defaultValue !== undefined && def.defaultValue !== '') return def.defaultValue;

    		// 4. Raw Name
    		return `[[${name()}]]`;
    	});

    	function updateHost(node) {
    		// With {@attach}, this function runs in an effect context
    		// and re-runs whenever dependencies (like `value`) change.
    		// Write to the host's light DOM so that .textContent works on parent elements
    		// This is safe because we don't have <slot>s, so this text is never rendered
    		const host = node.getRootNode();

    		if (host && host.host) {
    			const hostEl = host.host;

    			hostEl.innerText = get(value);
    		}
    	}

    	var $$exports = {
    		get name() {
    			return name();
    		},

    		set name($$value) {
    			name($$value);
    			flushSync();
    		},

    		get fallback() {
    			return fallback();
    		},

    		set fallback($$value) {
    			fallback($$value);
    			flushSync();
    		},

    		get truthy() {
    			return truthy();
    		},

    		set truthy($$value) {
    			truthy($$value);
    			flushSync();
    		},

    		get falsy() {
    			return falsy();
    		},

    		set falsy($$value) {
    			falsy($$value);
    			flushSync();
    		},

    		get anyValue() {
    			return anyValue();
    		},

    		set anyValue($$value) {
    			anyValue($$value);
    			flushSync();
    		}
    	};

    	var span = root$1();
    	var text = child(span, true);

    	reset(span);
    	attach(span, () => updateHost);
    	template_effect(() => set_text(text, get(value)));
    	append($$anchor, span);

    	return pop($$exports);
    }

    customElements.define('cv-placeholder', create_custom_element(
    	Placeholder,
    	{
    		name: { attribute: 'name', type: 'String' },
    		fallback: { attribute: 'fallback', type: 'String' },
    		truthy: { attribute: 'truthy', type: 'String' },
    		falsy: { attribute: 'falsy', type: 'String' },
    		anyValue: { attribute: 'any-value', type: 'Boolean' }
    	},
    	[],
    	[],
    	true
    ));

    var root_1 = from_html(`<label class="placeholder-label svelte-dpk3ag"> </label>`);
    var root = from_html(`<div><!> <input type="text"/></div>`);

    const $$css = {
    	hash: 'svelte-dpk3ag',
    	code: ':host {display:inline-block;width:auto;margin:0 0.25rem; /* Add breathing room for inline text */}\n\n  /* Host display overrides based on layout */:host([layout=\'stacked\']),\n  :host([layout=\'horizontal\']) {display:block;width:100%;margin:0 0 0.5rem 0; /* Reset margins for block layouts */}\n  \n  /* Wrapper Grid/Flex Layouts */.cv-input-wrapper.svelte-dpk3ag {display:flex;width:100%;box-sizing:border-box;}\n\n  /* INLINE */.cv-input-wrapper.inline.svelte-dpk3ag {display:inline-block;width:auto;}\n\n  /* STACKED */.cv-input-wrapper.stacked.svelte-dpk3ag {flex-direction:column;gap:0.25rem;}\n\n  /* HORIZONTAL */.cv-input-wrapper.horizontal.svelte-dpk3ag {flex-direction:row;align-items:center;gap:0.75rem;}\n\n  /* Label Styles */.placeholder-label.svelte-dpk3ag {font-size:0.85rem;font-weight:500;color:var(--cv-text, #333);white-space:nowrap;}.stacked.svelte-dpk3ag .placeholder-label:where(.svelte-dpk3ag) {margin-bottom:2px;width:100%; /* Ensure label context is full width */text-align:left; /* Reset text align */}\n\n  /* Input Styles */.placeholder-input.svelte-dpk3ag {padding:0.5rem 0.75rem;border:1px solid var(--cv-input-border, rgba(0, 0, 0, 0.1));border-radius:0.375rem;font-size:0.9rem;transition:all 0.2s;background:var(--cv-input-bg, white);color:var(--cv-text, #333);box-sizing:border-box;width:100%;}.stacked.svelte-dpk3ag .placeholder-input:where(.svelte-dpk3ag) {width:100%;}.inline.svelte-dpk3ag .placeholder-input:where(.svelte-dpk3ag) {width:var(--cv-input-width, auto);padding:0.3rem 0.5rem;display:inline-block;text-align:center;}.horizontal.svelte-dpk3ag .placeholder-input:where(.svelte-dpk3ag) {width:var(--cv-input-width, auto);flex:1;}\n\n  /* APPEARANCES */\n  \n  /* Outline (Default) - handled by base styles above */\n\n  /* Underline */.placeholder-input.underline.svelte-dpk3ag {border:none;border-bottom:1px solid var(--cv-input-border, rgba(0, 0, 0, 0.2));border-radius:0;background:transparent;padding-left:0;padding-right:0;}.placeholder-input.underline.svelte-dpk3ag:focus {box-shadow:none;border-bottom-color:var(--cv-primary, #3e84f4);}\n\n  /* Ghost */.placeholder-input.ghost.svelte-dpk3ag {border-color:transparent;background:transparent;}.placeholder-input.ghost.svelte-dpk3ag:hover {background:var(--cv-input-bg-hover, rgba(0,0,0,0.05));}.placeholder-input.ghost.svelte-dpk3ag:focus {background:var(--cv-input-bg, white);border-color:var(--cv-primary, #3e84f4);box-shadow:0 0 0 2px var(--cv-focus-ring, rgba(62, 132, 244, 0.2));}\n\n  /* Focus states for standard inputs */.placeholder-input.svelte-dpk3ag:not(.underline):focus {outline:none;border-color:var(--cv-primary, #3e84f4);box-shadow:0 0 0 2px var(--cv-focus-ring, rgba(62, 132, 244, 0.2));}'
    };

    function PlaceholderInput($$anchor, $$props) {
    	push($$props, true);
    	append_styles$1($$anchor, $$css);

    	let name = prop($$props, 'name', 7),
    		label = prop($$props, 'label', 7),
    		hint = prop($$props, 'hint', 7),
    		layout = prop($$props, 'layout', 7, 'inline'),
    		appearance = prop($$props, 'appearance', 7, 'outline'),
    		width = prop($$props, 'width', 7);

    	let effectiveLayout = user_derived(layout);
    	let value = user_derived(() => activeStateStore.state.placeholders?.[name()] ?? '');

    	let effectiveLabel = user_derived(() => {
    		if (label()) return label();

    		const def = placeholderRegistryStore.get(name());

    		if (!def) return name();

    		// For visible label layouts, try settingsLabel
    		if (get(effectiveLayout) !== 'inline' && def.settingsLabel) return def.settingsLabel;

    		// Fallback
    		return def.settingsLabel || name();
    	});

    	let effectiveHint = user_derived(() => {
    		if (hint()) return hint();

    		const def = placeholderRegistryStore.get(name());

    		return def?.settingsHint || '';
    	});

    	let sanitizedId = user_derived(() => name().replace(/[^a-zA-Z0-9_-]/g, '_'));

    	function handleInput(e) {
    		const target = e.target;

    		activeStateStore.setPlaceholder(name(), target.value);
    	}

    	let inputSize = user_derived(() => {
    		if (get(effectiveLayout) !== 'inline' || width() !== 'auto-grow') return undefined;

    		const len = (get(value) || get(effectiveHint)).length;

    		return Math.max(len, 4);
    	});

    	var $$exports = {
    		get name() {
    			return name();
    		},

    		set name($$value) {
    			name($$value);
    			flushSync();
    		},

    		get label() {
    			return label();
    		},

    		set label($$value) {
    			label($$value);
    			flushSync();
    		},

    		get hint() {
    			return hint();
    		},

    		set hint($$value) {
    			hint($$value);
    			flushSync();
    		},

    		get layout() {
    			return layout();
    		},

    		set layout($$value = 'inline') {
    			layout($$value);
    			flushSync();
    		},

    		get appearance() {
    			return appearance();
    		},

    		set appearance($$value = 'outline') {
    			appearance($$value);
    			flushSync();
    		},

    		get width() {
    			return width();
    		},

    		set width($$value) {
    			width($$value);
    			flushSync();
    		}
    	};

    	var div = root();
    	let styles;
    	var node = child(div);

    	{
    		var consequent = ($$anchor) => {
    			var label_1 = root_1();
    			var text = child(label_1, true);

    			reset(label_1);

    			template_effect(() => {
    				set_attribute(label_1, 'for', `cv-input-${get(sanitizedId) ?? ''}`);
    				set_text(text, get(effectiveLabel));
    			});

    			append($$anchor, label_1);
    		};

    		if_block(node, ($$render) => {
    			if (get(effectiveLayout) !== 'inline' && get(effectiveLabel)) $$render(consequent);
    		});
    	}

    	var input = sibling(node, 2);

    	remove_input_defaults(input);
    	input.__input = handleInput;
    	reset(div);

    	template_effect(() => {
    		set_class(div, 1, `cv-input-wrapper ${get(effectiveLayout) ?? ''}`, 'svelte-dpk3ag');

    		styles = set_style(div, '', styles, {
    			'--cv-input-width': width() === 'auto-grow' ? 'auto' : width()
    		});

    		set_attribute(input, 'id', `cv-input-${get(sanitizedId) ?? ''}`);
    		set_class(input, 1, `placeholder-input ${appearance() ?? ''}`, 'svelte-dpk3ag');
    		set_attribute(input, 'placeholder', get(effectiveHint));
    		set_value(input, get(value));
    		set_attribute(input, 'aria-label', get(effectiveLayout) === 'inline' ? get(effectiveLabel) : undefined);
    		set_attribute(input, 'size', get(inputSize));
    	});

    	append($$anchor, div);

    	return pop($$exports);
    }

    delegate(['input']);

    customElements.define('cv-placeholder-input', create_custom_element(
    	PlaceholderInput,
    	{
    		name: {},
    		label: {},
    		hint: {},
    		layout: {},
    		appearance: {},
    		width: {}
    	},
    	[],
    	[],
    	true
    ));

    // --- No Public API Exports ---
    // The script auto-initializes via initializeFromScript().
    /**
     * Initialize CustardUI from script tag attributes and config file
     * This runs automatically when the script is loaded.
     */
    function initializeFromScript() {
        // Only run in browser environment
        if (typeof window === 'undefined')
            return;
        // Idempotency check 
        if (window.__custardUIInitialized) {
            console.info('[CustardUI] Auto-init skipped: already initialized.');
            return;
        }
        document.addEventListener('DOMContentLoaded', async function () {
            if (window.__custardUIInitInProgress || window.__custardUIInitialized)
                return;
            window.__custardUIInitInProgress = true;
            try {
                // Get attributes from script tag
                const { baseURL, configPath } = getScriptAttributes();
                // Fetch Config first to retrieve storageKey prefix
                const configFile = await fetchConfig(configPath, baseURL);
                // Determine effective baseURL (data attribute takes precedence)
                const effectiveBaseURL = baseURL;
                // Initialize Adaptation early (before AppRuntime):
                // - Theme CSS injected ASAP (FOUC prevention)
                // - ?adapt= param cleaned before URLStateManager.parseURL() runs
                // - URL indicator set before AppRuntime so URL state is seeded correctly
                const adaptationConfig = await AdaptationManager.init(effectiveBaseURL, configFile.storageKey);
                if (adaptationConfig?.id) {
                    AdaptationManager.rewriteUrlIndicator(adaptationConfig.id);
                }
                const coreOptions = {
                    configFile,
                    rootEl: document.body,
                    storageKey: configFile.storageKey,
                    adaptationConfig,
                };
                const runtime = new AppRuntime(coreOptions);
                runtime.start();
                initUIManager(runtime, configFile);
                // Mark initialized
                window.__custardUIInitialized = true;
                window.__custardUIInitInProgress = false;
            }
            catch (error) {
                window.__custardUIInitInProgress = false;
                console.error('[CustardUI] Auto-initialization error:', error);
            }
        });
    }
    // Auto-run initialization logic when this file is evaluated
    if (typeof window !== 'undefined') {
        initializeFromScript();
    }

    exports.initializeFromScript = initializeFromScript;

}));
//# sourceMappingURL=custardui.js.map
