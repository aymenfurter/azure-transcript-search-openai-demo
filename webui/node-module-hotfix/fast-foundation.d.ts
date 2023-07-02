import type { AttributeConfiguration } from '@microsoft/fast-element';
import { Behavior } from '@microsoft/fast-element';
import type { CaptureType } from '@microsoft/fast-element';
import { ComposableStyles } from '@microsoft/fast-element';
import { Constructable } from '@microsoft/fast-element';
import { CSSDirective } from '@microsoft/fast-element';
import { Direction } from '@microsoft/fast-web-utilities';
import { ElementStyles } from '@microsoft/fast-element';
import { ElementViewTemplate } from '@microsoft/fast-element';
import { FASTElement } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import type { PartialFASTElementDefinition } from '@microsoft/fast-element';
import { SyntheticViewTemplate } from '@microsoft/fast-element';
import { ViewTemplate } from '@microsoft/fast-element';

/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 *
 * @fires change - Fires a custom 'change' event when the active item changes
 * @csspart item - The slot for the accordion items
 * @public
 *
 * @remarks
 * Designed to be used with {@link @microsoft/fast-foundation#accordionTemplate} and {@link @microsoft/fast-foundation#(AccordionItem:class)}.
 */
export declare class Accordion extends FoundationElement {
    /**
     * Controls the expand mode of the Accordion, either allowing
     * single or multiple item expansion.
     * @public
     *
     * @remarks
     * HTML attribute: expand-mode
     */
    expandmode: AccordionExpandMode;
    /**
     * @internal
     */
    accordionItems: HTMLElement[];
    /**
     * @internal
     */
    accordionItemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void;
    private activeid;
    private activeItemIndex;
    private accordionIds;
    private change;
    private findExpandedItem;
    private setItems;
    private resetItems;
    private removeItemListeners;
    private activeItemChange;
    private getItemIds;
    private isSingleExpandMode;
    private handleItemKeyDown;
    private handleItemFocus;
    private adjust;
    private focusItem;
}

/**
 * Expand mode for {@link Accordion}
 * @public
 */
export declare const AccordionExpandMode: {
    /**
     * Designates only a single {@link @microsoft/fast-foundation#(AccordionItem:class) } can be open a time.
     */
    readonly single: "single";
    /**
     * Designates multiple {@link @microsoft/fast-foundation#(AccordionItem:class) | AccordionItems} can be open simultaneously.
     */
    readonly multi: "multi";
};

/**
 * Type for the {@link Accordion} Expand Mode
 * @public
 */
export declare type AccordionExpandMode = typeof AccordionExpandMode[keyof typeof AccordionExpandMode];

/**
 * An individual item in an {@link @microsoft/fast-foundation#(Accordion:class) }.
 *
 * @slot start - Content which can be provided between the heading and the icon
 * @slot end - Content which can be provided between the start slot and icon
 * @slot heading - Content which serves as the accordion item heading and text of the expand button
 * @slot - The default slot for accordion item content
 * @slot expanded-icon - The expanded icon
 * @slot collapsed-icon - The collapsed icon
 * @fires change - Fires a custom 'change' event when the button is invoked
 * @csspart heading - Wraps the button
 * @csspart button - The button which serves to invoke the item
 * @csspart heading-content - Wraps the slot for the heading content within the button
 * @csspart icon - The icon container
 * @csspart expanded-icon - The expanded icon slot
 * @csspart collapsed-icon - The collapsed icon
 * @csspart region - The wrapper for the accordion item content
 *
 * @public
 */
export declare class AccordionItem extends FoundationElement {
    /**
     * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
     * heading element.
     *
     * @defaultValue 2
     * @public
     * @remarks
     * HTML attribute: heading-level
     */
    headinglevel: 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Expands or collapses the item.
     *
     * @public
     * @remarks
     * HTML attribute: expanded
     */
    expanded: boolean;
    /**
     * The item ID
     *
     * @public
     * @remarks
     * HTML Attribute: id
     */
    id: string;
    /**
     * @internal
     */
    expandbutton: HTMLElement;
    /**
     * @internal
     */
    clickHandler: (e: MouseEvent) => void;
    private change;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface AccordionItem extends StartEnd {
}

/**
 * Accordion Item configuration options
 * @public
 */
export declare type AccordionItemOptions = FoundationElementDefinition & StartEndOptions & {
    expandedIcon?: string | SyntheticViewTemplate;
    collapsedIcon?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(AccordionItem:class)} component.
 * @public
 */
export declare const accordionItemTemplate: FoundationElementTemplate<ViewTemplate<AccordionItem>, AccordionItemOptions>;

/**
 * The template for the {@link @microsoft/fast-foundation#Accordion} component.
 * @public
 */
export declare const accordionTemplate: FoundationElementTemplate<ViewTemplate<Accordion>>;

/**
 * A decorator and DI resolver that will resolve an array of all dependencies
 * registered with the specified key.
 * @param key - The key to resolve all dependencies for.
 * @param searchAncestors - [optional] Indicates whether to search ancestor containers.
 * @public
 */
export declare const all: (key: any, searchAncestors?: boolean | undefined) => ReturnType<typeof DI.inject>;

/**
 * An Anchor Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @slot start - Content which can be provided before the anchor content
 * @slot end - Content which can be provided after the anchor content
 * @slot - The default slot for anchor content
 * @csspart control - The anchor element
 * @csspart content - The element wrapping anchor content
 *
 * @public
 */
export declare class Anchor extends FoundationElement {
    /**
     * Prompts the user to save the linked URL. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: download
     */
    download: string;
    /**
     * The URL the hyperlink references. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: href
     */
    href: string;
    /**
     * Hints at the language of the referenced resource. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: hreflang
     */
    hreflang: string;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: ping
     */
    ping: string;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: referrerpolicy
     */
    referrerpolicy: string;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: rel
     */
    rel: string;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: target
     */
    target: "_self" | "_blank" | "_parent" | "_top";
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element } for more information.
     * @public
     * @remarks
     * HTML Attribute: type
     */
    type: string;
    /**
     *
     * Default slotted content
     *
     * @internal
     */
    defaultSlottedContent: HTMLElement[];
    /**
     * References the root element
     */
    control: HTMLAnchorElement | undefined;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * Overrides the focus call for where delegatesFocus is unsupported.
     * This check works for Chrome, Edge Chromium, FireFox, and Safari
     * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
     */
    private handleUnsupportedDelegatesFocus;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface Anchor extends StartEnd, DelegatesARIALink {
}

/**
 * An anchored region Custom HTML Element.
 *
 * @slot - The default slot for the content
 * @fires loaded - Fires a custom 'loaded' event when the region is loaded and visible
 * @fires positionchange - Fires a custom 'positionchange' event when the position has changed
 *
 * @public
 */
export declare class AnchoredRegion extends FoundationElement {
    /**
     * The HTML ID of the anchor element this region is positioned relative to
     *
     * @public
     * @remarks
     * HTML Attribute: anchor
     */
    anchor: string;
    private anchorChanged;
    /**
     * The HTML ID of the viewport element this region is positioned relative to
     *
     * @public
     * @remarks
     * HTML Attribute: anchor
     */
    viewport: string;
    private viewportChanged;
    /**
     * Sets what logic the component uses to determine horizontal placement.
     * 'locktodefault' forces the default position
     * 'dynamic' decides placement based on available space
     * 'uncontrolled' does not control placement on the horizontal axis
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-positioning-mode
     */
    horizontalPositioningMode: AxisPositioningMode;
    private horizontalPositioningModeChanged;
    /**
     * The default horizontal position of the region relative to the anchor element
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-default-position
     */
    horizontalDefaultPosition: HorizontalPosition;
    private horizontalDefaultPositionChanged;
    /**
     * Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-viewport-lock
     */
    horizontalViewportLock: boolean;
    private horizontalViewportLockChanged;
    /**
     * Whether the region overlaps the anchor on the horizontal axis
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-inset
     */
    horizontalInset: boolean;
    private horizontalInsetChanged;
    /**
     * How narrow the space allocated to the default position has to be before the widest area
     * is selected for layout
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-threshold
     */
    horizontalThreshold: number;
    private horizontalThresholdChanged;
    /**
     * Defines how the width of the region is calculated
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-scaling
     */
    horizontalScaling: AxisScalingMode;
    private horizontalScalingChanged;
    /**
     * Sets what logic the component uses to determine vertical placement.
     * 'locktodefault' forces the default position
     * 'dynamic' decides placement based on available space
     * 'uncontrolled' does not control placement on the vertical axis
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-positioning-mode
     */
    verticalPositioningMode: AxisPositioningMode;
    private verticalPositioningModeChanged;
    /**
     * The default vertical position of the region relative to the anchor element
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-default-position
     */
    verticalDefaultPosition: VerticalPosition;
    private verticalDefaultPositionChanged;
    /**
     * Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-viewport-lock
     */
    verticalViewportLock: boolean;
    private verticalViewportLockChanged;
    /**
     * Whether the region overlaps the anchor on the vertical axis
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-inset
     */
    verticalInset: boolean;
    private verticalInsetChanged;
    /**
     * How short the space allocated to the default position has to be before the tallest area
     * is selected for layout
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-threshold
     */
    verticalThreshold: number;
    private verticalThresholdChanged;
    /**
     * Defines how the height of the region is calculated
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-scaling
     */
    verticalScaling: AxisScalingMode;
    private verticalScalingChanged;
    /**
     * Whether the region is positioned using css "position: fixed".
     * Otherwise the region uses "position: absolute".
     * Fixed placement allows the region to break out of parent containers,
     *
     * @public
     * @remarks
     * HTML Attribute: fixed-placement
     */
    fixedPlacement: boolean;
    private fixedPlacementChanged;
    /**
     * Defines what triggers the anchored region to revaluate positioning
     *
     * @public
     * @remarks
     * HTML Attribute: auto-update-mode
     */
    autoUpdateMode: AutoUpdateMode;
    private autoUpdateModeChanged;
    /**
     * The HTML element being used as the anchor
     *
     * @public
     */
    anchorElement: HTMLElement | null;
    private anchorElementChanged;
    /**
     * The HTML element being used as the viewport
     *
     * @public
     */
    viewportElement: HTMLElement | null;
    private viewportElementChanged;
    /**
     * indicates that an initial positioning pass on layout has completed
     *
     * @internal
     */
    initialLayoutComplete: boolean;
    /**
     * indicates the current horizontal position of the region
     */
    verticalPosition: AnchoredRegionPositionLabel | undefined;
    /**
     * indicates the current vertical position of the region
     */
    horizontalPosition: AnchoredRegionPositionLabel | undefined;
    /**
     * values to be applied to the component's transform on render
     */
    private translateX;
    private translateY;
    /**
     * the span to be applied to the region on each axis
     */
    private regionWidth;
    private regionHeight;
    private resizeDetector;
    private viewportRect;
    private anchorRect;
    private regionRect;
    /**
     * base offsets between the positioner's base position and the anchor's
     */
    private baseHorizontalOffset;
    private baseVerticalOffset;
    private pendingPositioningUpdate;
    private pendingReset;
    private currentDirection;
    private regionVisible;
    private forceUpdate;
    private updateThreshold;
    private static intersectionService;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    adoptedCallback(): void;
    /**
     * update position
     */
    update: () => void;
    /**
     * destroys the instance's resize observer
     */
    private disconnectResizeDetector;
    /**
     * initializes the instance's resize observer
     */
    private initializeResizeDetector;
    /**
     * react to attribute changes that don't require a reset
     */
    private updateForAttributeChange;
    /**
     * fully initializes the component
     */
    private initialize;
    /**
     * Request a reset if there are currently no open requests
     */
    private requestReset;
    /**
     * sets the starting configuration for component internal values
     */
    private setInitialState;
    /**
     * starts observers
     */
    private startObservers;
    /**
     * get position updates
     */
    private requestPositionUpdates;
    /**
     * stops observers
     */
    private stopObservers;
    /**
     * Gets the viewport element by id, or defaults to document root
     */
    private getViewport;
    /**
     *  Gets the anchor element by id
     */
    private getAnchor;
    /**
     *  Handle intersections
     */
    private handleIntersection;
    /**
     *  iterate through intersection entries and apply data
     */
    private applyIntersectionEntries;
    /**
     *  Update the offset values
     */
    private updateRegionOffset;
    /**
     *  compare rects to see if there is enough change to justify a DOM update
     */
    private isRectDifferent;
    /**
     *  Handle resize events
     */
    private handleResize;
    /**
     * resets the component
     */
    private reset;
    /**
     *  Recalculate layout related state values
     */
    private updateLayout;
    /**
     *  Updates the style string applied to the region element as well as the css classes attached
     *  to the root element
     */
    private updateRegionStyle;
    /**
     *  Updates the css classes that reflect the current position of the element
     */
    private updatePositionClasses;
    /**
     * Get horizontal positioning state based on desired position
     */
    private setHorizontalPosition;
    /**
     * Set vertical positioning state based on desired position
     */
    private setVerticalPosition;
    /**
     *  Get available positions based on positioning mode
     */
    private getPositioningOptions;
    /**
     *  Get the space available for a particular relative position
     */
    private getAvailableSpace;
    /**
     * Get region dimensions
     */
    private getNextRegionDimension;
    /**
     * starts event listeners that can trigger auto updating
     */
    private startAutoUpdateEventListeners;
    /**
     * stops event listeners that can trigger auto updating
     */
    private stopAutoUpdateEventListeners;
}

/**
 * A utility interface to store anchored region
 * configurations that correspond to various common flyout
 * positioning schemes
 *
 * @public
 */
export declare interface AnchoredRegionConfig {
    /**
     * Whether the region is positioned using css "position: fixed".
     * Otherwise the region uses "position: absolute".
     * Fixed placement allows the region to break out of parent containers,
     */
    readonly fixedPlacement?: boolean;
    /**
     * The auto-update setting of the component
     */
    readonly autoUpdateMode?: AutoUpdateMode;
    /**
     * Sets what logic the component uses to determine vertical placement.
     */
    readonly verticalPositioningMode?: AxisPositioningMode;
    /**
     * The default vertical position of the region relative to the anchor element
     */
    readonly verticalDefaultPosition?: VerticalPosition;
    /**
     * Whether the region overlaps the anchor on the vertical axis
     */
    readonly verticalInset?: boolean;
    /**
     * Defines how the height of the region is calculated
     */
    readonly verticalScaling?: AxisScalingMode;
    /**
     * How short the space allocated to the default position has to be before the tallest area
     * is selected for layout
     */
    readonly verticalThreshold?: number;
    /**
     * Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis
     */
    readonly verticalViewportLock?: boolean;
    /**
     * Sets what logic the component uses to determine horizontal placement.
     */
    readonly horizontalPositioningMode?: AxisPositioningMode;
    /**
     * The default horizontal position of the region relative to the anchor element
     */
    readonly horizontalDefaultPosition?: HorizontalPosition;
    /**
     *  hether the region overlaps the anchor on the horizontal axis
     */
    readonly horizontalInset?: boolean;
    /**
     * Defines how the width of the region is calculate
     */
    readonly horizontalScaling?: AxisScalingMode;
    /**
     * Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis
     */
    readonly horizontalViewportLock?: boolean;
    /**
     * How short the space allocated to the default position has to be before the widest area
     * is selected for layout
     */
    readonly horizontalThreshold?: number;
}

/**
 * Describes the possible positions of the region relative
 * to its anchor. Depending on the axis start = left/top, end = right/bottom
 *
 * @public
 */
export declare type AnchoredRegionPositionLabel = "start" | "insetStart" | "insetEnd" | "end" | "center";

/**
 * The template for the {@link @microsoft/fast-foundation#(AnchoredRegion:class)} component.
 * @public
 */
export declare const anchoredRegionTemplate: FoundationElementTemplate<ViewTemplate<AnchoredRegion>>;

/**
 * Anchor configuration options
 * @public
 */
export declare type AnchorOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The template for the {@link @microsoft/fast-foundation#(Anchor:class)} component.
 * @public
 */
export declare const anchorTemplate: FoundationElementTemplate<ViewTemplate<Anchor>, AnchorOptions>;

/**
 * Apply mixins to a constructor.
 * Sourced from {@link https://www.typescriptlang.org/docs/handbook/mixins.html | TypeScript Documentation }.
 * @public
 */
export declare function applyMixins(derivedCtor: any, ...baseCtors: any[]): void;

/**
 * Some states and properties are applicable to all host language elements regardless of whether a role is applied.
 * The following global states and properties are supported by all roles and by all base markup elements.
 * {@link https://www.w3.org/TR/wai-aria-1.1/#global_states}
 *
 * This is intended to be used as a mixin. Be sure you extend FASTElement.
 *
 * @public
 */
export declare class ARIAGlobalStatesAndProperties {
    /**
     * Indicates whether assistive technologies will present all, or only parts of,
     * the changed region based on the change notifications defined by the aria-relevant attribute.
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-atomic}
     *
     * @public
     * @remarks
     * HTML Attribute: aria-atomic
     */
    ariaAtomic: "true" | "false" | string | null;
    /**
     * Indicates an element is being modified and that assistive technologies MAY want to wait
     * until the modifications are complete before exposing them to the user.
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-busy}
     *
     * @public
     * @remarks
     * HTML Attribute: aria-busy
     */
    ariaBusy: "true" | "false" | string | null;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-controls}
     * @public
     * @remarks
     * HTML Attribute: aria-controls
     */
    ariaControls: string | null;
    /**
     * Indicates the element that represents the current item within a container or set of related elements.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-current}
     * @public
     * @remarks
     * HTML Attribute: aria-current
     */
    ariaCurrent: "page" | "step" | "location" | "date" | "time" | "true" | "false" | string | null;
    /**
     * Identifies the element (or elements) that describes the object.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-describedby}
     * @public
     * @remarks
     * HTML Attribute: aria-describedby
     */
    ariaDescribedby: string | null;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-details}
     * @public
     * @remarks
     * HTML Attribute: aria-details
     */
    ariaDetails: string | null;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-disabled}
     * @public
     * @remarks
     * HTML Attribute: aria-disabled
     */
    ariaDisabled: "true" | "false" | string | null;
    /**
     * Identifies the element that provides an error message for the object.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage}
     * @public
     * @remarks
     * HTML Attribute: aria-errormessage
     */
    ariaErrormessage: string | null;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-flowto}
     * @public
     * @remarks
     * HTML Attribute: aria-flowto
     */
    ariaFlowto: string | null;
    /**
     * Indicates the availability and type of interactive popup element,
     * such as menu or dialog, that can be triggered by an element.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup}
     * @public
     * @remarks
     * HTML Attribute: aria-haspopup
     */
    ariaHaspopup: "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | string | null;
    /**
     * Indicates whether the element is exposed to an accessibility API
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-hidden}
     * @public
     * @remarks
     * HTML Attribute: aria-hidden
     */
    ariaHidden: "false" | "true" | string | null;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-invalid}
     * @public
     * @remarks
     * HTML Attribute: aria-invalid
     */
    ariaInvalid: "false" | "true" | "grammar" | "spelling" | string | null;
    /**
     * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts}
     * @public
     * @remarks
     * HTML Attribute: aria-keyshortcuts
     */
    ariaKeyshortcuts: string | null;
    /**
     * Defines a string value that labels the current element.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-label}
     * @public
     * @remarks
     * HTML Attribute: aria-label
     */
    ariaLabel: string | null;
    /**
     * Identifies the element (or elements) that labels the current element.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby}
     * @public
     * @remarks
     * HTML Attribute: aria-labelledby
     */
    ariaLabelledby: string | null;
    /**
     * Indicates that an element will be updated, and describes the types of updates the user agents,
     * assistive technologies, and user can expect from the live region.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-live}
     * @public
     * @remarks
     * HTML Attribute: aria-live
     */
    ariaLive: "assertive" | "off" | "polite" | string | null;
    /**
     * Identifies an element (or elements) in order to define a visual,
     * functional, or contextual parent/child relationship between DOM elements
     * where the DOM hierarchy cannot be used to represent the relationship.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-owns}
     * @public
     * @remarks
     * HTML Attribute: aria-owns
     */
    ariaOwns: string | null;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-relevant}
     * @public
     * @remarks
     * HTML Attribute: aria-relevant
     */
    ariaRelevant: "additions" | "additions text" | "all" | "removals" | "text" | string | null;
    /**
     * Defines a human-readable, author-localized description for the role of an element.
     *
     * {@link https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription}
     * @public
     * @remarks
     * HTML Attribute: aria-roledescription
     */
    ariaRoledescription: string | null;
}

/**
 * Defines if the component updates its position automatically. Calling update() always provokes an update.
 * anchor - the component only updates its position when the anchor resizes (default)
 * auto - the component updates its position when:
 * - update() is called
 * - the anchor resizes
 * - the window resizes
 * - the viewport resizes
 * - any scroll event in the document
 *
 * @public
 */
export declare type AutoUpdateMode = "anchor" | "auto";

/**
 * An Avatar Custom HTML Element
 *
 * @slot media - Used for media such as an image
 * @slot - The default slot for avatar text, commonly a name or initials
 * @slot badge - Used to provide a badge, such as a status badge
 * @csspart backplate - The wrapping container for the avatar
 * @csspart link - The avatar link
 * @csspart media - The media slot
 * @csspart content - The default slot
 *
 * @public
 */
export declare class Avatar extends FoundationElement {
    /**
     * Indicates the Avatar should have a color fill.
     *
     * @public
     * @remarks
     * HTML Attribute: fill
     */
    fill: string;
    /**
     * Indicates the Avatar should have a text color.
     *
     * @public
     * @remarks
     * HTML Attribute: color
     */
    color: string;
    /**
     * Indicates the Avatar should have url link
     *
     * @public
     * @remarks
     * HTML Attribute: link
     */
    link: string;
    /**
     * Indicates the Avatar shape should be. By default it will be set to "circle".
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape: AvatarShape;
    /**
     * Internal
     */
    connectedCallback(): void;
}

/**
 * Avatar configuration options
 * @public
 */
export declare type AvatarOptions = FoundationElementDefinition & {
    media?: string | SyntheticViewTemplate;
};

declare type AvatarShape = "circle" | "square";

/**
 * The template for {@link @microsoft/fast-foundation#Avatar} component.
 * @public
 */
export declare const avatarTemplate: FoundationElementTemplate<ViewTemplate<Avatar>, AvatarOptions>;

/**
 * Defines the base behavior of an anchored region on a particular axis
 *
 * @public
 */
export declare type AxisPositioningMode = "uncontrolled" | "locktodefault" | "dynamic";

/**
 * Defines the scaling behavior of an anchored region on a particular axis
 *
 * @public
 */
export declare type AxisScalingMode = "anchor" | "fill" | "content";

/**
 * A Badge Custom HTML Element.
 * @slot - The default slot for the badge
 * @csspart control - The element representing the badge, which wraps the default slot
 *
 * @public
 */
export declare class Badge extends FoundationElement {
    /**
     * Indicates the badge should have a filled style.
     * @public
     * @remarks
     * HTML Attribute: fill
     */
    fill: string;
    /**
     * Indicates the badge should have a filled style.
     *
     * @public
     * @remarks
     * HTML Attribute: color
     * @privateRemarks
     * Revisit this once we have a better story for ensuring proper contrast from author defined `fill`
     */
    color: string;
    /**
     * Indicates the element should be circular
     *
     * @public
     * @remarks
     * HTML Attribute: circular
     */
    circular: boolean;
    generateBadgeStyle: () => string | undefined;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 * @public
 */
export declare const badgeTemplate: FoundationElementTemplate<ViewTemplate<Badge>>;

/**
 * An Progress HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#progressbar | ARIA progressbar }.
 *
 * @slot indeterminate - The slot for a custom indeterminate indicator
 * @csspart progress - Represents the progress element
 * @csspart determinate - The determinate indicator
 * @csspart indeterminate - The indeterminate indicator
 *
 * @public
 */
export declare class BaseProgress extends FoundationElement {
    /**
     * The value of the progress
     * @public
     * @remarks
     * HTML Attribute: value
     */
    value: number | null;
    private valueChanged;
    /**
     * The minimum value
     * @public
     * @remarks
     * HTML Attribute: min
     */
    min: number;
    private minChanged;
    /**
     * The maximum value
     * @public
     * @remarks
     * HTML Attribute: max
     */
    max: number;
    private maxChanged;
    /**
     * Indicates the progress is paused
     * @public
     * @remarks
     * HTML Attribute: paused
     */
    paused: boolean;
    /**
     * Indicates progress in %
     * @internal
     */
    percentComplete: number;
    /**
     * @internal
     */
    connectedCallback(): void;
    private updatePercentComplete;
}

/**
 * A Breadcrumb Custom HTML Element.
 * @slot - The default slot for the breadcrumb items
 * @csspart list - The element wrapping the slotted items
 *
 * @public
 */
export declare class Breadcrumb extends FoundationElement {
    /**
     * @internal
     */
    slottedBreadcrumbItems: HTMLElement[];
    slottedBreadcrumbItemsChanged(): void;
    private setItemSeparator;
    /**
     * Finds href on childnodes in the light DOM or shadow DOM.
     * We look in the shadow DOM because we insert an anchor when breadcrumb-item has an href.
     */
    private findChildWithHref;
    /**
     *  Sets ARIA Current for the current node
     * If child node with an anchor tag and with href is found then set aria-current to correct value for the child node,
     * otherwise apply aria-current to the host element, with an href
     */
    private setAriaCurrent;
}

/**
 * A Breadcrumb Item Custom HTML Element.
 *
 * @public
 */
export declare class BreadcrumbItem extends Anchor {
    /**
     * @internal
     */
    separator: boolean;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface BreadcrumbItem extends StartEnd, DelegatesARIALink {
}

/**
 * Breadcrumb Item configuration options
 *
 * @slot - The default slot for when no href is provided or for providing your own custom elements
 * @slot separator - The slot for providing a custom separator
 * @csspart listitem - The wrapping container for the item, represents a semantic listitem
 * @csspart separator - The wrapping element for the separator
 *
 * @public
 */
export declare type BreadcrumbItemOptions = FoundationElementDefinition & StartEndOptions & {
    separator?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(BreadcrumbItem:class)} component.
 * @public
 */
export declare const breadcrumbItemTemplate: FoundationElementTemplate<ViewTemplate<BreadcrumbItem>, BreadcrumbItemOptions>;

/**
 * The template for the {@link @microsoft/fast-foundation#Breadcrumb} component.
 * @public
 */
export declare const breadcrumbTemplate: FoundationElementTemplate<ViewTemplate<Breadcrumb>>;

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
export declare class Button extends FormAssociatedButton {
    /**
     * Determines if the element should receive document focus on page load.
     *
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    /**
     * The id of a form to associate the element to.
     *
     * @public
     * @remarks
     * HTML Attribute: form
     */
    formId: string;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formaction
     */
    formaction: string;
    private formactionChanged;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formenctype
     */
    formenctype: string;
    private formenctypeChanged;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formmethod
     */
    formmethod: string;
    private formmethodChanged;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formnovalidate
     */
    formnovalidate: boolean;
    private formnovalidateChanged;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formtarget
     */
    formtarget: "_self" | "_blank" | "_parent" | "_top";
    private formtargetChanged;
    /**
     * The button type.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
    type: "submit" | "reset" | "button";
    private typeChanged;
    /**
     *
     * Default slotted content
     *
     * @public
     * @remarks
     */
    defaultSlottedContent: HTMLElement[];
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Prevent events to propagate if disabled and has no slotted content wrapped in HTML elements
     * @internal
     */
    private handleClick;
    /**
     * Submits the parent form
     */
    private handleSubmission;
    /**
     * Resets the parent form
     */
    private handleFormReset;
    control: HTMLButtonElement;
    /**
     * Overrides the focus call for where delegatesFocus is unsupported.
     * This check works for Chrome, Edge Chromium, FireFox, and Safari
     * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
     */
    private handleUnsupportedDelegatesFocus;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface Button extends StartEnd, DelegatesARIAButton {
}

declare class _Button extends FoundationElement {
}

declare interface _Button extends FormAssociated {
}

/**
 * Button configuration options
 * @public
 */
export declare type ButtonOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 * @public
 */
export declare const buttonTemplate: FoundationElementTemplate<ViewTemplate<Button>, ButtonOptions>;

/**
 * Calendar component
 *
 * @slot - The default slot for calendar content
 * @fires dateselected - Fires a custom 'dateselected' event when Enter is invoked via keyboard on a date
 *
 * @public
 */
export declare class Calendar extends FoundationElement {
    /**
     * date formatter utitlity for getting localized strings
     * @public
     */
    dateFormatter: DateFormatter;
    /**
     * Readonly attribute for turning off data-grid
     * @public
     */
    readonly: boolean;
    /**
     * String repesentation of the full locale including market, calendar type and numbering system
     * @public
     */
    locale: string;
    private localeChanged;
    /**
     * Month to display
     * @public
     */
    month: number;
    /**
     * Year of the month to display
     * @public
     */
    year: number;
    /**
     * Format style for the day
     * @public
     */
    dayFormat: DayFormat;
    private dayFormatChanged;
    /**
     * Format style for the week day labels
     * @public
     */
    weekdayFormat: WeekdayFormat;
    private weekdayFormatChanged;
    /**
     * Format style for the month label
     * @public
     */
    monthFormat: MonthFormat;
    private monthFormatChanged;
    /**
     * Format style for the year used in the title
     * @public
     */
    yearFormat: YearFormat;
    private yearFormatChanged;
    /**
     * Minimum number of weeks to show for the month
     * This can be used to normalize the calendar view
     *  when changing or across multiple calendars
     * @public
     */
    minWeeks: number;
    /**
     * A list of dates that should be shown as disabled
     * @public
     */
    disabledDates: string;
    /**
     * A list of dates that should be shown as highlighted
     * @public
     */
    selectedDates: string;
    /**
     * The number of miliseconds in a day
     * @internal
     */
    private oneDayInMs;
    /**
     * Gets data needed to render about a calendar month as well as the previous and next months
     * @param year - year of the calendar
     * @param month - month of the calendar
     * @returns - an object with data about the current and 2 surrounding months
     * @public
     */
    getMonthInfo(month?: number, year?: number): CalendarInfo;
    /**
     * A list of calendar days
     * @param info - an object containing the information needed to render a calendar month
     * @param minWeeks - minimum number of weeks to show
     * @returns a list of days in a calendar month
     * @public
     */
    getDays(info?: CalendarInfo, minWeeks?: number): CalendarDateInfo[][];
    /**
     * A helper function that checks if a date exists in a list of dates
     * @param date - A date objec that includes the day, month and year
     * @param datesString - a comma separated list of dates
     * @returns - Returns true if it found the date in the list of dates
     * @public
     */
    dateInString(date: Date | string, datesString: string): boolean;
    /**
     * Creates a class string for the day container
     * @param date - date of the calendar cell
     * @returns - string of class names
     * @public
     */
    getDayClassNames(date: CalendarDateInfo, todayString?: string): string;
    /**
     * Returns a list of weekday labels
     * @returns An array of weekday text and full text if abbreviated
     * @public
     */
    getWeekdayText(): {
        text: string;
        abbr?: string;
    }[];
    /**
     * Emits the "date-select" event with the day, month and year.
     * @param date - Date cell
     * @public
     */
    handleDateSelect(event: Event, day: CalendarDateInfo): void;
    /**
     * Handles keyboard events on a cell
     * @param event - Keyboard event
     * @param date - Date of the cell selected
     */
    handleKeydown(event: KeyboardEvent, date: CalendarDateInfo): boolean;
}

/**
 * A calendar day template
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param todayString - A string representation for todays date
 * @returns - A calendar cell template for a given date
 * @public
 */
export declare const calendarCellTemplate: (context: ElementDefinitionContext, todayString: string) => ViewTemplate<CalendarDateInfo>;

/**
 * Caldendar date info
 * used to represent a date
 * @public
 */
export declare type CalendarDateInfo = {
    day: number;
    month: number;
    year: number;
    disabled?: boolean;
    selected?: boolean;
};

/**
 * Calendar information needed for rendering
 * including the next and previous months
 * @public
 */
export declare type CalendarInfo = MonthInfo & {
    previous: MonthInfo;
    next: MonthInfo;
};

/**
 * Calendar configuration options
 * @public
 */
export declare type CalendarOptions = FoundationElementDefinition & StartEndOptions & {
    title?: FoundationElementTemplate<SyntheticViewTemplate<any, Calendar>, CalendarOptions> | SyntheticViewTemplate | string;
};

/**
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param todayString - A string representation for todays date
 * @returns - A template for a week of days
 * @public
 */
export declare const calendarRowTemplate: (context: ElementDefinitionContext, todayString: string) => ViewTemplate;

/**
 * The template for the {@link @microsoft/fast-foundation#(Calendar:class)} component.
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param definition - Foundation element definition
 * @returns - a template for a calendar month
 * @public
 */
export declare const calendarTemplate: FoundationElementTemplate<ViewTemplate<Calendar>, CalendarOptions>;

/**
 * A basic Calendar title template that includes the month and year
 * @returns - A calendar title template
 * @public
 */
export declare const CalendarTitleTemplate: ViewTemplate<Calendar>;

/**
 * Calendar weekday label template
 * @returns - The weekday labels template
 * @public
 */
export declare const calendarWeekdayTemplate: (context: ElementDefinitionContext) => ViewTemplate;

/**
 * An Card Custom HTML Element.
 *
 * @slot - The default slot for the card content
 *
 * @public
 */
export declare class Card extends FoundationElement {
}

/**
 * The template for the {@link @microsoft/fast-foundation#Card} component.
 * @public
 */
export declare const cardTemplate: FoundationElementTemplate<ViewTemplate<Card>>;

/**
 * @alpha
 */
export declare function CheckableFormAssociated<T extends ConstructableFormAssociated>(BaseCtor: T): T;

/**
 * Base class for providing Custom Element Form Association with checkable features.
 *
 * @alpha
 */
export declare interface CheckableFormAssociated extends FormAssociated {
    currentChecked: boolean;
    dirtyChecked: boolean;
    checkedAttribute: boolean;
    defaultChecked: boolean;
    defaultCheckedChanged(oldValue: boolean | undefined, newValue: boolean): void;
    checked: boolean;
    checkedChanged(oldValue: boolean | undefined, newValue: boolean): void;
}

/**
 * Combined type to describe a checkable Form-associated element.
 *
 * @alpha
 */
export declare type CheckableFormAssociatedElement = FormAssociatedElement & CheckableFormAssociated & {
    proxy: HTMLInputElement;
};

/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual checkbox control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export declare class Checkbox extends FormAssociatedCheckbox {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    initialValue: string;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * The indeterminate state of the control
     */
    indeterminate: boolean;
    constructor();
    /**
     * @internal
     */
    keypressHandler: (e: KeyboardEvent) => void;
    /**
     * @internal
     */
    clickHandler: (e: MouseEvent) => void;
}

declare class _Checkbox extends FoundationElement {
}

declare interface _Checkbox extends CheckableFormAssociated {
}

/**
 * Checkbox configuration options
 * @public
 */
export declare type CheckboxOptions = FoundationElementDefinition & {
    checkedIndicator?: string | SyntheticViewTemplate;
    indeterminateIndicator?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Checkbox:class)} component.
 * @public
 */
export declare const checkboxTemplate: FoundationElementTemplate<ViewTemplate<Checkbox>, CheckboxOptions>;

/**
 * Defines a column in the grid
 *
 * @public
 */
export declare interface ColumnDefinition {
    /**
     * Identifies the data item to be displayed in this column
     * (i.e. how the data item is labelled in each row)
     */
    columnDataKey: string;
    /**
     * Sets the css grid-column property on the cell which controls its placement in
     * the parent row. If left unset the cells will set this value to match the index
     * of their column in the parent collection of ColumnDefinitions.
     */
    gridColumn?: string;
    /**
     *  Column title, if not provided columnDataKey is used as title
     */
    title?: string;
    /**
     *  Header cell template
     */
    headerCellTemplate?: ViewTemplate;
    /**
     * Whether the header cell has an internal focus queue
     */
    headerCellInternalFocusQueue?: boolean;
    /**
     * Callback function that returns the element to focus in a custom cell.
     * When headerCellInternalFocusQueue is false this function is called when the cell is first focused
     * to immediately move focus to a cell element, for example a cell that is a checkbox could move
     * focus directly to the checkbox.
     * When headerCellInternalFocusQueue is true this function is called when the user hits Enter or F2
     */
    headerCellFocusTargetCallback?: (cell: DataGridCell) => HTMLElement;
    /**
     * cell template
     */
    cellTemplate?: ViewTemplate;
    /**
     * Whether the cell has an internal focus queue
     */
    cellInternalFocusQueue?: boolean;
    /**
     * Callback function that returns the element to focus in a custom cell.
     * When cellInternalFocusQueue is false this function is called when the cell is first focused
     * to immediately move focus to a cell element, for example a cell that is a checkbox could move
     * focus directly to the checkbox.
     * When cellInternalFocusQueue is true this function is called when the user hits Enter or F2
     */
    cellFocusTargetCallback?: (cell: DataGridCell) => HTMLElement;
    /**
     * Whether this column is the row header
     */
    isRowHeader?: boolean;
}

/**
 * A Combobox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#combobox | ARIA combobox }.
 *
 * @slot start - Content which can be provided before the input
 * @slot end - Content which can be provided after the input
 * @slot control - Used to replace the input element representing the combobox
 * @slot indicator - The visual indicator representing the expanded state
 * @slot - The default slot for the options
 * @csspart control - The wrapper element containing the input area, including start and end
 * @csspart selected-value - The input element representing the selected value
 * @csspart indicator - The element wrapping the indicator slot
 * @csspart listbox - The wrapper for the listbox slotted options
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export declare class Combobox extends FormAssociatedCombobox {
    /**
     * The internal value property.
     *
     * @internal
     */
    private _value;
    /**
     * The autocomplete attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: autocomplete
     */
    autocomplete: ComboboxAutocomplete | undefined;
    /**
     * Reference to the internal text input element.
     *
     * @internal
     */
    control: HTMLInputElement;
    /**
     * Reference to the internal listbox element.
     *
     * @internal
     */
    listbox: HTMLDivElement;
    /**
     * The collection of currently filtered options.
     *
     * @public
     */
    filteredOptions: ListboxOption[];
    /**
     * The current filter value.
     *
     * @internal
     */
    private filter;
    /**
     * The initial state of the position attribute.
     *
     * @internal
     */
    private forcedPosition;
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback(): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    private get isAutocompleteInline();
    private get isAutocompleteList();
    private get isAutocompleteBoth();
    /**
     * The unique id for the internal listbox element.
     *
     * @internal
     */
    listboxId: string;
    /**
     * The max height for the listbox when opened.
     *
     * @internal
     */
    maxHeight: number;
    /**
     * The open attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: open
     */
    open: boolean;
    /**
     * Sets focus and synchronize ARIA attributes when the open property changes.
     *
     * @param prev - the previous open value
     * @param next - the current open value
     *
     * @internal
     */
    protected openChanged(): void;
    /**
     * The list of options.
     *
     * @public
     * @remarks
     * Overrides `Listbox.options`.
     */
    get options(): ListboxOption[];
    set options(value: ListboxOption[]);
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute is not a valid substitute for a labeling element.
     */
    placeholder: string;
    /**
     * Updates the placeholder on the proxy element.
     * @internal
     */
    protected placeholderChanged(): void;
    /**
     * The placement for the listbox when the combobox is open.
     *
     * @public
     */
    positionAttribute?: SelectPosition;
    /**
     * The current state of the calculated position of the listbox.
     *
     * @public
     */
    position?: SelectPosition;
    protected positionChanged(prev: SelectPosition | undefined, next: SelectPosition | undefined): void;
    /**
     * The value property.
     *
     * @public
     */
    get value(): string;
    set value(next: string);
    /**
     * Handle opening and closing the listbox when the combobox is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    connectedCallback(): void;
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev: boolean, next: boolean): void;
    /**
     * Filter available options by text value.
     *
     * @public
     */
    filterOptions(): void;
    /**
     * Focus the control and scroll the first selected option into view.
     *
     * @internal
     * @remarks
     * Overrides: `Listbox.focusAndScrollOptionIntoView`
     */
    protected focusAndScrollOptionIntoView(): void;
    /**
     * Handle focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e: FocusEvent): boolean | void;
    /**
     * Handle content changes on the control input.
     *
     * @param e - the input event
     * @internal
     */
    inputHandler(e: InputEvent): boolean | void;
    /**
     * Handle keydown actions for listbox navigation.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e: Event & KeyboardEvent): boolean | void;
    /**
     * Handle keyup actions for value input and text field manipulations.
     *
     * @param e - the keyboard event
     * @internal
     */
    keyupHandler(e: KeyboardEvent): boolean | void;
    /**
     * Ensure that the selectedIndex is within the current allowable filtered range.
     *
     * @param prev - the previous selected index value
     * @param next - the current selected index value
     *
     * @internal
     */
    selectedIndexChanged(prev: number | undefined, next: number): void;
    /**
     * Move focus to the previous selectable option.
     *
     * @internal
     * @remarks
     * Overrides `Listbox.selectPreviousOption`
     */
    selectPreviousOption(): void;
    /**
     * Set the default selected options at initialization or reset.
     *
     * @internal
     * @remarks
     * Overrides `Listbox.setDefaultSelectedOption`
     */
    setDefaultSelectedOption(): void;
    /**
     * Focus and set the content of the control based on the first selected option.
     *
     * @internal
     */
    private setInputToSelection;
    /**
     * Focus, set and select the content of the control based on the first selected option.
     *
     * @internal
     */
    private setInlineSelection;
    /**
     * Determines if a value update should involve emitting a change event, then updates the value.
     *
     * @internal
     */
    private syncValue;
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @param force - direction to force the listbox to display
     * @public
     */
    setPositioning(): void;
    /**
     * Ensure that the entire list of options is used when setting the selected property.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @internal
     * @remarks
     * Overrides: `Listbox.selectedOptionsChanged`
     */
    selectedOptionsChanged(prev: ListboxOption[] | undefined, next: ListboxOption[]): void;
    /**
     * Synchronize the form-associated proxy and update the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev: Element[] | undefined, next: Element[]): void;
    /**
     * Sets the value and to match the first selected option.
     *
     * @param shouldEmit - if true, the change event will be emitted
     *
     * @internal
     */
    private updateValue;
    /**
     * @internal
     */
    private clearSelectionRange;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface Combobox extends StartEnd, DelegatesARIACombobox {
}

declare class _Combobox extends Listbox {
}

declare interface _Combobox extends FormAssociated {
}

/**
 * Autocomplete values for combobox.
 * @public
 */
export declare const ComboboxAutocomplete: {
    readonly inline: "inline";
    readonly list: "list";
    readonly both: "both";
    readonly none: "none";
};

/**
 * Autocomplete type for combobox.
 * @public
 */
export declare type ComboboxAutocomplete = typeof ComboboxAutocomplete[keyof typeof ComboboxAutocomplete];

/**
 * Combobox configuration options
 * @public
 */
export declare type ComboboxOptions = FoundationElementDefinition & StartEndOptions & {
    indicator?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Combobox:class)} component.
 * @public
 */
export declare const comboboxTemplate: FoundationElementTemplate<ViewTemplate<Combobox>, ComboboxOptions>;

/**
 * Applies presentation details, such as template and styles, to a component instance.
 * @public
 */
export declare interface ComponentPresentation {
    /**
     * Applies the presentation details to the specified element.
     * @param element - The element to apply the presentation details to.
     * @public
     */
    applyTo(element: FASTElement): void;
}

/**
 * An API gateway to component presentation features.
 * @public
 */
export declare const ComponentPresentation: Readonly<{
    /**
     * Defines a component presentation for an element.
     * @param tagName - The element name to define the presentation for.
     * @param presentation - The presentation that will be applied to matching elements.
     * @param container - The dependency injection container to register the configuration in.
     * @public
     */
    define(tagName: string, presentation: ComponentPresentation, container: Container): void;
    /**
     * Finds a component presentation for the specified element name,
     * searching the DOM hierarchy starting from the provided element.
     * @param tagName - The name of the element to locate the presentation for.
     * @param element - The element to begin the search from.
     * @returns The component presentation or null if none is found.
     * @public
     */
    forTag(tagName: string, element: HTMLElement): ComponentPresentation | null;
}>;

/**
 * Determines if the reference element contains the test element in a "composed" DOM tree that
 * ignores shadow DOM boundaries.
 *
 * Returns true of the test element is a descendent of the reference, or exist in
 * a shadow DOM that is a logical descendent of the reference. Otherwise returns false.
 * @param reference - The element to test for containment against.
 * @param test - The element being tested for containment.
 *
 * @public
 */
export declare function composedContains(reference: HTMLElement, test: HTMLElement): boolean;

/**
 * Retrieves the "composed parent" element of a node, ignoring DOM tree boundaries.
 * When the parent of a node is a shadow-root, it will return the host
 * element of the shadow root. Otherwise it will return the parent node or null if
 * no parent node exists.
 * @param element - The element for which to retrieve the composed parent
 *
 * @public
 */
export declare function composedParent<T extends HTMLElement>(element: T): HTMLElement | null;

/**
 * Combined type to describe a Constructable Form-Associated type.
 *
 * @alpha
 */
export declare type ConstructableFormAssociated = Constructable<HTMLElement & FASTElement>;

/**
 * Implemented by dependency injection containers.
 * @public
 */
export declare interface Container extends ServiceLocator {
    /**
     * Registers dependencies with the container via registration objects.
     * @param params - The registration objects.
     */
    register(...params: any[]): Container;
    /**
     * Registers dependencies with the container via registration objects, providing
     * the specified context to each register invocation.
     * @param context - The context object to pass to the registration objects.
     * @param params - The registration objects.
     */
    registerWithContext(context: any, ...params: any[]): Container;
    /**
     * Registers a resolver with the container for the specified key.
     * @param key - The key to register the resolver under.
     * @param resolver - The resolver to register.
     */
    registerResolver<K extends Key, T = K>(key: K, resolver: Resolver<T>): Resolver<T>;
    /**
     * Registers a transformer with the container for the specified key.
     * @param key - The key to resolved to register the transformer with.
     * @param transformer - The transformer to register.
     */
    registerTransformer<K extends Key, T = K>(key: K, transformer: Transformer_2<T>): boolean;
    /**
     * Gets a resolver for the specified key.
     * @param key - The key to get the resolver for.
     * @param autoRegister - Indicates whether or not to try to auto-register a dependency for
     * the key if one is not explicitly registered.
     */
    getResolver<K extends Key, T = K>(key: K | Key, autoRegister?: boolean): Resolver<T> | null;
    /**
     * Registers a factory with the container for the specified key.
     * @param key - The key to register the factory under.
     * @param factory - The factory to register.
     */
    registerFactory<T extends Constructable>(key: T, factory: Factory<T>): void;
    /**
     * Gets the factory for the specified key.
     * @param key - The key to get the factory for.
     */
    getFactory<T extends Constructable>(key: T): Factory<T>;
    /**
     * Creates a child dependency injection container parented to this container.
     * @param config - The configuration for the new container.
     */
    createChild(config?: Partial<Omit<ContainerConfiguration, "parentLocator">>): Container;
}

/**
 * The interface key that resolves the dependency injection container itself.
 * @public
 */
export declare const Container: InterfaceSymbol<Container>;

/**
 * Configuration for a dependency injection container.
 * @public
 */
export declare interface ContainerConfiguration {
    /**
     * The locator function used to find the parent of the container.
     */
    parentLocator: ParentLocator;
    /**
     * Indicates whether this container should resolve dependencies that are directly made
     * by its owner. The default is "false" which results in the parent container being used.
     */
    responsibleForOwnerRequests: boolean;
    /**
     * Gets the default resolver to use during auto-registration.
     * @param key - The key to register the dependency with.
     * @param handler - The container that is handling the auto-registration request.
     */
    defaultResolver(key: Key, handler: Container): Resolver;
}

/**
 * Configuration for a dependency injection container.
 * @public
 */
export declare const ContainerConfiguration: Readonly<{
    /**
     * The default configuration used when creating a DOM-disconnected container.
     * @remarks
     * The default creates a root container, with no parent container. It does not handle
     * owner requests and it uses singleton resolution behavior for auto-registration.
     */
    default: Readonly<ContainerConfiguration>;
}>;

/**
 * @internal
 */
export declare class ContainerImpl implements Container {
    protected owner: any;
    protected config: ContainerConfiguration;
    private _parent;
    private registerDepth;
    private resolvers;
    private context;
    get parent(): ContainerImpl | null;
    get depth(): number;
    get responsibleForOwnerRequests(): boolean;
    constructor(owner: any, config: ContainerConfiguration);
    registerWithContext(context: any, ...params: any[]): Container;
    register(...params: any[]): Container;
    registerResolver<K extends Key, T = K>(key: K, resolver: Resolver<T>): Resolver<T>;
    registerTransformer<K extends Key, T = K>(key: K, transformer: Transformer_2<T>): boolean;
    getResolver<K extends Key, T = K>(key: K | Key, autoRegister?: boolean): Resolver<T> | null;
    has<K extends Key>(key: K, searchAncestors?: boolean): boolean;
    get<K extends Key>(key: K): Resolved<K>;
    getAll<K extends Key>(key: K, searchAncestors?: boolean): readonly Resolved<K>[];
    getFactory<K extends Constructable>(Type: K): Factory<K>;
    registerFactory<K extends Constructable>(key: K, factory: Factory<K>): void;
    createChild(config?: Partial<Omit<ContainerConfiguration, "parentLocator">>): Container;
    private jitRegister;
}

/**
 * Enables defining an element within the context of a design system.
 * @public
 */
export declare type ContextualElementDefinition = Omit<PartialFASTElementDefinition, "name">;

declare function create<T extends Function>(nameOrConfig: string | DesignTokenConfiguration): never;

declare function create<T extends undefined | void>(nameOrConfig: string | DesignTokenConfiguration): never;

declare function create<T extends string | number | boolean | symbol | any[] | Uint8Array | ({ createCSS?(): string; } & Record<PropertyKey, any>) | null>(nameOrConfig: string): CSSDesignToken<T>;

declare function create<T extends string | number | boolean | symbol | any[] | Uint8Array | ({ createCSS?(): string; } & Record<PropertyKey, any>) | null>(nameOrConfig: Omit<DesignTokenConfiguration, "cssCustomPropertyName"> | (DesignTokenConfiguration & Record<"cssCustomPropertyName", string>)): CSSDesignToken<T>;

declare function create<T extends string | number | boolean | symbol | any[] | Uint8Array | ({ createCSS?(): string; } & Record<PropertyKey, any>) | null>(nameOrConfig: DesignTokenConfiguration & Record<"cssCustomPropertyName", null>): DesignToken<T>;


//declare function create<T>(nameOrConfig: string): CSSDesignToken<T>;
//
//declare function create<T>(nameOrConfig: Omit<DesignTokenConfiguration, "cssCustomPropertyName"> | (DesignTokenConfiguration & Record<"cssCustomPropertyName", string>)): CSSDesignToken<T>;
//
//declare function create<T>(nameOrConfig: DesignTokenConfiguration & Record<"cssCustomPropertyName", null>): DesignToken<T>;

/**
 * A {@link (DesignToken:interface)} that emits a CSS custom property.
 * @public
 */
export declare interface CSSDesignToken<T extends string | number | boolean | BigInteger | null | Array<any> | symbol | ({
    createCSS?(): string;
} & Record<PropertyKey, any>)> extends DesignToken<T>, CSSDirective {
    /**
     * The {@link (DesignToken:interface)} formatted as a CSS custom property if the token is
     * configured to write a CSS custom property.
     */
    readonly cssCustomProperty: string;
}

/**
 * Define all possible CSS display values.
 * @public
 */
export declare type CSSDisplayPropertyValue = "block" | "contents" | "flex" | "grid" | "inherit" | "initial" | "inline" | "inline-block" | "inline-flex" | "inline-grid" | "inline-table" | "list-item" | "none" | "run-in" | "table" | "table-caption" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group";

/**
 * This can be used to construct a behavior to apply a prefers color scheme: dark only stylesheet.
 * @public
 */
export declare const darkModeStylesheetBehavior: (styles: ElementStyles) => MatchMediaStyleSheetBehavior;

/**
 * A Data Grid Custom HTML Element.
 *
 * @slot - The default slot for custom row elements
 * @public
 */
export declare class DataGrid extends FoundationElement {
    /**
     *  generates a basic column definition by examining sample row data
     */
    static generateColumns: (row: object) => ColumnDefinition[];
    /**
     *  generates a gridTemplateColumns based on columndata array
     */
    private static generateTemplateColumns;
    /**
     * When true the component will not add itself to the tab queue.
     * Default is false.
     *
     * @public
     * @remarks
     * HTML Attribute: no-tabbing
     */
    noTabbing: boolean;
    private noTabbingChanged;
    /**
     *  Whether the grid should automatically generate a header row and its type
     *
     * @public
     * @remarks
     * HTML Attribute: generate-header
     */
    generateHeader: GenerateHeaderOptions;
    private generateHeaderChanged;
    /**
     * String that gets applied to the the css gridTemplateColumns attribute of child rows
     *
     * @public
     * @remarks
     * HTML Attribute: grid-template-columns
     */
    gridTemplateColumns: string;
    private gridTemplateColumnsChanged;
    /**
     * The data being displayed in the grid
     *
     * @public
     */
    rowsData: object[];
    private rowsDataChanged;
    /**
     * The column definitions of the grid
     *
     * @public
     */
    columnDefinitions: ColumnDefinition[] | null;
    private columnDefinitionsChanged;
    /**
     * The template to use for the programmatic generation of rows
     *
     * @public
     */
    rowItemTemplate: ViewTemplate;
    /**
     * The template used to render cells in generated rows.
     *
     * @public
     */
    cellItemTemplate?: ViewTemplate;
    /**
     * The template used to render header cells in generated rows.
     *
     * @public
     */
    headerCellItemTemplate?: ViewTemplate;
    private headerCellItemTemplateChanged;
    /**
     * The index of the row that will receive focus the next time the
     * grid is focused. This value changes as focus moves to different
     * rows within the grid.  Changing this value when focus is already
     * within the grid moves focus to the specified row.
     *
     * @public
     */
    focusRowIndex: number;
    private focusRowIndexChanged;
    /**
     * The index of the column that will receive focus the next time the
     * grid is focused. This value changes as focus moves to different rows
     * within the grid.  Changing this value when focus is already within
     * the grid moves focus to the specified column.
     *
     * @public
     */
    focusColumnIndex: number;
    private focusColumnIndexChanged;
    /**
     * The default row item template.  Set by the component templates.
     *
     * @internal
     */
    defaultRowItemTemplate: ViewTemplate;
    /**
     * Set by the component templates.
     *
     */
    rowElementTag: string;
    /**
     * Children that are rows
     *
     * @internal
     */
    rowElements: HTMLElement[];
    private rowsRepeatBehavior;
    private rowsPlaceholder;
    private generatedHeader;
    private isUpdatingFocus;
    private pendingFocusUpdate;
    private observer;
    private rowindexUpdateQueued;
    private columnDefinitionsStale;
    private generatedGridTemplateColumns;
    constructor();
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleRowFocus(e: Event): void;
    /**
     * @internal
     */
    handleFocus(e: FocusEvent): void;
    /**
     * @internal
     */
    handleFocusOut(e: FocusEvent): void;
    /**
     * @internal
     */
    handleKeydown(e: KeyboardEvent): void;
    private focusOnCell;
    private queueFocusUpdate;
    private updateFocus;
    private toggleGeneratedHeader;
    private onChildListChange;
    private queueRowIndexUpdate;
    private updateRowIndexes;
}

/**
 * A Data Grid Cell Custom HTML Element.
 *
 * @fires cell-focused - Fires a custom 'cell-focused' event when focus is on the cell or its contents
 * @slot - The default slot for cell contents.  The "cell contents template" renders here.
 * @public
 */
export declare class DataGridCell extends FoundationElement {
    /**
     * The type of cell
     *
     * @public
     * @remarks
     * HTML Attribute: cell-type
     */
    cellType: DataGridCellTypes;
    private cellTypeChanged;
    /**
     * The column index of the cell.
     * This will be applied to the css grid-column-index value
     * applied to the cell
     *
     * @public
     * @remarks
     * HTML Attribute: grid-column
     */
    gridColumn: string;
    private gridColumnChanged;
    /**
     * The base data for the parent row
     *
     * @public
     */
    rowData: object | null;
    /**
     * The base data for the column
     *
     * @public
     */
    columnDefinition: ColumnDefinition | null;
    private columnDefinitionChanged;
    private isActiveCell;
    private customCellView;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleFocusin(e: FocusEvent): void;
    handleFocusout(e: FocusEvent): void;
    handleKeydown(e: KeyboardEvent): void;
    private updateCellView;
    private disconnectCellView;
    private updateCellStyle;
}

/**
 * Generates a template for the {@link @microsoft/fast-foundation#DataGridCell} component using
 * the provided prefix.
 * @public
 */
export declare const dataGridCellTemplate: FoundationElementTemplate<ViewTemplate<DataGridCell>>;

/**
 * Enumerates possible data grid cell types.
 *
 * @public
 */
export declare const DataGridCellTypes: {
    readonly default: "default";
    readonly columnHeader: "columnheader";
    readonly rowHeader: "rowheader";
};

/**
 * The possible cell types.
 *
 * @public
 */
export declare type DataGridCellTypes = typeof DataGridCellTypes[keyof typeof DataGridCellTypes];

/**
 * A Data Grid Row Custom HTML Element.
 *
 * @fires row-focused - Fires a custom 'row-focused' event when focus is on an element (usually a cell or its contents) in the row
 * @slot - The default slot for custom cell elements
 * @public
 */
export declare class DataGridRow extends FoundationElement {
    /**
     * String that gets applied to the the css gridTemplateColumns attribute for the row
     *
     * @public
     * @remarks
     * HTML Attribute: grid-template-columns
     */
    gridTemplateColumns: string;
    private gridTemplateColumnsChanged;
    /**
     * The type of row
     *
     * @public
     * @remarks
     * HTML Attribute: row-type
     */
    rowType: DataGridRowTypes;
    private rowTypeChanged;
    /**
     * The base data for this row
     *
     * @public
     */
    rowData: object | null;
    private rowDataChanged;
    /**
     * The column definitions of the row
     *
     * @public
     */
    columnDefinitions: ColumnDefinition[] | null;
    /**
     * The template used to render cells in generated rows.
     *
     * @public
     */
    cellItemTemplate?: ViewTemplate;
    private cellItemTemplateChanged;
    /**
     * The template used to render header cells in generated rows.
     *
     * @public
     */
    headerCellItemTemplate?: ViewTemplate;
    private headerCellItemTemplateChanged;
    /**
     * The index of the row in the parent grid.
     * This is typically set programmatically by the parent grid.
     *
     * @public
     */
    rowIndex: number;
    /**
     * Whether focus is on/in a cell within this row.
     *
     * @internal
     */
    isActiveRow: boolean;
    /**
     * The cell item template currently in use.
     *
     * @internal
     */
    activeCellItemTemplate?: ViewTemplate;
    /**
     * The default cell item template.  Set by the component templates.
     *
     * @internal
     */
    defaultCellItemTemplate?: ViewTemplate;
    /**
     * The default header cell item template.  Set by the component templates.
     *
     * @internal
     */
    defaultHeaderCellItemTemplate?: ViewTemplate;
    /**
     * Children that are cells
     *
     * @internal
     */
    cellElements: HTMLElement[];
    private cellsRepeatBehavior;
    private cellsPlaceholder;
    /**
     * @internal
     */
    slottedCellElements: HTMLElement[];
    /**
     * @internal
     */
    focusColumnIndex: number;
    private refocusOnLoad;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleFocusout(e: FocusEvent): void;
    handleCellFocus(e: Event): void;
    handleKeydown(e: KeyboardEvent): void;
    private updateItemTemplate;
    private updateRowStyle;
}

/**
 * Generates a template for the {@link @microsoft/fast-foundation#DataGridRow} component using
 * the provided prefix.
 *
 * @public
 */
export declare const dataGridRowTemplate: FoundationElementTemplate<ViewTemplate<DataGridRow>>;

/**
 * Enumerates possible data grid row types
 *
 * @public
 */
export declare const DataGridRowTypes: {
    readonly default: "default";
    readonly header: "header";
    readonly stickyHeader: "sticky-header";
};

/**
 * The possible data grid row types
 *
 * @public
 */
export declare type DataGridRowTypes = typeof DataGridRowTypes[keyof typeof DataGridRowTypes];

/**
 * Generates a template for the {@link @microsoft/fast-foundation#DataGrid} component using
 * the provided prefix.
 *
 * @public
 */
export declare const dataGridTemplate: FoundationElementTemplate<ViewTemplate<DataGrid>>;

/**
 * Date formatting utility
 * @public
 */
export declare class DateFormatter {
    /**
     * Localization settings to use for formatting
     * @public
     */
    locale: string;
    /**
     * Formatting for the day
     * @public
     */
    dayFormat: DayFormat;
    /**
     * Formatting for the weekday labels
     * @public
     */
    weekdayFormat: WeekdayFormat;
    /**
     * Formatting for the month
     * @public
     */
    monthFormat: MonthFormat;
    /**
     * Formatting for the year
     * @public
     */
    yearFormat: YearFormat;
    /**
     * Date used for formatting
     */
    date: Date;
    constructor(config?: {});
    /**
     * Helper function to make sure that the DateFormatter is working with an instance of Date
     * @param date - The date as an object, string or Date insance
     * @returns - A Date instance
     * @public
     */
    getDateObject(date: {
        day: number;
        month: number;
        year: number;
    } | string | Date): Date;
    /**
     *
     * @param date - a valide date as either a Date, string, objec or a DateFormatter
     * @param format - The formatting for the string
     * @param locale - locale data used for formatting
     * @returns A localized string of the date provided
     * @public
     */
    getDate(date?: {
        day: number;
        month: number;
        year: number;
    } | string | Date, format?: Intl.DateTimeFormatOptions, locale?: string): string;
    /**
     *
     * @param day - Day to localize
     * @param format - The formatting for the day
     * @param locale - The locale data used for formatting
     * @returns - A localized number for the day
     * @public
     */
    getDay(day?: number, format?: DayFormat, locale?: string): string;
    /**
     *
     * @param month - The month to localize
     * @param format - The formatting for the month
     * @param locale - The locale data used for formatting
     * @returns - A localized name of the month
     * @public
     */
    getMonth(month?: number, format?: MonthFormat, locale?: string): string;
    /**
     *
     * @param year - The year to localize
     * @param format - The formatting for the year
     * @param locale - The locale data used for formatting
     * @returns - A localized string for the year
     * @public
     */
    getYear(year?: number, format?: YearFormat, locale?: string): string;
    /**
     *
     * @param weekday - The number of the weekday, defaults to Sunday
     * @param format - The formatting for the weekday label
     * @param locale - The locale data used for formatting
     * @returns - A formatted weekday label
     * @public
     */
    getWeekday(weekday?: number, format?: WeekdayFormat, locale?: string): string;
    /**
     *
     * @param format - The formatting for the weekdays
     * @param locale - The locale data used for formatting
     * @returns - An array of the weekday labels
     * @public
     */
    getWeekdays(format?: WeekdayFormat, locale?: string): string[];
}

/**
 * A type representing the different day formats
 * @public
 */
export declare type DayFormat = "2-digit" | "numeric";

/**
 * The default implementation of ComponentPresentation, used by FoundationElement.
 * @public
 */
export declare class DefaultComponentPresentation implements ComponentPresentation {
    /**
     * The styles to apply to the element.
     * @public
     */
    readonly styles: ElementStyles | null;
    /**
     * The template to apply to the element.
     * @public
     */
    readonly template: ElementViewTemplate | null;
    /**
     * Creates an instance of DefaultComponentPresentation.
     * @param template - The template to apply to the element.
     * @param styles - The styles to apply to the element.
     * @public
     */
    constructor(template?: ElementViewTemplate, styles?: ComposableStyles | ComposableStyles[]);
    /**
     * Applies the presentation details to the specified element.
     * @param element - The element to apply the presentation details to.
     * @public
     */
    applyTo(element: FASTElement): void;
}

/**
 * A set of default resolvers useful in configuring a container.
 * @public
 */
export declare const DefaultResolver: Readonly<{
    /**
     * Disables auto-registration and throws for all un-registered dependencies.
     * @param key - The key to create the resolver for.
     */
    none(key: Key): Resolver;
    /**
     * Provides default singleton resolution behavior during auto-registration.
     * @param key - The key to create the resolver for.
     * @returns The resolver.
     */
    singleton(key: Key): Resolver;
    /**
     * Provides default transient resolution behavior during auto-registration.
     * @param key - The key to create the resolver for.
     * @returns The resolver.
     */
    transient(key: Key): Resolver;
}>;

/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export declare class DelegatesARIAButton {
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-expanded
     */
    ariaExpanded: "true" | "false" | string | null;
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-pressed
     */
    ariaPressed: "true" | "false" | "mixed" | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIAButton extends ARIAGlobalStatesAndProperties {
}

/**
 * Includes ARIA states and properties relating to the ARIA combobox role.
 *
 * @public
 */
export declare class DelegatesARIACombobox {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete} for more information.
     *
     * @public
     * @remarks
     * HTML Attribute: `aria-autocomplete`
     */
    ariaAutoComplete: "inline" | "list" | "both" | "none" | string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#aria-controls} for more information.
     *
     * @public
     * @remarks
     * HTML Attribute: `aria-controls`
     */
    ariaControls: string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIACombobox extends DelegatesARIAListbox {
}

/**
 * Includes ARIA states and properties relating to the ARIA link role
 *
 * @public
 */
export declare class DelegatesARIALink {
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#link} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-expanded
     */
    ariaExpanded: "true" | "false" | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIALink extends ARIAGlobalStatesAndProperties {
}

/**
 * Includes ARIA states and properties relating to the ARIA listbox role
 *
 * @public
 */
export declare class DelegatesARIAListbox {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#listbox} for more information
     * @public
     * @remarks
     * HTML Attribute: `aria-activedescendant`
     */
    ariaActiveDescendant: string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#listbox} for more information
     * @public
     * @remarks
     * HTML Attribute: `aria-disabled`
     */
    ariaDisabled: "true" | "false" | string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#listbox} for more information
     * @public
     * @remarks
     * HTML Attribute: `aria-expanded`
     */
    ariaExpanded: "true" | "false" | string | null;
    /**
     * See {@link https://w3c.github.io/aria/#listbox} for more information
     * @public
     * @remarks
     * HTML Attribute: `aria-multiselectable`
     */
    ariaMultiSelectable: "true" | "false" | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIAListbox extends ARIAGlobalStatesAndProperties {
}

/**
 * States and properties relating to the ARIA `option` role.
 *
 * @public
 */
export declare class DelegatesARIAListboxOption {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
     * @public
     * @remarks
     * HTML Attribute: `aria-checked`
     */
    ariaChecked: "true" | "false" | string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
     * @public
     * @remarks
     * HTML Attribute: `aria-posinset`
     */
    ariaPosInSet: string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
     * @public
     * @remarks
     * HTML Attribute: `aria-selected`
     */
    ariaSelected: "true" | "false" | string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#option} for more information.
     * @public
     * @remarks
     * HTML Attribute: `aria-setsize`
     */
    ariaSetSize: string | null;
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
export declare interface DelegatesARIAListboxOption extends ARIAGlobalStatesAndProperties {
}

/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
export declare class DelegatesARIASearch {
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIASearch extends ARIAGlobalStatesAndProperties {
}

/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export declare class DelegatesARIASelect {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#combobox} for more information
     * @public
     * @remarks
     * HTML Attribute: `aria-controls`
     */
    ariaControls: string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIASelect extends DelegatesARIAListbox {
}

/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
export declare class DelegatesARIATextbox {
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIATextbox extends ARIAGlobalStatesAndProperties {
}

/**
 * Includes ARIA states and properties relating to the ARIA toolbar role
 *
 * @public
 */
export declare class DelegatesARIAToolbar {
    /**
     * The id of the element labeling the toolbar.
     * @public
     * @remarks
     * HTML Attribute: aria-labelledby
     */
    ariaLabelledby: string | null;
    /**
     * The label surfaced to assistive technologies.
     *
     * @public
     * @remarks
     * HTML Attribute: aria-label
     */
    ariaLabel: string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface DelegatesARIAToolbar extends ARIAGlobalStatesAndProperties {
}

/**
 * A {@link (DesignToken:interface)} value that is derived. These values can depend on other {@link (DesignToken:interface)}s
 * or arbitrary observable properties.
 * @public
 */
export declare type DerivedDesignTokenValue<T> = T extends Function ? never : (target: HTMLElement) => T;

/**
 * Represents a configurable design system.
 * @public
 */
export declare interface DesignSystem {
    /**
     * Registers components and services with the design system and the
     * underlying dependency injection container.
     * @param params - The registries to pass to the design system
     * and the underlying dependency injection container.
     * @public
     */
    register(...params: any[]): DesignSystem;
    /**
     * Configures the prefix to add to each custom element name.
     * @param prefix - The prefix to use for custom elements.
     * @public
     */
    withPrefix(prefix: string): DesignSystem;
    /**
     * Overrides the default Shadow DOM mode for custom elements.
     * @param mode - The Shadow DOM mode to use for custom elements.
     * @public
     */
    withShadowRootMode(mode: ShadowRootMode): DesignSystem;
    /**
     * Provides a custom callback capable of resolving scenarios where
     * two different elements request the same element name.
     * @param callback - The disambiguation callback.
     * @public
     */
    withElementDisambiguation(callback: ElementDisambiguationCallback): DesignSystem;
    /**
     * Overrides the {@link (DesignToken:interface)} root, controlling where
     * {@link (DesignToken:interface)} default value CSS custom properties
     * are emitted.
     *
     * Providing `null` disables automatic DesignToken registration.
     * @param root - the root to register
     * @public
     */
    withDesignTokenRoot(root: HTMLElement | Document | null): DesignSystem;
}

/**
 * An API gateway to design system features.
 * @public
 */
export declare const DesignSystem: Readonly<{
    /**
     * Returns the HTML element name that the type is defined as.
     * @param type - The type to lookup.
     * @public
     */
    tagFor(type: Constructable): string;
    /**
     * Searches the DOM hierarchy for the design system that is responsible
     * for the provided element.
     * @param element - The element to locate the design system for.
     * @returns The located design system.
     * @public
     */
    responsibleFor(element: HTMLElement): DesignSystem;
    /**
     * Gets the DesignSystem if one is explicitly defined on the provided element;
     * otherwise creates a design system defined directly on the element.
     * @param element - The element to get or create a design system for.
     * @returns The design system.
     * @public
     */
    getOrCreate(node?: Node | undefined): DesignSystem;
}>;

/**
 * Design system contextual APIs and configuration usable within component
 * registries.
 * @public
 */
export declare interface DesignSystemRegistrationContext {
    /**
     * The element prefix specified by the design system's configuration.
     * @public
     */
    readonly elementPrefix: string;
    /**
     * Used to attempt to define a custom element.
     * @param name - The name of the element to define.
     * @param type - The type of the constructor to use to define the element.
     * @param callback - A callback to invoke if definition will happen.
     * @public
     * @deprecated - Use the signature with the ElementDefinitionParams param type instead
     */
    tryDefineElement(name: string, type: Constructable, callback: ElementDefinitionCallback): void;
    /**
     * Used to attempt to define a custom element.
     * @param params - The custom element definition.
     * @public
     */
    tryDefineElement(params: ElementDefinitionParams): void;
}

/**
 * Describes a DesignToken instance.
 * @public
 */
export declare interface DesignToken<T extends string | number | boolean | BigInteger | null | Array<any> | symbol | {}> {
    /**
     * The name of the token
     */
    readonly name: string;
    /**
     * A list of elements for which the DesignToken has a value set
     */
    readonly appliedTo: HTMLElement[];
    /**
     * Get the token value for an element.
     * @param element - The element to get the value for
     * @returns - The value set for the element, or the value set for the nearest element ancestor.
     */
    getValueFor(element: HTMLElement): StaticDesignTokenValue<T>;
    /**
     * Sets the token to a value for an element.
     * @param element - The element to set the value for.
     * @param value - The value.
     */
    setValueFor(element: HTMLElement, value: DesignTokenValue<T> | DesignToken<T>): void;
    /**
     * Removes a value set for an element.
     * @param element - The element to remove the value from
     */
    deleteValueFor(element: HTMLElement): this;
    /**
     * Associates a default value to the token
     */
    withDefault(value: DesignTokenValue<T> | DesignToken<T>): this;
    /**
     * Subscribes a subscriber to change records for a token. If an element is provided, only
     * change records for that element will be emitted.
     */
    subscribe(subscriber: DesignTokenSubscriber<this>, target?: HTMLElement): void;
    /**
     * Unsubscribes a subscriber from change records for a token.
     */
    unsubscribe(subscriber: DesignTokenSubscriber<this>, target?: HTMLElement): void;
}

/**
 * Factory object for creating {@link (DesignToken:interface)} instances.
 * @public
 */
export declare const DesignToken: Readonly<{
    create: typeof create;
    /**
     * Informs DesignToken that an HTMLElement for which tokens have
     * been set has been connected to the document.
     *
     * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
     * in all scenarios, so invoking this method manually is necessary when:
     *
     * 1. Token values are set for an HTMLElement.
     * 2. The HTMLElement does not inherit from FASTElement.
     * 3. The HTMLElement is not connected to the document when token values are set.
     *
     * @param element - The element to notify
     * @returns - true if notification was successful, otherwise false.
     */
    notifyConnection(element: HTMLElement): boolean;
    /**
     * Informs DesignToken that an HTMLElement for which tokens have
     * been set has been disconnected to the document.
     *
     * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
     * in all scenarios, so invoking this method manually is necessary when:
     *
     * 1. Token values are set for an HTMLElement.
     * 2. The HTMLElement does not inherit from FASTElement.
     *
     * @param element - The element to notify
     * @returns - true if notification was successful, otherwise false.
     */
    notifyDisconnection(element: HTMLElement): boolean;
    /**
     * Registers and element or document as a DesignToken root.
     * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
     * {@link (DesignToken:interface).withDefault} will emit CSS custom properties to all
     * registered roots.
     * @param target - The root to register
     */
    registerRoot(target?: HTMLElement | Document): void;
    /**
     * Unregister an element or document as a DesignToken root.
     * @param target - The root to deregister
     */
    unregisterRoot(target?: HTMLElement | Document): void;
}>;

/**
 * Change record provided to to a {@link DesignTokenSubscriber} when a token changes for a target.
 * @public
 */
export declare interface DesignTokenChangeRecord<T extends DesignToken<any>> {
    /**
     * The element for which the value was changed
     */
    target: HTMLElement;
    /**
     * The token that was changed
     */
    token: T;
}

/**
 * Describes a {@link (DesignToken:interface)} configuration
 * @public
 */
export declare interface DesignTokenConfiguration {
    /**
     * The name of the {@link (DesignToken:interface)}.
     */
    name: string;
    /**
     * The name of the CSS custom property to associate to the {@link (DesignToken:interface)}, or null
     * if not CSS custom property should be associated.
     */
    cssCustomPropertyName?: string | null;
}

/**
 * A subscriber that should receive {@link DesignTokenChangeRecord | change records} when a token changes for a target
 * @public
 */
export declare interface DesignTokenSubscriber<T extends DesignToken<any>> {
    handleChange(record: DesignTokenChangeRecord<T>): void;
}

/**
 * The type that a {@link (DesignToken:interface)} can be set to.
 * @public
 */
export declare type DesignTokenValue<T> = StaticDesignTokenValue<T> | DerivedDesignTokenValue<T>;

/**
 * The gateway to dependency injection APIs.
 * @public
 */
export declare const DI: Readonly<{
    /**
     * Creates a new dependency injection container.
     * @param config - The configuration for the container.
     * @returns A newly created dependency injection container.
     */
    createContainer(config?: Partial<ContainerConfiguration> | undefined): Container;
    /**
     * Finds the dependency injection container responsible for providing dependencies
     * to the specified node.
     * @param node - The node to find the responsible container for.
     * @returns The container responsible for providing dependencies to the node.
     * @remarks
     * This will be the same as the parent container if the specified node
     * does not itself host a container configured with responsibleForOwnerRequests.
     */
    findResponsibleContainer(node: Node): Container;
    /**
     * Find the dependency injection container up the DOM tree from this node.
     * @param node - The node to find the parent container for.
     * @returns The parent container of this node.
     * @remarks
     * This will be the same as the responsible container if the specified node
     * does not itself host a container configured with responsibleForOwnerRequests.
     */
    findParentContainer(node: Node): Container;
    /**
     * Returns a dependency injection container if one is explicitly owned by the specified
     * node. If one is not owned, then a new container is created and assigned to the node.
     * @param node - The node to find or create the container for.
     * @param config - The configuration for the container if one needs to be created.
     * @returns The located or created container.
     * @remarks
     * This API does not search for a responsible or parent container. It looks only for a container
     * directly defined on the specified node and creates one at that location if one does not
     * already exist.
     */
    getOrCreateDOMContainer(node?: Node | undefined, config?: Partial<Omit<ContainerConfiguration, "parentLocator">> | undefined): Container;
    /**
     * Gets the "design:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or undefined if no metadata is found.
     */
    getDesignParamtypes: (Type: Constructable | Injectable) => readonly Key[] | undefined;
    /**
     * Gets the "di:paramtypes" metadata for the specified type.
     * @param Type - The type to get the metadata for.
     * @returns The metadata array or undefined if no metadata is found.
     */
    getAnnotationParamtypes: (Type: Constructable | Injectable) => readonly Key[] | undefined;
    /**
     *
     * @param Type - Gets the "di:paramtypes" metadata for the specified type. If none is found,
     * an empty metadata array is created and added.
     * @returns The metadata array.
     */
    getOrCreateAnnotationParamTypes(Type: Constructable | Injectable): Key[];
    /**
     * Gets the dependency keys representing what is needed to instantiate the specified type.
     * @param Type - The type to get the dependencies for.
     * @returns An array of dependency keys.
     */
    getDependencies(Type: Constructable | Injectable): Key[];
    /**
     * Defines a property on a web component class. The value of this property will
     * be resolved from the dependency injection container responsible for the element
     * instance, based on where it is connected in the DOM.
     * @param target - The target to define the property on.
     * @param propertyName - The name of the property to define.
     * @param key - The dependency injection key.
     * @param respectConnection - Indicates whether or not to update the property value if the
     * hosting component is disconnected and then re-connected at a different location in the DOM.
     * @remarks
     * The respectConnection option is only applicable to elements that descend from FASTElement.
     */
    defineProperty(target: {}, propertyName: string, key: Key, respectConnection?: boolean): void;
    /**
     * Creates a dependency injection key.
     * @param nameConfigOrCallback - A friendly name for the key or a lambda that configures a
     * default resolution for the dependency.
     * @param configuror - If a friendly name was provided for the first parameter, then an optional
     * lambda that configures a default resolution for the dependency can be provided second.
     * @returns The created key.
     * @remarks
     * The created key can be used as a property decorator or constructor parameter decorator,
     * in addition to its standard use in an inject array or through direct container APIs.
     */
    createInterface<K extends Key>(nameConfigOrCallback?: string | InterfaceConfiguration | ((builder: ResolverBuilder<K>) => Resolver<K>) | undefined, configuror?: ((builder: ResolverBuilder<K>) => Resolver<K>) | undefined): InterfaceSymbol<K>;
    /**
     * A decorator that specifies what to inject into its target.
     * @param dependencies - The dependencies to inject.
     * @returns The decorator to be applied to the target class.
     * @remarks
     * The decorator can be used to decorate a class, listing all of the classes dependencies.
     * Or it can be used to decorate a constructor paramter, indicating what to inject for that
     * parameter.
     * Or it can be used for a web component property, indicating what that property should resolve to.
     */
    inject(...dependencies: Key[]): (target: any, key?: string | number | undefined, descriptor?: number | PropertyDescriptor | undefined) => void;
    /**
     * Registers the `target` class as a transient dependency; each time the dependency is resolved
     * a new instance will be created.
     *
     * @param target - The class / constructor function to register as transient.
     * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
     *
     * @example
     * On an existing class
     * ```ts
     * class Foo { }
     * DI.transient(Foo);
     * ```
     *
     * @example
     * Inline declaration
     *
     * ```ts
     * const Foo = DI.transient(class { });
     * // Foo is now strongly typed with register
     * Foo.register(container);
     * ```
     *
     * @public
     */
    transient<T extends Constructable<{}>>(target: T & Partial<RegisterSelf<T>>): T & RegisterSelf<T>;
    /**
     * Registers the `target` class as a singleton dependency; the class will only be created once. Each
     * consecutive time the dependency is resolved, the same instance will be returned.
     *
     * @param target - The class / constructor function to register as a singleton.
     * @returns The same class, with a static `register` method that takes a container and returns the appropriate resolver.
     * @example
     * On an existing class
     * ```ts
     * class Foo { }
     * DI.singleton(Foo);
     * ```
     *
     * @example
     * Inline declaration
     * ```ts
     * const Foo = DI.singleton(class { });
     * // Foo is now strongly typed with register
     * Foo.register(container);
     * ```
     *
     * @public
     */
    singleton<T_1 extends Constructable<{}>>(target: T_1 & Partial<RegisterSelf<T_1>>, options?: SingletonOptions): T_1 & RegisterSelf<T_1>;
}>;

/**
 * A Switch Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#dialog | ARIA dialog }.
 *
 * @slot - The default slot for the dialog content
 * @csspart positioning-region - A wrapping element used to center the dialog and position the modal overlay
 * @csspart overlay - The modal dialog overlay
 * @csspart control - The dialog element
 * @fires cancel - Fires a custom 'cancel' event when the modal overlay is clicked
 * @fires close - Fires a custom 'close' event when the dialog is hidden
 *
 * @public
 */
export declare class Dialog extends FoundationElement {
    /**
     * Indicates the element is modal. When modal, user mouse interaction will be limited to the contents of the element by a modal
     * overlay.  Clicks on the overlay will cause the dialog to emit a "dismiss" event.
     * @public
     * @defaultValue - true
     * @remarks
     * HTML Attribute: modal
     */
    modal: boolean;
    /**
     * The hidden state of the element.
     *
     * @public
     * @defaultValue - false
     * @remarks
     * HTML Attribute: hidden
     */
    hidden: boolean;
    /**
     * Indicates that the dialog should trap focus.
     *
     * @public
     * @defaultValue - true
     * @remarks
     * HTML Attribute: trap-focus
     */
    trapFocus: boolean;
    private trapFocusChanged;
    /**
     * The id of the element describing the dialog.
     * @public
     * @remarks
     * HTML Attribute: aria-describedby
     */
    ariaDescribedby: string;
    /**
     * The id of the element labeling the dialog.
     * @public
     * @remarks
     * HTML Attribute: aria-labelledby
     */
    ariaLabelledby: string;
    /**
     * The label surfaced to assistive technologies.
     *
     * @public
     * @remarks
     * HTML Attribute: aria-label
     */
    ariaLabel: string;
    /**
     * @internal
     */
    dialog: HTMLDivElement;
    /**
     * @internal
     */
    private isTrappingFocus;
    /**
     * @internal
     */
    private notifier;
    /**
     * @internal
     */
    dismiss(): void;
    /**
     * The method to show the dialog.
     *
     * @public
     */
    show(): void;
    /**
     * The method to hide the dialog.
     *
     * @public
     */
    hide(): void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleChange(source: any, propertyName: string): void;
    private handleDocumentKeydown;
    private handleDocumentFocus;
    private handleTabKeyDown;
    private getTabQueueBounds;
    /**
     * focus on first element of tab queue
     */
    private focusFirstElement;
    /**
     * we should only focus if focus has not already been brought to the dialog
     */
    private shouldForceFocus;
    /**
     * we should we be active trapping focus
     */
    private shouldTrapFocus;
    /**
     *
     *
     * @internal
     */
    private updateTrapFocus;
    /**
     * Reduce a collection to only its focusable elements.
     *
     * @param elements - Collection of elements to reduce
     * @param element - The current element
     *
     * @internal
     */
    private static reduceTabbableItems;
    /**
     * Test if element is focusable fast element
     *
     * @param element - The element to check
     *
     * @internal
     */
    private static isFocusableFastElement;
    /**
     * Test if the element has a focusable shadow
     *
     * @param element - The element to check
     *
     * @internal
     */
    private static hasTabbableShadow;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Dialog} component.
 * @public
 */
export declare const dialogTemplate: FoundationElementTemplate<ViewTemplate<Dialog>>;

/**
 * The CSS value for disabled cursors.
 * @public
 */
export declare const disabledCursor = "not-allowed";

/**
 * A Disclosure Custom HTML Element.
 * Based largely on the {@link https://w3c.github.io/aria-practices/#disclosure | disclosure element }.
 *
 * @slot start - Content which can be provided before the summary content
 * @slot end - Content which can be provided after the summary content
 * @slot title - The summary content
 * @slot - The default slot for the disclosure content
 * @fires toggle - fires a toggle event when the summary is toggled
 *
 * @public
 */
export declare class Disclosure extends FoundationElement {
    /**
     * Determines if the element should show the extra content or not.
     *
     * @public
     */
    expanded: boolean;
    /**
     * Invoker title
     *
     * @public
     */
    title: string;
    /**
     * @internal
     */
    details: HTMLDetailsElement;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Show extra content.
     */
    show(): void;
    /**
     * Hide extra content.
     */
    hide(): void;
    /**
     * Toggle the current(expanded/collapsed) state.
     */
    toggle(): void;
    /**
     * Register listener and set default disclosure mode
     */
    protected setup(): void;
    /**
     * Update the aria attr and fire `toggle` event
     */
    protected onToggle(): void;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Disclosure} component.
 * @public
 */
export declare const disclosureTemplate: FoundationElementTemplate<ViewTemplate<Disclosure>>;

/**
 * Applies a CSS display property.
 * Also adds CSS rules to not display the element when the [hidden] attribute is applied to the element.
 * @param display - The CSS display property value
 * @public
 */
export declare function display(displayValue: CSSDisplayPropertyValue): string;

/**
 * A Divider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#separator | ARIA separator } or {@link https://www.w3.org/TR/wai-aria-1.1/#presentation | ARIA presentation}.
 *
 * @public
 */
export declare class Divider extends FoundationElement {
    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    role: DividerRole;
    /**
     * The orientation of the divider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: Orientation;
}

/**
 * Divider roles
 * @public
 */
export declare const DividerRole: {
    /**
     * The divider semantically separates content
     */
    readonly separator: "separator";
    /**
     * The divider has no semantic value and is for visual presentation only.
     */
    readonly presentation: "presentation";
};

/**
 * The types for Divider roles
 * @public
 */
export declare type DividerRole = typeof DividerRole[keyof typeof DividerRole];

/**
 * The template for the {@link @microsoft/fast-foundation#Divider} component.
 * @public
 */
export declare const dividerTemplate: FoundationElementTemplate<ViewTemplate<Divider>>;

declare type EagerOrLazyFoundationOption<T, K extends FoundationElementDefinition> = T | LazyFoundationOption<T, K>;

/**
 * The callback type that is invoked when an element can be defined by a design system.
 * @public
 */
export declare type ElementDefinitionCallback = (ctx: ElementDefinitionContext) => void;

/**
 * The design system context in which an element can be defined.
 * @public
 */
export declare interface ElementDefinitionContext {
    /**
     * The name that the element will be defined as.
     * @public
     */
    readonly name: string;
    /**
     * The type that will be defined.
     * @public
     */
    readonly type: Constructable;
    /**
     * The dependency injection container associated with the design system.
     * @public
     */
    readonly container: Container;
    /**
     * Indicates whether or not a platform define call will be made in order
     * to define the element.
     * @public
     */
    readonly willDefine: boolean;
    /**
     * The shadow root mode specified by the design system's configuration.
     * @public
     */
    readonly shadowRootMode: ShadowRootMode | undefined;
    /**
     * Defines the element.
     * @param definition - The definition for the element.
     * @public
     */
    defineElement(definition?: ContextualElementDefinition): void;
    /**
     * Defines a presentation for the element.
     * @param presentation - The presentation configuration.
     * @public
     */
    definePresentation(presentation: ComponentPresentation): void;
    /**
     * Returns the HTML element tag name that the type will be defined as.
     * @param type - The type to lookup.
     * @public
     */
    tagFor(type: Constructable): string;
}

/**
 * The element definition context interface. Designed to be used in `tryDefineElement`
 * @public
 */
export declare interface ElementDefinitionParams extends Pick<ElementDefinitionContext, "name" | "type"> {
    /**
     * FAST actual base class instance.
     * @public
     */
    readonly baseClass?: Constructable;
    /**
     * A callback to invoke if definition will happen.
     * @public
     */
    callback: ElementDefinitionCallback;
}

/**
 * Indicates what to do with an ambiguous (duplicate) element.
 * @public
 */
export declare const ElementDisambiguation: Readonly<{
    /**
     * Skip defining the element but still call the provided callback passed
     * to DesignSystemRegistrationContext.tryDefineElement
     */
    definitionCallbackOnly: null;
    /**
     * Ignore the duplicate element entirely.
     */
    ignoreDuplicate: symbol;
}>;

/**
 * The callback type that is invoked when two elements are trying to define themselves with
 * the same name.
 * @remarks
 * The callback should return either:
 * 1. A string to provide a new name used to disambiguate the element
 * 2. ElementDisambiguation.ignoreDuplicate to ignore the duplicate element entirely
 * 3. ElementDisambiguation.definitionCallbackOnly to skip defining the element but still
 * call the provided callback passed to DesignSystemRegistrationContext.tryDefineElement
 * @public
 */
export declare type ElementDisambiguationCallback = (nameAttempt: string, typeAttempt: Constructable, existingType: Constructable) => ElementDisambiguationResult;

/**
 * Represents the return values expected from an ElementDisambiguationCallback.
 * @public
 */
export declare type ElementDisambiguationResult = string | typeof ElementDisambiguation.ignoreDuplicate | typeof ElementDisambiguation.definitionCallbackOnly;

/**
 * Source:
 * https://html.spec.whatwg.org/multipage/custom-elements.html#elementinternals
 */
declare interface ElementInternals_2 {
    /**
     * Returns the form owner of internals target element.
     */
    readonly form: HTMLFormElement | null;
    /**
     * Returns a NodeList of all the label elements that internals target element is associated with.
     */
    readonly labels: NodeList;
    /**
     * Returns the error message that would be shown to the user if internals target element was to be checked for validity.
     */
    readonly validationMessage: string;
    /**
     * Returns the ValidityState object for internals target element.
     */
    readonly validity: ValidityState;
    /**
     * Returns true if internals target element will be validated when the form is submitted; false otherwise.
     */
    readonly willValidate: boolean;
    /**
     * Returns true if internals target element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.
     */
    checkValidity(): boolean;
    /**
     * Returns true if internals target element has no validity problems; otherwise,
     * returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user.
     */
    reportValidity(): boolean;
    /**
     * Sets both the state and submission value of internals target element to value.
     *
     * While "null" isn't enumerated as a argument type (here)[https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface],
     * In practice it appears to remove the value from the form data on submission. Adding it as a valid type here
     * becuase that capability is required for checkbox and radio types
     */
    setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null): void;
    /**
     * Marks internals target element as suffering from the constraints indicated by the flags argument,
     * and sets the element's validation message to message.
     * If anchor is specified, the user agent might use
     * it to indicate problems with the constraints of internals target
     * element when the form owner is validated interactively or reportValidity() is called.
     */
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}

declare let ElementInternals_2: {
    prototype: ElementInternals_2;
    new (): ElementInternals_2;
};

/**
 * End configuration options
 * @public
 */
export declare type EndOptions = {
    end?: string | SyntheticViewTemplate;
};

/**
 * The template for the end element.
 * For use with {@link StartEnd}
 *
 * @public
 */
export declare const endSlotTemplate: (context: ElementDefinitionContext, definition: EndOptions) => ViewTemplate<StartEnd>;

/**
 * The template for the end element.
 * For use with {@link StartEnd}
 *
 * @public
 * @deprecated - use endSlotTemplate
 */
export declare const endTemplate: ViewTemplate<StartEnd>;

/**
 * Used by the default Resolver to create instances of objects when needed.
 * @public
 */
export declare interface Factory<T extends Constructable = any> {
    /**
     * The concrete type this factory creates.
     */
    readonly Type: T;
    /**
     * Registers a transformer function to alter the object after instantiation but before
     * returning the final constructed instance.
     * @param transformer - The transformer function.
     */
    registerTransformer(transformer: Transformer_2<T>): void;
    /**
     * Constructs an instance of the factory's object.
     * @param container - The container the object is being constructor for.
     * @param dynamicDependencies - Dynamic dependencies supplied to the constructor.
     */
    construct(container: Container, dynamicDependencies?: Key[]): Resolved<T>;
}

/** @internal */
export declare class FactoryImpl<T extends Constructable = any> implements Factory<T> {
    Type: T;
    private readonly dependencies;
    private transformers;
    constructor(Type: T, dependencies: Key[]);
    construct(container: Container, dynamicDependencies?: Key[]): Resolved<T>;
    registerTransformer(transformer: (instance: any) => any): void;
}

/**
 * A Flipper Custom HTML Element.
 * Flippers are a form of button that implies directional content navigation, such as in a carousel.
 *
 * @slot next - The next flipper content
 * @slot previous - The previous flipper content
 * @csspart next - Wraps the next flipper content
 * @csspart previous - Wraps the previous flipper content
 * @fires click - Fires a custom 'click' event when Enter or Space is invoked via keyboard and the flipper is exposed to assistive technologies.
 *
 * @public
 */
export declare class Flipper extends FoundationElement {
    /**
     * The disabled state of the flipper.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     * Indicates the flipper should be hidden from assistive technology. Because flippers are often supplementary navigation, they are often hidden from assistive technology.
     *
     * @public
     * @defaultValue - true
     * @remarks
     * HTML Attribute: aria-hidden
     */
    hiddenFromAT: boolean;
    /**
     * The direction that the flipper implies navigating.
     *
     * @public
     * @remarks
     * HTML Attribute: direction
     */
    direction: FlipperDirection;
    /**
     * Simulate a click event when the flipper has focus and the user hits enter or space keys
     * Blur focus if the user hits escape key
     * @param e - Keyboard event
     * @public
     */
    keyupHandler(e: Event & KeyboardEvent): void;
}

/**
 * The direction options for flipper.
 * @public
 */
export declare const FlipperDirection: {
    readonly next: "next";
    readonly previous: "previous";
};

/**
 * The types for the flipper direction options.
 * @public
 */
export declare type FlipperDirection = typeof FlipperDirection[keyof typeof FlipperDirection];

/**
 * Flipper configuration options
 * @public
 */
export declare type FlipperOptions = FoundationElementDefinition & {
    next?: string | SyntheticViewTemplate;
    previous?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#Flipper} component.
 * @public
 */
export declare const flipperTemplate: FoundationElementTemplate<ViewTemplate<Flipper>, FlipperOptions>;

/**
 * A region that always places itself below the anchor, has
 * a width to match the anchor, and is sized vertically by content
 *
 * @public
 */
export declare const FlyoutPosBottom: AnchoredRegionConfig;

/**
 * A region that always places itself below the anchor, has
 * a width to match the anchor, and is sized vertically by available space
 *
 * @public
 */
export declare const FlyoutPosBottomFill: AnchoredRegionConfig;

/**
 * A region that places itself above or below the anchor
 * based on available space, has a width to match the anchor,
 * and is sized vertically by content
 *
 * @public
 */
export declare const FlyoutPosTallest: AnchoredRegionConfig;

/**
 * A region that places itself above or below the anchor
 * based on available space, has a width to match the anchor,
 * and is sized vertically by available space
 *
 * @public
 */
export declare const FlyoutPosTallestFill: AnchoredRegionConfig;

/**
 * A region that always places itself above the anchor, has
 * a width to match the anchor, and is sized vertically by content
 *
 * @public
 */
export declare const FlyoutPosTop: AnchoredRegionConfig;

/**
 * A region that always places itself above the anchor, has
 * a width to match the anchor, and is sized vertically by available space
 *
 * @public
 */
export declare const FlyoutPosTopFill: AnchoredRegionConfig;

/**
 * The string representing the focus selector to be used. Value
 * will be "focus-visible" when https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
 * is supported and "focus" when it is not.
 *
 * @public
 */
export declare const focusVisible: string;

/**
 * This can be used to construct a behavior to apply a forced-colors only stylesheet.
 * @public
 */
export declare const forcedColorsStylesheetBehavior: (styles: ElementStyles) => MatchMediaStyleSheetBehavior;

/**
 * Base function for providing Custom Element Form Association.
 *
 * @alpha
 */
export declare function FormAssociated<T extends ConstructableFormAssociated>(BaseCtor: T): T;

/**
 * Base class for providing Custom Element Form Association.
 *
 * @alpha
 */
export declare interface FormAssociated extends Omit<ElementInternals_2, "labels"> {
    dirtyValue: boolean;
    disabled: boolean;
    readonly elementInternals: ElementInternals_2 | null;
    readonly formAssociated: boolean;
    initialValue: string;
    readonly labels: ReadonlyArray<Node[]>;
    name: string;
    required: boolean;
    value: string;
    currentValue: string;
    attachProxy(): void;
    detachProxy(): void;
    disabledChanged?(previous: boolean, next: boolean): void;
    formDisabledCallback?(disabled: boolean): void;
    formResetCallback(): void;
    initialValueChanged?(previous: string, next: string): void;
    nameChanged?(previous: string, next: string): void;
    requiredChanged(prev: boolean, next: boolean): void;
    stopPropagation(e: Event): void;
    /**
     * Sets the validity of the custom element. By default this uses the proxy element to determine
     * validity, but this can be extended or replaced in implementation.
     *
     * @param anchor - The anchor element to provide to ElementInternals.setValidity for surfacing the browser's constraint validation UI
     */
    validate(anchor?: HTMLElement): void;
    valueChanged(previous: string, next: string): void;
}

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Button:class)} component.
 *
 * @internal
 */
declare class FormAssociatedButton extends FormAssociatedButton_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedButton_base: typeof _Button;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Checkbox:class)} component.
 *
 * @internal
 */
declare class FormAssociatedCheckbox extends FormAssociatedCheckbox_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedCheckbox_base: typeof _Checkbox;

/**
 * A form-associated base class for the {@link (Combobox:class)} component.
 *
 * @internal
 */
declare class FormAssociatedCombobox extends FormAssociatedCombobox_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedCombobox_base: typeof _Combobox;

/**
 * Combined type to describe a Form-associated element.
 *
 * @alpha
 */
export declare type FormAssociatedElement = FormAssociated & FASTElement & HTMLElement & FormAssociatedProxy;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(NumberField:class)} component.
 *
 * @internal
 */
declare class FormAssociatedNumberField extends FormAssociatedNumberField_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedNumberField_base: typeof _NumberField;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Picker:class)} component.
 *
 * @internal
 */
declare class FormAssociatedPicker extends FormAssociatedPicker_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedPicker_base: typeof _Picker;

/**
 * Identifies a class as having a proxy element and optional submethods related
 * to the proxy element.
 *
 * @alpha
 */
export declare interface FormAssociatedProxy {
    proxy: ProxyElement;
    disabledChanged?(previous: boolean, next: boolean): void;
    formDisabledCallback?(disabled: boolean): void;
    formResetCallback?(): void;
    initialValueChanged?(previous: string, next: string): void;
    valueChanged?(previous: string, next: string): void;
    nameChanged?(previous: string, next: string): void;
}

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Radio:class)} component.
 *
 * @internal
 */
declare class FormAssociatedRadio extends FormAssociatedRadio_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedRadio_base: typeof _Radio;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Search:class)} component.
 *
 * @internal
 */
declare class FormAssociatedSearch extends FormAssociatedSearch_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedSearch_base: typeof _Search;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Select:class)} component.
 *
 * @internal
 */
declare class FormAssociatedSelect extends FormAssociatedSelect_base {
    proxy: HTMLSelectElement;
}

declare const FormAssociatedSelect_base: typeof _Select;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Slider:class)} component.
 *
 * @internal
 */
declare class FormAssociatedSlider extends FormAssociatedSlider_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedSlider_base: typeof _Slider;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Switch:class)} component.
 *
 * @internal
 */
declare class FormAssociatedSwitch extends FormAssociatedSwitch_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedSwitch_base: typeof _Switch;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(TextArea:class)} component.
 *
 * @internal
 */
declare class FormAssociatedTextArea extends FormAssociatedTextArea_base {
    proxy: HTMLTextAreaElement;
}

declare const FormAssociatedTextArea_base: typeof _TextArea;

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(TextField:class)} component.
 *
 * @internal
 */
declare class FormAssociatedTextField extends FormAssociatedTextField_base {
    proxy: HTMLInputElement;
}

declare const FormAssociatedTextField_base: typeof _TextField;

/**
 * Defines a foundation element class that:
 * 1. Connects the element to its ComponentPresentation
 * 2. Allows resolving the element template from the instance or ComponentPresentation
 * 3. Allows resolving the element styles from the instance or ComponentPresentation
 *
 * @public
 */
export declare class FoundationElement extends FASTElement {
    private _presentation;
    /**
     * A property which resolves the ComponentPresentation instance
     * for the current component.
     * @public
     */
    protected get $presentation(): ComponentPresentation | null;
    /**
     * Sets the template of the element instance. When undefined,
     * the element will attempt to resolve the template from
     * the associated presentation or custom element definition.
     * @public
     */
    template: ElementViewTemplate | void | null;
    protected templateChanged(): void;
    /**
     * Sets the default styles for the element instance. When undefined,
     * the element will attempt to resolve default styles from
     * the associated presentation or custom element definition.
     * @public
     */
    styles: ElementStyles | void | null;
    protected stylesChanged(): void;
    /**
     * The connected callback for this FASTElement.
     * @remarks
     * This method is invoked by the platform whenever this FoundationElement
     * becomes connected to the document.
     * @public
     */
    connectedCallback(): void;
    /**
     * Defines an element registry function with a set of element definition defaults.
     * @param elementDefinition - The definition of the element to create the registry
     * function for.
     * @public
     */
    static compose<T extends FoundationElementDefinition = FoundationElementDefinition, K extends Constructable<FoundationElement> = Constructable<FoundationElement>>(this: K, elementDefinition: T): (overrideDefinition?: OverrideFoundationElementDefinition<T>) => FoundationElementRegistry<T, K>;
}

/**
 * An element definition used to define a FoundationElement when registered through the design
 * system registry.
 * @public
 */
export declare interface FoundationElementDefinition {
    /**
     * The non-prefixed name of the component.
     */
    baseName: string;
    /**
     * The actual FAST base class of the component if different from the class used to compose.
     */
    baseClass?: Constructable;
    /**
     * The template to render for the custom element.
     */
    readonly template?: EagerOrLazyFoundationOption<ElementViewTemplate, this>;
    /**
     * The styles to associate with the custom element.
     */
    readonly styles?: EagerOrLazyFoundationOption<ComposableStyles | ComposableStyles[], this>;
    /**
     * The custom attributes of the custom element.
     */
    readonly attributes?: EagerOrLazyFoundationOption<(AttributeConfiguration | string)[], this>;
    /**
     * Options controlling the creation of the custom element's shadow DOM.
     */
    readonly shadowOptions?: EagerOrLazyFoundationOption<Partial<ShadowRootInit> | null, this>;
    /**
     * Options controlling how the custom element is defined with the platform.
     */
    readonly elementOptions?: EagerOrLazyFoundationOption<ElementDefinitionOptions, this>;
}

/**
 * Registry capable of defining presentation properties for a DOM Container hierarchy.
 *
 * @internal
 */
export declare class FoundationElementRegistry<TDefinition extends FoundationElementDefinition, TType> implements Registry {
    readonly type: Constructable<FoundationElement>;
    private elementDefinition;
    private overrideDefinition;
    readonly definition: OverrideFoundationElementDefinition<TDefinition>;
    constructor(type: Constructable<FoundationElement>, elementDefinition: TDefinition, overrideDefinition: OverrideFoundationElementDefinition<TDefinition>);
    register(container: Container, context: DesignSystemRegistrationContext): void;
}

/**
 * A foundation element template function.
 * @public
 */
export declare type FoundationElementTemplate<T, K extends FoundationElementDefinition = FoundationElementDefinition> = LazyFoundationOption<T, K>;

/**
 * Enumerates the data grid auto generated header options
 * default option generates a non-sticky header row
 *
 * @public
 */
export declare const GenerateHeaderOptions: {
    readonly none: "none";
    readonly default: "default";
    readonly sticky: "sticky";
};

/**
 * The types for the data grid auto generated header options
 *
 * @public
 */
export declare type GenerateHeaderOptions = typeof GenerateHeaderOptions[keyof typeof GenerateHeaderOptions];

/**
 * a method to determine the current localization direction of the view
 * @param rootNode - the HTMLElement to begin the query from, usually "this" when used in a component controller
 * @public
 */
export declare const getDirection: (rootNode: HTMLElement) => Direction;

/**
 * A CSS fragment to set `display: none;` when the host is hidden using the [hidden] attribute.
 * @public
 */
export declare const hidden = ":host([hidden]){display:none}";

/**
 * Defines the horizontal positioning options for an anchored region
 *
 * @public
 */
export declare type HorizontalPosition = "start" | "end" | "left" | "right" | "center" | "unset";

/**
 * A HorizontalScroll Custom HTML Element
 *
 * @slot start - Content which can be provided before the scroll area
 * @slot end - Content which can be provided after the scroll area
 * @csspart scroll-area - Wraps the entire scrollable region
 * @csspart scroll-view - The visible scroll area
 * @csspart content-container - The container for the content
 * @csspart scroll-prev - The previous flipper container
 * @csspart scroll-action-previous - The element wrapping the previous flipper
 * @csspart scroll-next - The next flipper container
 * @csspart scroll-action-next - The element wrapping the next flipper
 * @fires scrollstart - Fires a custom 'scrollstart' event when scrolling
 * @fires scrollend - Fires a custom 'scrollend' event when scrolling stops
 *
 * @public
 */
export declare class HorizontalScroll extends FoundationElement {
    /**
     * Reference to DOM element that scrolls the content
     * @public
     */
    scrollContainer: HTMLDivElement;
    /**
     * Reference to DOM element that holds the slotted content
     * @public
     */
    content: HTMLDivElement;
    /**
     * Reference to flipper to scroll to previous content
     * @public
     */
    previousFlipperContainer: HTMLDivElement;
    /**
     * Reference to flipper to scroll to the next content
     * @public
     */
    nextFlipperContainer: HTMLDivElement;
    /**
     * @internal
     */
    private framesPerSecond;
    /**
     * The calculated duration for a frame.
     *
     * @internal
     */
    private get frameTime();
    /**
     * The timeout identifier for the scroll event throttling.
     *
     * @internal
     */
    private resizeTimeout?;
    /**
     * The timeout identifier for the scroll event throttling.
     *
     * @internal
     */
    private scrollTimeout?;
    /**
     * Flag indicating that the items are being updated
     *
     * @internal
     */
    private updatingItems;
    /**
     * Speed of scroll in pixels per second
     * @public
     */
    speed: number;
    /**
     * The CSS time value for the scroll transition duration. Overrides the `speed` attribute.
     *
     * @remarks
     * When `duration` is set, the `speed` attribute has no effect.
     *
     * @public
     */
    duration: string;
    /**
     * Attribute used for easing, defaults to ease-in-out
     * @public
     */
    easing: ScrollEasing;
    /**
     * Attribute to hide flippers from assistive technology
     * @public
     */
    flippersHiddenFromAT: boolean;
    /**
     * Scrolling state
     * @internal
     */
    private scrolling;
    /**
     * Firing scrollstart and scrollend events
     * @internal
     */
    scrollingChanged(prev: unknown, next: boolean): void;
    /**
     * Detects if the component has been resized
     * @internal
     */
    private resizeDetector;
    /**
     * Width of the parent container
     * @internal
     */
    private width;
    /**
     * Scroll stop positions between elements
     * @internal
     */
    private scrollStops;
    /**
     * The default slotted items placed in the scrolling container.
     *
     * @public
     */
    scrollItems: HTMLElement[];
    /**
     * In RTL mode
     * @internal
     */
    private get isRtl();
    /**
     * View: default | mobile
     * @public
     */
    view: HorizontalScrollView;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Updates scroll stops and flippers when scroll items change
     * @param previous - current scroll items
     * @param next - new updated scroll items
     * @public
     */
    scrollItemsChanged(previous: HTMLElement[], next: HTMLElement[]): void;
    /**
     * destroys the instance's resize observer
     * @internal
     */
    private disconnectResizeDetector;
    /**
     * initializes the instance's resize observer
     * @internal
     */
    private initializeResizeDetector;
    /**
     * Looks for slots and uses child nodes instead
     * @internal
     */
    private updateScrollStops;
    /**
     * Finds all of the scroll stops between elements
     * @internal
     */
    private setStops;
    /**
     * Checks to see if the stops are returning values
     *  otherwise it will try to reinitialize them
     *
     * @returns boolean indicating that current scrollStops are valid non-zero values
     * @internal
     */
    private validateStops;
    /**
     *
     */
    private fixScrollMisalign;
    /**
     * Sets the controls view if enabled
     * @internal
     */
    private setFlippers;
    /**
     * Function that can scroll an item into view.
     * @param item - An item index, a scroll item or a child of one of the scroll items
     * @param padding - Padding of the viewport where the active item shouldn't be
     * @param rightPadding - Optional right padding. Uses the padding if not defined
     *
     * @public
     */
    scrollInView(item: HTMLElement | number, padding?: number, rightPadding?: number): void;
    /**
     * Lets the user arrow left and right through the horizontal scroll
     * @param e - Keyboard event
     * @public
     */
    keyupHandler(e: Event & KeyboardEvent): void;
    /**
     * Scrolls items to the left
     * @public
     */
    scrollToPrevious(): void;
    /**
     * Scrolls items to the right
     * @public
     */
    scrollToNext(): void;
    /**
     * Handles scrolling with easing
     * @param position - starting position
     * @param newPosition - position to scroll to
     * @public
     */
    scrollToPosition(newPosition: number, position?: number): void;
    /**
     * Monitors resize event on the horizontal-scroll element
     * @public
     */
    resized(): void;
    /**
     * Monitors scrolled event on the content container
     * @public
     */
    scrolled(): void;
}

/**
 * Horizontal scroll configuration options
 * @public
 */
export declare type HorizontalScrollOptions = FoundationElementDefinition & StartEndOptions & {
    nextFlipper?: FoundationElementTemplate<SyntheticViewTemplate<any, HorizontalScroll>, HorizontalScrollOptions> | SyntheticViewTemplate | string;
    previousFlipper?: FoundationElementTemplate<SyntheticViewTemplate<any, HorizontalScroll>, HorizontalScrollOptions> | SyntheticViewTemplate | string;
};

/**
 * @public
 */
export declare const horizontalScrollTemplate: FoundationElementTemplate<ViewTemplate<HorizontalScroll>, HorizontalScrollOptions>;

/**
 * The views types for a horizontal-scroll {@link @microsoft/fast-foundation#(HorizontalScroll:class)}
 * @public
 */
export declare type HorizontalScrollView = "default" | "mobile";

/**
 * A decorator that tells the container not to try to inject a dependency.
 *
 * @public
 */
export declare function ignore(target: Injectable, property?: string | number, descriptor?: PropertyDescriptor | number): void;

/**
 * A decorator that specifies what to inject into its target.
 * @param dependencies - The dependencies to inject.
 * @returns The decorator to be applied to the target class.
 * @remarks
 * The decorator can be used to decorate a class, listing all of the classes dependencies.
 * Or it can be used to decorate a constructor paramter, indicating what to inject for that
 * parameter.
 * Or it can be used for a web component property, indicating what that property should resolve to.
 *
 * @public
 */
export declare const inject: (...dependencies: Key[]) => (target: any, key?: string | number | undefined, descriptor?: number | PropertyDescriptor | undefined) => void;

/**
 * A class that declares constructor injected dependencies through
 * a static "inject" field array of keys.
 * @public
 */
export declare type Injectable<T = {}> = Constructable<T> & {
    inject?: Key[];
};

/**
 * Interactive template using DataGrid
 * @param context - The templates context
 * @param todayString - string representation of todays date
 * @returns - interactive calendar template
 *
 * @internal
 */
export declare const interactiveCalendarGridTemplate: (context: ElementDefinitionContext, todayString: string) => ViewTemplate;

/**
 * Used to configure a dependency injection interface key.
 * @public
 */
export declare interface InterfaceConfiguration {
    /**
     * The friendly name for the interface. Useful for debugging.
     */
    friendlyName?: string;
    /**
     * When true, the dependency will be re-resolved when FASTElement connection changes.
     * If the resolved value changes due to connection change, a {@link @microsoft/fast-element#Observable | notification }
     * will be emitted for the property, with the previous and next values provided to any subscriber.
     */
    respectConnection?: boolean;
}

/**
 * A constant key that can be used to represent an interface to a registered dependency.
 * The key can be used in DI registrations but also doubles as a decorator for
 * resolving the associated, registered dependency.
 * @public
 */
export declare type InterfaceSymbol<K = any> = (target: any, property: string, index?: number) => void;

/**
 * Determines if the element is a {@link (ListboxOption:class)}
 *
 * @param element - the element to test.
 * @public
 */
export declare function isListboxOption(el: Element): el is ListboxOption;

/**
 * check if the item is a tree item
 * @public
 * @remarks
 * determines if element is an HTMLElement and if it has the role treeitem
 */
export declare function isTreeItemElement(el: Element): el is HTMLElement;

/**
 * A key that is used to register dependencies with a dependency injection container.
 * @public
 */
export declare type Key = PropertyKey | object | InterfaceSymbol | Constructable | Resolver;

/**
 * A decorator that lazily injects a dependency depending on whether the `Key` is present at the time of function call.
 *
 * @example
 * You need to make your argument a function that returns the type, for example
 * ```ts
 * class Foo {
 *   constructor( @lazy('random') public random: () => number )
 * }
 * const foo = container.get(Foo); // instanceof Foo
 * foo.random(); // throws
 * ```
 * would throw an exception because you haven't registered `'random'` before calling the method.
 * @example
 * This, would give you a new 'Math.random()' number each time.
 * ```ts
 * class Foo {
 *   constructor( @lazy('random') public random: () => random )
 * }
 * container.register(Registration.callback('random', Math.random ));
 * container.get(Foo).random(); // some random number
 * container.get(Foo).random(); // another random number
 * ```
 *
 * `@lazy` does not manage the lifecycle of the underlying key. If you want a singleton, you have to register as a
 * `singleton`, `transient` would also behave as you would expect, providing you a new instance each time.
 *
 * @param key - The key to lazily resolve.
 * see {@link DI.createInterface} on interactions with interfaces
 *
 * @public
 */
export declare const lazy: (key: any) => any;

declare type LazyFoundationOption<T, K extends FoundationElementDefinition> = (context: ElementDefinitionContext, definition: OverrideFoundationElementDefinition<K>) => T;

/**
 * This can be used to construct a behavior to apply a prefers color scheme: light only stylesheet.
 * @public
 */
export declare const lightModeStylesheetBehavior: (styles: ElementStyles) => MatchMediaStyleSheetBehavior;

/**
 * A Listbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#listbox | ARIA listbox }.
 *
 * @slot - The default slot for the listbox options
 *
 * @public
 */
export declare abstract class Listbox extends FoundationElement {
    /**
     * The internal unfiltered list of selectable options.
     *
     * @internal
     */
    protected _options: ListboxOption[];
    /**
     * The first selected option.
     *
     * @internal
     */
    get firstSelectedOption(): ListboxOption;
    /**
     * Returns true if there is one or more selectable option.
     *
     * @internal
     */
    protected get hasSelectableOptions(): boolean;
    /**
     * The number of options.
     *
     * @public
     */
    get length(): number;
    /**
     * The list of options.
     *
     * @public
     */
    get options(): ListboxOption[];
    set options(value: ListboxOption[]);
    /**
     * Flag for the typeahead timeout expiration.
     *
     * @deprecated use `Listbox.typeaheadExpired`
     * @internal
     */
    protected get typeAheadExpired(): boolean;
    protected set typeAheadExpired(value: boolean);
    /**
     * The disabled state of the listbox.
     *
     * @public
     * @remarks
     * HTML Attribute: `disabled`
     */
    disabled: boolean;
    /**
     * The index of the selected option.
     *
     * @public
     */
    selectedIndex: number;
    /**
     * A collection of the selected options.
     *
     * @public
     */
    selectedOptions: ListboxOption[];
    /**
     * A standard `click` event creates a `focus` event before firing, so a
     * `mousedown` event is used to skip that initial focus.
     *
     * @internal
     */
    protected shouldSkipFocus: boolean;
    /**
     * A static filter to include only selectable options.
     *
     * @param n - element to filter
     * @public
     */
    static slottedOptionFilter: (n: HTMLElement) => boolean;
    /**
     * The default slotted elements.
     *
     * @internal
     */
    slottedOptions: Element[];
    /**
     * Typeahead timeout in milliseconds.
     *
     * @internal
     */
    protected static readonly TYPE_AHEAD_TIMEOUT_MS = 1000;
    /**
     * The current typeahead buffer string.
     *
     * @internal
     */
    protected typeaheadBuffer: string;
    /**
     * Flag for the typeahead timeout expiration.
     *
     * @internal
     */
    protected typeaheadExpired: boolean;
    /**
     * The timeout ID for the typeahead handler.
     *
     * @internal
     */
    protected typeaheadTimeout: number;
    /**
     * Handle click events for listbox options.
     *
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    /**
     * Ensures that the provided option is focused and scrolled into view.
     *
     * @param optionToFocus - The option to focus
     * @internal
     */
    protected focusAndScrollOptionIntoView(optionToFocus?: ListboxOption | null): void;
    /**
     * Handles `focusin` actions for the component. When the component receives focus,
     * the list of selected options is refreshed and the first selected option is scrolled
     * into view.
     *
     * @internal
     */
    focusinHandler(e: FocusEvent): void;
    /**
     * Returns the options which match the current typeahead buffer.
     *
     * @internal
     */
    protected getTypeaheadMatches(): ListboxOption[];
    /**
     * Determines the index of the next option which is selectable, if any.
     *
     * @param prev - the previous selected index
     * @param next - the next index to select
     *
     * @internal
     */
    protected getSelectableIndex(prev: number | undefined, next: number): number;
    /**
     * Handles external changes to child options.
     *
     * @param source - the source object
     * @param propertyName - the property
     *
     * @internal
     */
    handleChange(source: any, propertyName: string): void;
    /**
     * Moves focus to an option whose label matches characters typed by the user.
     * Consecutive keystrokes are batched into a buffer of search text used
     * to match against the set of options.  If `TYPE_AHEAD_TIMEOUT_MS` passes
     * between consecutive keystrokes, the search restarts.
     *
     * @param key - the key to be evaluated
     *
     * @internal
     */
    handleTypeAhead(key: string): void;
    /**
     * Handles `keydown` actions for listbox navigation and typeahead.
     *
     * @internal
     */
    keydownHandler(e: KeyboardEvent): boolean | void;
    /**
     * Prevents `focusin` events from firing before `click` events when the
     * element is unfocused.
     *
     * @internal
     */
    mousedownHandler(e: MouseEvent): boolean | void;
    /**
     * Switches between single-selection and multi-selection mode.
     *
     * @param prev - the previous value of the `multiple` attribute
     * @param next - the next value of the `multiple` attribute
     *
     * @internal
     */
    multipleChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * Updates the list of selected options when the `selectedIndex` changes.
     *
     * @param prev - the previous selected index value
     * @param next - the current selected index value
     *
     * @internal
     */
    selectedIndexChanged(prev: number | undefined, next: number): void;
    /**
     * Updates the selectedness of each option when the list of selected options changes.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @internal
     */
    protected selectedOptionsChanged(prev: ListboxOption[] | undefined, next: ListboxOption[]): void;
    /**
     * Moves focus to the first selectable option.
     *
     * @public
     */
    selectFirstOption(): void;
    /**
     * Moves focus to the last selectable option.
     *
     * @internal
     */
    selectLastOption(): void;
    /**
     * Moves focus to the next selectable option.
     *
     * @internal
     */
    selectNextOption(): void;
    /**
     * Moves focus to the previous selectable option.
     *
     * @internal
     */
    selectPreviousOption(): void;
    /**
     * Updates the selected index to match the first selected option.
     *
     * @internal
     */
    protected setDefaultSelectedOption(): void;
    /**
     * Sets an option as selected and gives it focus.
     *
     * @public
     */
    protected setSelectedOptions(): void;
    /**
     * Updates the list of options and resets the selected option when the slotted option content changes.
     *
     * @param prev - the previous list of slotted options
     * @param next - the current list of slotted options
     *
     * @internal
     */
    slottedOptionsChanged(prev: Element[] | undefined, next: Element[]): void;
    /**
     * Updates the filtered list of options when the typeahead buffer changes.
     *
     * @param prev - the previous typeahead buffer value
     * @param next - the current typeahead buffer value
     *
     * @internal
     */
    typeaheadBufferChanged(prev: string, next: string): void;
}

/**
 * @internal
 */
export declare interface Listbox extends DelegatesARIAListbox {
}

/**
 * A Listbox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#listbox | ARIA listbox }.
 *
 * @public
 */
export declare class ListboxElement extends Listbox {
    /**
     * The index of the most recently checked option.
     *
     * @internal
     * @remarks
     * Multiple-selection mode only.
     */
    protected activeIndex: number;
    /**
     * Returns the last checked option.
     *
     * @internal
     */
    get activeOption(): ListboxOption | null;
    /**
     * Returns the list of checked options.
     *
     * @internal
     */
    protected get checkedOptions(): ListboxOption[];
    /**
     * Returns the index of the first selected option.
     *
     * @internal
     */
    get firstSelectedOptionIndex(): number;
    /**
     * Indicates if the listbox is in multi-selection mode.
     *
     * @remarks
     * HTML Attribute: `multiple`
     *
     * @public
     */
    multiple: boolean;
    /**
     * The start index when checking a range of options.
     *
     * @internal
     */
    protected rangeStartIndex: number;
    /**
     * The maximum number of options to display.
     *
     * @remarks
     * HTML Attribute: `size`.
     *
     * @public
     */
    size: number;
    /**
     * Updates the `ariaActiveDescendant` property when the active index changes.
     *
     * @param prev - the previous active index
     * @param next - the next active index
     *
     * @internal
     */
    protected activeIndexChanged(prev: number | undefined, next: number): void;
    /**
     * Toggles the checked state for the currently active option.
     *
     * @remarks
     * Multiple-selection mode only.
     *
     * @internal
     */
    protected checkActiveIndex(): void;
    /**
     * Sets the active index to the first option and marks it as checked.
     *
     * @remarks
     * Multi-selection mode only.
     *
     * @param preserveChecked - mark all options unchecked before changing the active index
     *
     * @internal
     */
    protected checkFirstOption(preserveChecked?: boolean): void;
    /**
     * Decrements the active index and sets the matching option as checked.
     *
     * @remarks
     * Multi-selection mode only.
     *
     * @param preserveChecked - mark all options unchecked before changing the active index
     *
     * @internal
     */
    protected checkLastOption(preserveChecked?: boolean): void;
    /**
     * @override
     * @internal
     */
    connectedCallback(): void;
    /**
     * @override
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Increments the active index and marks the matching option as checked.
     *
     * @remarks
     * Multiple-selection mode only.
     *
     * @param preserveChecked - mark all options unchecked before changing the active index
     *
     * @internal
     */
    protected checkNextOption(preserveChecked?: boolean): void;
    /**
     * Decrements the active index and marks the matching option as checked.
     *
     * @remarks
     * Multiple-selection mode only.
     *
     * @param preserveChecked - mark all options unchecked before changing the active index
     *
     * @internal
     */
    protected checkPreviousOption(preserveChecked?: boolean): void;
    /**
     * Handles click events for listbox options.
     *
     * @param e - the event object
     *
     * @override
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    /**
     * @override
     * @internal
     */
    protected focusAndScrollOptionIntoView(): void;
    /**
     * In multiple-selection mode:
     * If any options are selected, the first selected option is checked when
     * the listbox receives focus. If no options are selected, the first
     * selectable option is checked.
     *
     * @override
     * @internal
     */
    focusinHandler(e: FocusEvent): boolean | void;
    /**
     * Unchecks all options when the listbox loses focus.
     *
     * @internal
     */
    focusoutHandler(e: FocusEvent): void;
    /**
     * Handles keydown actions for listbox navigation and typeahead
     *
     * @override
     * @internal
     */
    keydownHandler(e: KeyboardEvent): boolean | void;
    /**
     * Prevents `focusin` events from firing before `click` events when the
     * element is unfocused.
     *
     * @override
     * @internal
     */
    mousedownHandler(e: MouseEvent): boolean | void;
    /**
     * Switches between single-selection and multi-selection mode.
     *
     * @internal
     */
    multipleChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * Sets an option as selected and gives it focus.
     *
     * @override
     * @public
     */
    protected setSelectedOptions(): void;
    /**
     * Ensures the size is a positive integer when the property is updated.
     *
     * @param prev - the previous size value
     * @param next - the current size value
     *
     * @internal
     */
    protected sizeChanged(prev: number | unknown, next: number): void;
    /**
     * Toggles the selected state of the provided options. If any provided items
     * are in an unselected state, all items are set to selected. If every
     * provided item is selected, they are all unselected.
     *
     * @internal
     */
    toggleSelectedForAllCheckedOptions(): void;
    /**
     * @override
     * @internal
     */
    typeaheadBufferChanged(prev: string, next: string): void;
    /**
     * Unchecks all options.
     *
     * @remarks
     * Multiple-selection mode only.
     *
     * @param preserveChecked - reset the rangeStartIndex
     *
     * @internal
     */
    protected uncheckAllOptions(preserveChecked?: boolean): void;
}

/**
 * An Option Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#option | ARIA option }.
 *
 * @slot start - Content which can be provided before the listbox option content
 * @slot end - Content which can be provided after the listbox option content
 * @slot - The default slot for listbox option content
 * @csspart content - Wraps the listbox option content
 *
 * @public
 */
export declare class ListboxOption extends FoundationElement {
    /**
     * @internal
     */
    private _value;
    /**
     * @internal
     */
    proxy: HTMLOptionElement;
    /**
     * The checked state is used when the parent listbox is in multiple selection mode.
     * To avoid accessibility conflicts, the checked state should not be present in
     * single selection mode.
     *
     * @public
     */
    checked?: boolean;
    /**
     * Updates the ariaChecked property when the checked property changes.
     *
     * @param prev - the previous checked value
     * @param next - the current checked value
     *
     * @public
     */
    protected checkedChanged(prev: boolean | unknown, next?: boolean): void;
    /**
     * The default slotted content.
     *
     * @public
     */
    content: Node[];
    /**
     * Updates the proxy's text content when the default slot changes.
     * @param prev - the previous content value
     * @param next - the current content value
     *
     * @internal
     */
    protected contentChanged(prev: undefined | Node[], next: Node[]): void;
    /**
     * The defaultSelected state of the option.
     * @public
     */
    defaultSelected: boolean;
    protected defaultSelectedChanged(): void;
    /**
     * Tracks whether the "selected" property has been changed.
     * @internal
     */
    private dirtySelected;
    /**
     * The disabled state of the option.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    protected disabledChanged(prev: boolean, next: boolean): void;
    /**
     * The selected attribute value. This sets the initial selected value.
     *
     * @public
     * @remarks
     * HTML Attribute: selected
     */
    selectedAttribute: boolean;
    protected selectedAttributeChanged(): void;
    /**
     * The checked state of the control.
     *
     * @public
     */
    selected: boolean;
    protected selectedChanged(): void;
    /**
     * Track whether the value has been changed from the initial value
     */
    dirtyValue: boolean;
    /**
     * The initial value of the option. This value sets the `value` property
     * only when the `value` property has not been explicitly set.
     *
     * @remarks
     * HTML Attribute: value
     */
    protected initialValue: string;
    initialValueChanged(previous: string, next: string): void;
    get label(): string;
    get text(): string;
    set value(next: string);
    get value(): string;
    get form(): HTMLFormElement | null;
    constructor(text?: string, value?: string, defaultSelected?: boolean, selected?: boolean);
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 */
export declare interface ListboxOption extends StartEnd, DelegatesARIAListboxOption {
}

/**
 * Listbox option configuration options
 * @public
 */
export declare type ListboxOptionOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The template for the {@link @microsoft/fast-foundation#(ListboxOption:class)} component.
 * @public
 */
export declare const listboxOptionTemplate: FoundationElementTemplate<ViewTemplate<ListboxOption>, ListboxOptionOptions>;

/**
 * The template for the {@link @microsoft/fast-foundation#(Listbox:class)} component.
 * @public
 */
export declare const listboxTemplate: FoundationElementTemplate<ViewTemplate<ListboxElement>>;

/**
 * An abstract behavior to react to media queries. Implementations should implement
 * the `constructListener` method to perform some action based on media query changes.
 *
 * @public
 */
export declare abstract class MatchMediaBehavior implements Behavior {
    /**
     * The media query that the behavior operates on.
     */
    readonly query: MediaQueryList;
    /**
     *
     * @param query - The media query to operate from.
     */
    constructor(query: MediaQueryList);
    /**
     * Constructs a function that will be invoked with the MediaQueryList context
     * @param source - the element the behavior is acting on.
     */
    protected abstract constructListener(source: typeof FASTElement): MediaQueryListListener;
    /**
     * Binds the behavior to the element.
     * @param source - The element for which the behavior is bound.
     */
    bind(source: typeof FASTElement & HTMLElement): void;
    /**
     * Unbinds the behavior from the element.
     * @param source - The element for which the behavior is unbinding.
     */
    unbind(source: typeof FASTElement & HTMLElement): void;
    /**
     * The behavior needs to operate on element instances but elements might share a behavior instance.
     * To ensure proper attachment / detachment per instance, we construct a listener for
     * each bind invocation and cache the listeners by element reference.
     */
    private listenerCache;
}

/**
 * A behavior to add or remove a stylesheet from an element based on a media query. The behavior ensures that
 * styles are applied while the a query matches the environment and that styles are not applied if the query does
 * not match the environment.
 *
 * @public
 */
export declare class MatchMediaStyleSheetBehavior extends MatchMediaBehavior {
    /**
     * The media query that the behavior operates on.
     */
    readonly query: MediaQueryList;
    /**
     * The styles object to be managed by the behavior.
     */
    readonly styles: ElementStyles;
    /**
     * Constructs a {@link MatchMediaStyleSheetBehavior} instance.
     * @param query - The media query to operate from.
     * @param styles - The styles to coordinate with the query.
     */
    constructor(query: MediaQueryList, styles: ElementStyles);
    /**
     * Defines a function to construct {@link MatchMediaStyleSheetBehavior | MatchMediaStyleSheetBehaviors} for
     * a provided query.
     * @param query - The media query to operate from.
     *
     * @public
     * @example
     *
     * ```ts
     * import { css } from "@microsoft/fast-element";
     * import { MatchMediaStyleSheetBehavior } from "@microsoft/fast-foundation";
     *
     * const landscapeBehavior = MatchMediaStyleSheetBehavior.with(
     *   window.matchMedia("(orientation: landscape)")
     * );
     * const styles = css`
     *   :host {
     *     width: 200px;
     *     height: 400px;
     *   }
     * `
     * .withBehaviors(landscapeBehavior(css`
     *   :host {
     *     width: 400px;
     *     height: 200px;
     *   }
     * `))
     * ```
     */
    static with(query: MediaQueryList): (styles: ElementStyles) => MatchMediaStyleSheetBehavior;
    /**
     * Constructs a match-media listener for a provided element.
     * @param source - the element for which to attach or detach styles.
     * @internal
     */
    protected constructListener(source: typeof FASTElement): MediaQueryListListener;
    /**
     * Unbinds the behavior from the element.
     * @param source - The element for which the behavior is unbinding.
     * @internal
     */
    unbind(source: typeof FASTElement & HTMLElement): void;
}

/**
 * An event listener fired by a {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList | MediaQueryList }.
 * @public
 */
export declare type MediaQueryListListener = (this: MediaQueryList, ev?: MediaQueryListEvent) => void;

/**
 * A Menu Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
export declare class Menu extends FoundationElement {
    /**
     * @internal
     */
    items: HTMLSlotElement;
    private itemsChanged;
    private menuItems;
    private expandedItem;
    /**
     * The index of the focusable element in the items array
     * defaults to -1
     */
    private focusIndex;
    private static focusableElementRoles;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    readonly isNestedMenu: () => boolean;
    /**
     * Focuses the first item in the menu.
     *
     * @public
     */
    focus(): void;
    /**
     * Collapses any expanded menu items.
     *
     * @public
     */
    collapseExpandedItem(): void;
    /**
     * @internal
     */
    handleMenuKeyDown(e: KeyboardEvent): void | boolean;
    /**
     * if focus is moving out of the menu, reset to a stable initial state
     * @internal
     */
    handleFocusOut: (e: FocusEvent) => void;
    private handleItemFocus;
    private handleExpandedChanged;
    private removeItemListeners;
    private setItems;
    /**
     * handle change from child element
     */
    private changeHandler;
    /**
     * get an array of valid DOM children
     */
    private domChildren;
    /**
     * check if the item is a menu item
     */
    private isMenuItemElement;
    /**
     * check if the item is focusable
     */
    private isFocusableElement;
    private setFocus;
}

/**
 * Defines the vertical positioning options for an anchored region
 *
 * @beta
 */
export declare type menuConfigs = "bottom" | "bottom-fill" | "tallest" | "tallest-fill" | "top" | "top-fill";

/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot radio-indicator - The radio indicator
 * @slot start - Content which can be provided before the menu item content
 * @slot end - Content which can be provided after the menu item content
 * @slot - The default slot for menu item content
 * @slot expand-collapse-indicator - The expand/collapse indicator
 * @slot submenu - Used to nest menu's within menu items
 * @csspart input-container - The element representing the visual checked or radio indicator
 * @csspart checkbox - The element wrapping the `menuitemcheckbox` indicator
 * @csspart radio - The element wrapping the `menuitemradio` indicator
 * @csspart content - The element wrapping the menu item content
 * @csspart expand-collapse-glyph-container - The element wrapping the expand collapse element
 * @csspart expand-collapse - The expand/collapse element
 * @csspart submenu-region - The container for the submenu, used for positioning
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 *
 * @public
 */
export declare class MenuItem extends FoundationElement {
    /**
     * The disabled state of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     * The expanded state of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: expanded
     */
    expanded: boolean;
    private expandedChanged;
    /**
     * @internal
     */
    startColumnCount: MenuItemColumnCount;
    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    role: MenuItemRole;
    /**
     * The checked value of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: checked
     */
    checked: boolean;
    private checkedChanged;
    /**
     * reference to the anchored region
     *
     * @internal
     */
    submenuRegion: AnchoredRegion;
    /**
     * @internal
     */
    hasSubmenu: boolean;
    /**
     * Track current direction to pass to the anchored region
     *
     * @internal
     */
    currentDirection: Direction;
    /**
     * @internal
     */
    submenu: Element | undefined;
    private focusSubmenuOnLoad;
    private observer;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleMenuItemKeyDown: (e: KeyboardEvent) => boolean;
    /**
     * @internal
     */
    handleMenuItemClick: (e: MouseEvent) => boolean;
    /**
     * @internal
     */
    submenuLoaded: () => void;
    /**
     * @internal
     */
    handleMouseOver: (e: MouseEvent) => boolean;
    /**
     * @internal
     */
    handleMouseOut: (e: MouseEvent) => boolean;
    /**
     * @internal
     */
    private expandAndFocus;
    /**
     * @internal
     */
    private invoke;
    /**
     * Gets the submenu element if any
     *
     * @internal
     */
    private updateSubmenu;
    /**
     * get an array of valid DOM children
     */
    private domChildren;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface MenuItem extends StartEnd {
}

/**
 * Types of menu item column count.
 * @public
 */
export declare type MenuItemColumnCount = 0 | 1 | 2;

/**
 * Menu Item configuration options
 * @public
 */
export declare type MenuItemOptions = FoundationElementDefinition & StartEndOptions & {
    checkboxIndicator?: string | SyntheticViewTemplate;
    expandCollapseGlyph?: string | SyntheticViewTemplate;
    radioIndicator?: string | SyntheticViewTemplate;
};

/**
 * Menu items roles.
 * @public
 */
export declare const MenuItemRole: {
    /**
     * The menu item has a "menuitem" role
     */
    readonly menuitem: "menuitem";
    /**
     * The menu item has a "menuitemcheckbox" role
     */
    readonly menuitemcheckbox: "menuitemcheckbox";
    /**
     * The menu item has a "menuitemradio" role
     */
    readonly menuitemradio: "menuitemradio";
};

/**
 * The types for menu item roles
 * @public
 */
export declare type MenuItemRole = typeof MenuItemRole[keyof typeof MenuItemRole];

/**
 * Generates a template for the {@link @microsoft/fast-foundation#(MenuItem:class)} component using
 * the provided prefix.
 *
 * @public
 */
export declare const menuItemTemplate: FoundationElementTemplate<ViewTemplate<MenuItem>, MenuItemOptions>;

/**
 * The template for the {@link @microsoft/fast-foundation#Menu} component.
 * @public
 */
export declare const menuTemplate: FoundationElementTemplate<ViewTemplate<Menu>>;

/**
 * A type representing the different month formats
 * @public
 */
export declare type MonthFormat = "2-digit" | "long" | "narrow" | "numeric" | "short";

/**
 * Information about a month
 * @public
 */
export declare type MonthInfo = {
    month: number;
    year: number;
    length: number;
    start: number;
};

/**
 * A decorator that indicates that a new instance should be injected scoped to the
 * container that requested the instance.
 * @param key - The dependency key for the new instance.
 * @remarks
 * This creates a resolver with an instance strategy pointing to the new instance, effectively
 * making this a singleton, scoped to the container or DOM's subtree.
 *
 * @public
 */
export declare const newInstanceForScope: (key: any) => any;

/**
 * A decorator that indicates that a new instance should be injected.
 * @param key - The dependency key for the new instance.
 * @remarks
 * The instance is not internally cached with a resolver as newInstanceForScope does.
 *
 * @public
 */
export declare const newInstanceOf: (key: any) => any;

/**
 * Non-interactive calendar template used for a readonly calendar
 * @param todayString - string representation of todays date
 * @returns - non-interactive calendar template
 *
 * @internal
 */
export declare const noninteractiveCalendarTemplate: (todayString: string) => ViewTemplate;

/**
 * A Number Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number | <input type="number" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @slot step-up-glyph - The glyph for the step up control
 * @slot step-down-glyph - The glyph for the step down control
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The element representing the input
 * @csspart controls - The step up and step down controls
 * @csspart step-up - The step up control
 * @csspart step-down - The step down control
 * @fires input - Fires a custom 'input' event when the value has changed
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
export declare class NumberField extends FormAssociatedNumberField {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    /**
     * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    /**
     * When true, spin buttons will not be rendered
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    hideStep: boolean;
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute does is not a valid substitute for a labeling element.
     */
    placeholder: string;
    /**
     * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
     * @public
     * @remarks
     * HTML Attribute: list
     */
    list: string;
    /**
     * The maximum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: maxlength
     */
    maxlength: number;
    /**
     * The minimum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: minlength
     */
    minlength: number;
    /**
     * Sets the width of the element to a specified number of characters.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    size: number;
    /**
     * Amount to increment or decrement the value by
     * @public
     * @remarks
     * HTMLAttribute: step
     */
    step: number;
    /**
     * The maximum the value can be
     * @public
     * @remarks
     * HTMLAttribute: max
     */
    max: number;
    /**
     * Ensures that the max is greater than the min and that the value
     *  is less than the max
     * @param previous - the previous max value
     * @param next - updated max value
     *
     * @internal
     */
    maxChanged(previous: number, next: number): void;
    /**
     * The minimum the value can be
     * @public
     * @remarks
     * HTMLAttribute: min
     */
    min: number;
    /**
     * Ensures that the min is less than the max and that the value
     *  is greater than the min
     * @param previous - previous min value
     * @param next - updated min value
     *
     * @internal
     */
    minChanged(previous: number, next: number): void;
    /**
     * The default slotted items
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * A reference to the internal input element
     * @internal
     */
    control: HTMLInputElement;
    /**
     * Flag to indicate that the value change is from the user input
     * @internal
     */
    private isUserInput;
    /**
     * The value property, typed as a number.
     *
     * @public
     */
    get valueAsNumber(): number;
    set valueAsNumber(next: number);
    /**
     * Validates that the value is a number between the min and max
     * @param previous - previous stored value
     * @param next - value being updated
     * @param updateControl - should the text field be updated with value, defaults to true
     * @internal
     */
    valueChanged(previous: string, next: string): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    /**
     * Sets the internal value to a valid number between the min and max properties
     * @param value - user input
     *
     * @internal
     */
    private getValidValue;
    /**
     * Increments the value using the step value
     *
     * @public
     */
    stepUp(): void;
    /**
     * Decrements the value using the step value
     *
     * @public
     */
    stepDown(): void;
    /**
     * Sets up the initial state of the number field
     * @internal
     */
    connectedCallback(): void;
    /**
     * Selects all the text in the number field
     *
     * @public
     */
    protected select(): void;
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput(): void;
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange(): void;
    /**
     * Handles the internal control's `keydown` event
     * @internal
     */
    handleKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handles populating the input field with a validated value when
     *  leaving the input field.
     * @internal
     */
    handleBlur(): void;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface NumberField extends StartEnd, DelegatesARIATextbox {
}

declare class _NumberField extends FoundationElement {
}

declare interface _NumberField extends FormAssociated {
}

/**
 * Number Field configuration options
 * @public
 */
export declare type NumberFieldOptions = FoundationElementDefinition & StartEndOptions & {
    stepDownGlyph?: string | SyntheticViewTemplate;
    stepUpGlyph?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(NumberField:class)} component.
 * @public
 */
export declare const numberFieldTemplate: FoundationElementTemplate<ViewTemplate<NumberField>, NumberFieldOptions>;

/**
 * A decorator that allows you to optionally inject a dependency depending on whether the [[`Key`]] is present, for example:
 * @example
 * ```ts
 * class Foo {
 *   constructor( @inject('mystring') public str: string = 'somestring' )
 * }
 * container.get(Foo); // throws
 * ```
 * would fail
 *
 * @example
 * ```ts
 * class Foo {
 *   constructor( @optional('mystring') public str: string = 'somestring' )
 * }
 * container.get(Foo).str // somestring
 * ```
 * if you use it without a default it will inject `undefined`, so remember to mark your input type as
 * possibly `undefined`!
 *
 * @param key - The key to optionally resolve.
 * see {@link DI.createInterface} on interactions with interfaces
 *
 * @public
 */
export declare const optional: (key: any) => any;

/**
 * A set of properties which the component consumer can override during the element registration process.
 * @public
 */
export declare type OverrideFoundationElementDefinition<T extends FoundationElementDefinition> = Partial<Omit<T, "type" | "baseClass">> & {
    /**
     * An element prefix that overrides the design system configuration.
     * @public
     */
    prefix?: string;
};

/**
 * A function capable of locating the parent container based on a container's owner.
 * @remarks
 * A container owner is usually an HTMLElement instance.
 * @public
 */
export declare type ParentLocator = (owner: any) => Container | null;

/**
 * A Picker Custom HTML Element.  This is an early "alpha" version of the component.
 * Developers should expect the api to evolve, breaking changes are possible.
 *
 * @alpha
 */
export declare class Picker extends FormAssociatedPicker {
    /**
     * Currently selected items. Comma delineated string ie. "apples,oranges".
     *
     * @alpha
     * @remarks
     * HTML Attribute: selection
     */
    selection: string;
    private selectionChanged;
    /**
     * Currently available options. Comma delineated string ie. "apples,oranges".
     *
     * @alpha
     * @remarks
     * HTML Attribute: options
     */
    options: string;
    private optionsChanged;
    /**
     * Whether the component should remove an option from the list when it is in the selection
     *
     * @alpha
     * @remarks
     * HTML Attribute: filter-selected
     */
    filterSelected: boolean;
    /**
     * Whether the component should remove options based on the current query
     *
     * @alpha
     * @remarks
     * HTML Attribute: filter-query
     */
    filterQuery: boolean;
    /**
     * The maximum number of items that can be selected.
     *
     * @alpha
     * @remarks
     * HTML Attribute: max-selected
     */
    maxSelected: number | undefined;
    /**
     * The text to present to assistive technolgies when no suggestions are available.
     *
     * @alpha
     * @remarks
     * HTML Attribute: no-suggestions-text
     */
    noSuggestionsText: string;
    /**
     *  The text to present to assistive technolgies when suggestions are available.
     *
     * @alpha
     * @remarks
     * HTML Attribute: suggestions-available-text
     */
    suggestionsAvailableText: string;
    /**
     * The text to present to assistive technologies when suggestions are loading.
     *
     * @alpha
     * @remarks
     * HTML Attribute: loading-text
     */
    loadingText: string;
    /**
     * Applied to the aria-label attribute of the input element
     *
     * @alpha
     * @remarks
     * HTML Attribute: label
     */
    label: string;
    /**
     * Applied to the aria-labelledby attribute of the input element
     *
     * @alpha
     * @remarks
     * HTML Attribute: labelledby
     */
    labelledBy: string;
    /**
     * Applied to the placeholder attribute of the input element
     *
     * @alpha
     * @remarks
     * HTML Attribute: placholder
     */
    placeholder: string;
    /**
     * Controls menu placement
     *
     * @alpha
     * @remarks
     * HTML Attribute: menu-placement
     */
    menuPlacement: menuConfigs;
    private menuPlacementChanged;
    /**
     * Whether to display a loading state if the menu is opened.
     *
     * @alpha
     */
    showLoading: boolean;
    private showLoadingChanged;
    /**
     * Template used to generate selected items.
     * This is used in a repeat directive.
     *
     * @alpha
     */
    listItemTemplate: ViewTemplate;
    private listItemTemplateChanged;
    /**
     * Default template to use for selected items (usually specified in the component template).
     * This is used in a repeat directive.
     *
     * @alpha
     */
    defaultListItemTemplate?: ViewTemplate;
    private defaultListItemTemplateChanged;
    /**
     * The item template currently in use.
     *
     * @internal
     */
    activeListItemTemplate?: ViewTemplate;
    /**
     * Template to use for available options.
     * This is used in a repeat directive.
     *
     * @alpha
     */
    menuOptionTemplate: ViewTemplate;
    private menuOptionTemplateChanged;
    /**
     * Default template to use for available options (usually specified in the template).
     * This is used in a repeat directive.
     *
     * @alpha
     */
    defaultMenuOptionTemplate?: ViewTemplate;
    private defaultMenuOptionTemplateChanged;
    /**
     * The option template currently in use.
     *
     * @internal
     */
    activeMenuOptionTemplate?: ViewTemplate;
    /**
     *  Template to use for the contents of a selected list item
     *
     * @alpha
     */
    listItemContentsTemplate: ViewTemplate;
    /**
     *  Template to use for the contents of menu options
     *
     * @alpha
     */
    menuOptionContentsTemplate: ViewTemplate;
    /**
     *  Current list of options in array form
     *
     * @alpha
     */
    optionsList: string[];
    private optionsListChanged;
    /**
     * The text value currently in the input field
     *
     * @alpha
     */
    query: string;
    private queryChanged;
    /**
     *  Current list of filtered options in array form
     *
     * @internal
     */
    filteredOptionsList: string[];
    private filteredOptionsListChanged;
    /**
     *  Indicates if the flyout menu is open or not
     *
     * @internal
     */
    flyoutOpen: boolean;
    private flyoutOpenChanged;
    /**
     *  The id of the menu element
     *
     * @internal
     */
    menuId: string;
    /**
     *  The tag for the selected list element (ie. "fast-picker-list" vs. "fluent-picker-list")
     *
     * @internal
     */
    selectedListTag: string;
    /**
     * The tag for the menu element (ie. "fast-picker-menu" vs. "fluent-picker-menu")
     *
     * @internal
     */
    menuTag: string;
    /**
     *  Index of currently active menu option
     *
     * @internal
     */
    menuFocusIndex: number;
    /**
     *  Id of currently active menu option.
     *
     * @internal
     */
    menuFocusOptionId: string | undefined;
    /**
     *  Internal flag to indicate no options available display should be shown.
     *
     * @internal
     */
    showNoOptions: boolean;
    private showNoOptionsChanged;
    /**
     *  The anchored region config to apply.
     *
     * @internal
     */
    menuConfig: AnchoredRegionConfig;
    /**
     *  Reference to the placeholder element for the repeat directive
     *
     * @alpha
     */
    itemsPlaceholderElement: Node;
    /**
     * reference to the input element
     *
     * @internal
     */
    inputElement: HTMLInputElement;
    /**
     * reference to the selected list element
     *
     * @internal
     */
    listElement: PickerList;
    /**
     * reference to the menu element
     *
     * @internal
     */
    menuElement: PickerMenu;
    /**
     * reference to the anchored region element
     *
     * @internal
     */
    region: AnchoredRegion;
    /**
     *
     *
     * @internal
     */
    selectedItems: string[];
    private itemsRepeatBehavior;
    private optionsRepeatBehavior;
    private optionsPlaceholder;
    private inputElementView;
    /**
     * @internal
     */
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Move focus to the input element
     * @public
     */
    focus(): void;
    /**
     * Initialize the component.  This is delayed a frame to ensure children are connected as well.
     */
    private initialize;
    /**
     * Toggles the menu flyout
     */
    private toggleFlyout;
    /**
     * Handle input event from input element
     */
    private handleTextInput;
    /**
     * Handle click event from input element
     */
    private handleInputClick;
    /**
     * Handle the menu options updated event from the child menu
     */
    private handleMenuOptionsUpdated;
    /**
     * Handle key down events.
     */
    handleKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handle focus in events.
     */
    handleFocusIn(e: FocusEvent): boolean;
    /**
     * Handle focus out events.
     */
    handleFocusOut(e: FocusEvent): boolean;
    /**
     * The list of selected items has changed
     */
    handleSelectionChange(): void;
    /**
     * Anchored region is loaded, menu and options exist in the DOM.
     */
    handleRegionLoaded(e: Event): void;
    /**
     * Sets properties on the anchored region once it is instanciated.
     */
    private setRegionProps;
    /**
     * Checks if the maximum number of items has been chosen and updates the ui.
     */
    private checkMaxItems;
    /**
     * A list item has been invoked.
     */
    handleItemInvoke(e: Event): boolean;
    /**
     * A menu option has been invoked.
     */
    handleOptionInvoke(e: Event): boolean;
    /**
     * Increments the focused list item by the specified amount
     */
    private incrementFocusedItem;
    /**
     * Disables the menu. Note that the menu can be open, just doens't have any valid options on display.
     */
    private disableMenu;
    /**
     * Sets the currently focused menu option by index
     */
    private setFocusedOption;
    /**
     * Updates the template used for the list item repeat behavior
     */
    private updateListItemTemplate;
    /**
     * Updates the template used for the menu option repeat behavior
     */
    private updateOptionTemplate;
    /**
     * Updates the filtered options array
     */
    private updateFilteredOptions;
    /**
     * Updates the menu configuration
     */
    private updateMenuConfig;
    /**
     * matches menu placement values with the associated menu config
     */
    private configLookup;
}

declare class _Picker extends FoundationElement {
}

declare interface _Picker extends FormAssociated {
}

/**
 * A List Picker Menu Custom HTML Element.
 *
 * @alpha
 */
export declare class PickerList extends FoundationElement {
}

/**
 * A picker list item Custom HTML Element.
 *
 * @alpha
 */
export declare class PickerListItem extends FoundationElement {
    /**
     * The underlying string value of the item
     *
     * @alpha
     * @remarks
     * HTML Attribute: value
     */
    value: string;
    /**
     *  The template used to render the contents of the list item
     *
     * @alpha
     */
    contentsTemplate: ViewTemplate;
    private contentsTemplateChanged;
    private customView;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleKeyDown(e: KeyboardEvent): boolean;
    handleClick(e: MouseEvent): boolean;
    private handleInvoke;
    private updateView;
    private disconnectView;
}

/**
 *
 * @public
 */
export declare const pickerListItemTemplate: FoundationElementTemplate<ViewTemplate<PickerListItem>>;

/**
 *
 * @public
 */
export declare const pickerListTemplate: FoundationElementTemplate<ViewTemplate<PickerList>>;

/**
 * A List Picker Menu Custom HTML Element.
 *
 * @alpha
 */
export declare class PickerMenu extends FoundationElement {
    /**
     *  Elements in the default slot
     *
     * @internal
     */
    menuElements: HTMLElement[];
    menuElementsChanged(): void;
    /**
     *  Elements in the header slot
     *
     *
     * @internal
     */
    headerElements: HTMLElement[];
    headerElementsChanged(): void;
    /**
     *  Elements in the footer slot
     *
     *
     * @internal
     */
    footerElements: HTMLElement[];
    footerElementsChanged(): void;
    /**
     * Text to display to assistive technology when
     * suggestions are available
     *
     * @alpha
     */
    suggestionsAvailableText: string;
    /**
     * Children that are list items
     *
     * @internal
     */
    optionElements: HTMLElement[];
    private updateOptions;
    private addSlottedListItems;
}

/**
 * A picker list item Custom HTML Element.
 *
 * @alpha
 */
export declare class PickerMenuOption extends FoundationElement {
    /**
     * The underlying string value of the item
     *
     * @alpha
     * @remarks
     * HTML Attribute: value
     */
    value: string;
    /**
     *  The template used to render the contents of the list item
     *
     * @alpha
     */
    contentsTemplate: ViewTemplate;
    private contentsTemplateChanged;
    private customView;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleClick(e: MouseEvent): boolean;
    private handleInvoked;
    private updateView;
    private disconnectView;
}

/**
 *
 * @public
 */
export declare const pickerMenuOptionTemplate: FoundationElementTemplate<ViewTemplate<PickerMenuOption>>;

/**
 * The template for the List Picker component.
 * @public
 */
export declare const pickerMenuTemplate: FoundationElementTemplate<ViewTemplate<PickerMenu>>;

/**
 * The template for the List Picker component.
 * @public
 */
export declare const pickerTemplate: FoundationElementTemplate<ViewTemplate<Picker>>;

/**
 * Progress configuration options
 * @public
 */
export declare type ProgressOptions = FoundationElementDefinition & {
    indeterminateIndicator1?: string | SyntheticViewTemplate;
    indeterminateIndicator2?: string | SyntheticViewTemplate;
};

/**
 * ProgressRing configuration options
 * @public
 */
export declare type ProgressRingOptions = FoundationElementDefinition & {
    indeterminateIndicator?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#BaseProgress} component.
 * @public
 */
export declare const progressRingTemplate: FoundationElementTemplate<ViewTemplate<BaseProgress>, ProgressRingOptions>;

/**
 * The template for the {@link @microsoft/fast-foundation#BaseProgress} component.
 * @public
 */
export declare const progressTemplate: FoundationElementTemplate<ViewTemplate<BaseProgress>, ProgressOptions>;

/**
 * A behavior to add or remove a stylesheet from an element based on a property. The behavior ensures that
 * styles are applied while the property matches and that styles are not applied if the property does
 * not match.
 *
 * @public
 */
export declare class PropertyStyleSheetBehavior implements Behavior {
    private propertyName;
    private value;
    private styles;
    /**
     * Constructs a {@link PropertyStyleSheetBehavior} instance.
     * @param propertyName - The property name to operate from.
     * @param value - The property value to operate from.
     * @param styles - The styles to coordinate with the property.
     */
    constructor(propertyName: string, value: any, styles: ElementStyles);
    /**
     * Binds the behavior to the element.
     * @param elementInstance - The element for which the property is applied.
     */
    bind(elementInstance: FASTElement): void;
    /**
     * Unbinds the behavior from the element.
     * @param source - The element for which the behavior is unbinding.
     * @internal
     */
    unbind(source: typeof FASTElement & HTMLElement): void;
    /**
     * Change event for the provided element.
     * @param source - the element for which to attach or detach styles.
     * @param key - the key to lookup to know if the element already has the styles
     * @internal
     */
    handleChange(source: FASTElement, key: string): void;
}

/**
 * Avaiable types for the `proxy` property.
 * @alpha
 */
export declare type ProxyElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

/**
 * A Radio Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radio | ARIA radio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual radio control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export declare class Radio extends FormAssociatedRadio implements RadioControl {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * The name of the radio. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname | name attribute} for more info.
     */
    name: string;
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="radio"]
     *
     * @internal
     */
    initialValue: string;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * @internal
     */
    defaultCheckedChanged(): void;
    constructor();
    /**
     * @internal
     */
    connectedCallback(): void;
    private isInsideRadioGroup;
    /**
     * @internal
     */
    keypressHandler: (e: KeyboardEvent) => boolean | void;
    /**
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
}

declare class _Radio extends FoundationElement {
}

declare interface _Radio extends CheckableFormAssociated {
}

/**
 * A structure representing a {@link @microsoft/fast-foundation#(Radio:class)} element
 * @public
 */
export declare type RadioControl = Pick<HTMLInputElement, "checked" | "disabled" | "readOnly" | "focus" | "setAttribute" | "getAttribute">;

/**
 * An Radio Group Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radiogroup | ARIA radiogroup }.
 *
 * @slot label - The slot for the label
 * @slot - The default slot for radio buttons
 * @csspart positioning-region - The positioning region for laying out the radios
 * @fires change - Fires a custom 'change' event when the value changes
 *
 * @public
 */
export declare class RadioGroup extends FoundationElement {
    /**
     * When true, the child radios will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * Disables the radio group and child radios.
     *
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    private disabledChanged;
    /**
     * The name of the radio group. Setting this value will set the name value
     * for all child radio elements.
     *
     * @public
     * @remarks
     * HTML Attribute: name
     */
    name: string;
    protected nameChanged(): void;
    /**
     * The value of the checked radio
     *
     * @public
     * @remarks
     * HTML Attribute: value
     */
    value: string;
    protected valueChanged(): void;
    /**
     * The orientation of the group
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: Orientation | "horizontal" | "vertical";
    childItems: HTMLElement[];
    /**
     * @internal
     */
    slottedRadioButtons: HTMLElement[];
    private slottedRadioButtonsChanged;
    private selectedRadio;
    private focusedRadio;
    private direction;
    private get parentToolbar();
    private get isInsideToolbar();
    private get isInsideFoundationToolbar();
    /**
     * @internal
     */
    connectedCallback(): void;
    disconnectedCallback(): void;
    private setupRadioButtons;
    private radioChangeHandler;
    private moveToRadioByIndex;
    private moveRightOffGroup;
    private moveLeftOffGroup;
    /**
     * @internal
     */
    focusOutHandler: (e: FocusEvent) => boolean | void;
    /**
     * @internal
     */
    clickHandler: (e: MouseEvent) => void;
    private shouldMoveOffGroupToTheRight;
    private shouldMoveOffGroupToTheLeft;
    private checkFocusedRadio;
    private moveRight;
    private moveLeft;
    /**
     * keyboard handling per https://w3c.github.io/aria-practices/#for-radio-groups-not-contained-in-a-toolbar
     * navigation is different when there is an ancestor with role='toolbar'
     *
     * @internal
     */
    keydownHandler: (e: KeyboardEvent) => boolean | void;
}

/**
 * The template for the {@link @microsoft/fast-foundation#RadioGroup} component.
 * @public
 */
export declare const radioGroupTemplate: FoundationElementTemplate<ViewTemplate<RadioGroup>>;

/**
 * Radio configuration options
 * @public
 */
export declare type RadioOptions = FoundationElementDefinition & {
    checkedIndicator?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Radio:class)} component.
 * @public
 */
export declare const radioTemplate: FoundationElementTemplate<ViewTemplate<Radio>, RadioOptions>;

/**
 * Reflects attributes from the host element to the target element of the directive.
 * @param attributes - The attributes to reflect
 *
 * @beta
 * @example
 * ```ts
 * const template = html`
 *     <button
 *         ${reflectAttributes("aria-label", "aria-describedby")}
 *     >
 *          hello world
 *     </button
 * `
 * ```
 */
export declare function reflectAttributes<T = any>(...attributes: string[]): CaptureType<T>;

/**
 * Represents an object that can register itself.
 * @public
 */
export declare type RegisterSelf<T extends Constructable> = {
    /**
     * Registers itself with the container.
     * @param container - The container to register with.
     */
    register(container: Container): Resolver<InstanceType<T>>;
    /**
     * Indicates whether during auto registration the object should be
     * registered in the requesting container rather than the handling container.
     */
    registerInRequestor: boolean;
};

/**
 * Implemented by objects that wish to register dependencies in the container
 * by creating resolvers.
 * @public
 */
export declare interface Registration<K = any> {
    /**
     * Creates a resolver for a desired dependency.
     * @param container - The container to register the dependency within.
     * @param key - The key to register dependency under, if overridden.
     */
    register(container: Container): Resolver<K>;
}

/**
 * You can use the resulting Registration of any of the factory methods
 * to register with the container.
 *
 * @example
 * ```
 * class Foo {}
 * const container = DI.createContainer();
 * container.register(Registration.instance(Foo, new Foo()));
 * container.get(Foo);
 * ```
 *
 * @public
 */
export declare const Registration: Readonly<{
    /**
     * Allows you to pass an instance.
     * Every time you request this {@link Key} you will get this instance back.
     *
     * @example
     * ```
     * Registration.instance(Foo, new Foo()));
     * ```
     *
     * @param key - The key to register the instance under.
     * @param value - The instance to return when the key is requested.
     */
    instance<T>(key: Key, value: T): Registration<T>;
    /**
     * Creates an instance from the class.
     * Every time you request this {@link Key} you will get the same one back.
     *
     * @example
     * ```
     * Registration.singleton(Foo, Foo);
     * ```
     *
     * @param key - The key to register the singleton under.
     * @param value - The class to instantiate as a singleton when first requested.
     */
    singleton<T_1 extends Constructable<{}>>(key: Key, value: T_1): Registration<InstanceType<T_1>>;
    /**
     * Creates an instance from a class.
     * Every time you request this {@link Key} you will get a new instance.
     *
     * @example
     * ```
     * Registration.instance(Foo, Foo);
     * ```
     *
     * @param key - The key to register the instance type under.
     * @param value - The class to instantiate each time the key is requested.
     */
    transient<T_2 extends Constructable<{}>>(key: Key, value: T_2): Registration<InstanceType<T_2>>;
    /**
     * Delegates to a callback function to provide the dependency.
     * Every time you request this {@link Key} the callback will be invoked to provide
     * the dependency.
     *
     * @example
     * ```
     * Registration.callback(Foo, () => new Foo());
     * Registration.callback(Bar, (c: Container) => new Bar(c.get(Foo)));
     * ```
     *
     * @param key - The key to register the callback for.
     * @param callback - The function that is expected to return the dependency.
     */
    callback<T_3>(key: Key, callback: ResolveCallback<T_3>): Registration<Resolved<T_3>>;
    /**
     * Delegates to a callback function to provide the dependency and then caches the
     * dependency for future requests.
     *
     * @example
     * ```
     * Registration.cachedCallback(Foo, () => new Foo());
     * Registration.cachedCallback(Bar, (c: Container) => new Bar(c.get(Foo)));
     * ```
     *
     * @param key - The key to register the callback for.
     * @param callback - The function that is expected to return the dependency.
     * @remarks
     * If you pass the same Registration to another container, the same cached value will be used.
     * Should all references to the resolver returned be removed, the cache will expire.
     */
    cachedCallback<T_4>(key: Key, callback: ResolveCallback<T_4>): Registration<Resolved<T_4>>;
    /**
     * Creates an alternate {@link Key} to retrieve an instance by.
     *
     * @example
     * ```
     * Register.singleton(Foo, Foo)
     * Register.aliasTo(Foo, MyFoos);
     *
     * container.getAll(MyFoos) // contains an instance of Foo
     * ```
     *
     * @param originalKey - The original key that has been registered.
     * @param aliasKey - The alias to the original key.
     */
    aliasTo<T_5>(originalKey: T_5, aliasKey: Key): Registration<Resolved<T_5>>;
}>;

/**
 * Implemented by objects that which to register dependencies in a container.
 * @public
 */
export declare interface Registry {
    /**
     * Registers dependencies in the specified container.
     * @param container - The container to register dependencies in.
     * @param params - Parameters that affect the registration process.
     * @remarks
     * If this registry doubles as a Registration, it should return a Resolver
     * for the registered dependency.
     */
    register(container: Container, ...params: unknown[]): void | Resolver;
}

/**
 * Represents a custom callback for resolving a request from the container.
 * The handler is the container that is invoking the callback. The requestor
 * is the original container that made the request. The handler and the requestor
 * may not be the same if the request has bubbled up to a parent container in the DI hierarchy.
 * The resolver is the instance of the resolver that stores the callback. This is provided in case
 * the callback needs a place or key against which to store state across resolutions.
 * @public
 */
export declare type ResolveCallback<T = any> = (handler: Container, requestor: Container, resolver: Resolver<T>) => T;

/**
 * Represents something resolved from a service locator.
 * @public
 */
export declare type Resolved<K> = K extends InterfaceSymbol<infer T> ? T : K extends Constructable ? InstanceType<K> : K extends ResolverLike<any, infer T1> ? T1 extends Constructable ? InstanceType<T1> : T1 : K;

/**
 * Internally, the DI system maps "keys" to "resolvers". A resolver controls
 * how a dependency is resolved. Resolvers for transient, singleton, etc. are
 * provided out of the box, but you can also implement Resolver yourself and supply
 * custom logic for resolution.
 * @public
 */
export declare interface Resolver<K = any> extends ResolverLike<Container, K> {
}

/**
 * A utility class used that constructs and registers resolvers for a dependency
 * injection container. Supports a standard set of object lifetimes.
 * @public
 */
export declare class ResolverBuilder<K> {
    private container;
    private key;
    /**
     *
     * @param container - The container to create resolvers for.
     * @param key - The key to register resolvers under.
     */
    constructor(container: Container, key: Key);
    /**
     * Creates a resolver for an existing object instance.
     * @param value - The instance to resolve.
     * @returns The resolver.
     */
    instance(value: K): Resolver<K>;
    /**
     * Creates a resolver that enforces a singleton lifetime.
     * @param value - The type to create and cache the singleton for.
     * @returns The resolver.
     */
    singleton(value: Constructable): Resolver<K>;
    /**
     * Creates a resolver that creates a new instance for every dependency request.
     * @param value - The type to create instances of.
     * @returns - The resolver.
     */
    transient(value: Constructable): Resolver<K>;
    /**
     * Creates a resolver that invokes a callback function for every dependency resolution
     * request, allowing custom logic to return the dependency.
     * @param value - The callback to call during resolution.
     * @returns The resolver.
     */
    callback(value: ResolveCallback<K>): Resolver<K>;
    /**
     * Creates a resolver that invokes a callback function the first time that a dependency
     * resolution is requested. The returned value is then cached and provided for all
     * subsequent requests.
     * @param value - The callback to call during the first resolution.
     * @returns The resolver.
     */
    cachedCallback(value: ResolveCallback<K>): Resolver<K>;
    /**
     * Aliases the current key to a different key.
     * @param destinationKey - The key to point the alias to.
     * @returns The resolver.
     */
    aliasTo(destinationKey: Key): Resolver<K>;
    private registerResolver;
}

/** @internal */
export declare class ResolverImpl implements Resolver, Registration {
    key: Key;
    strategy: ResolverStrategy;
    state: any;
    constructor(key: Key, strategy: ResolverStrategy, state: any);
    get $isResolver(): true;
    private resolving;
    register(container: Container): Resolver;
    resolve(handler: Container, requestor: Container): any;
    getFactory(container: Container): Factory | null;
}

declare interface ResolverLike<C, K = any> {
    readonly $isResolver: true;
    resolve(handler: C, requestor: C): Resolved<K>;
    getFactory?(container: C): (K extends Constructable ? Factory<K> : never) | null;
}

/** @internal */
export declare const enum ResolverStrategy {
    instance = 0,
    singleton = 1,
    transient = 2,
    callback = 3,
    array = 4,
    alias = 5
}

/**
 * @internal
 */
export declare const roleForMenuItem: {
    [value in keyof typeof MenuItemRole]: typeof MenuItemRole[value];
};

/**
 * The easing types available for the horizontal-scroll {@link @microsoft/fast-foundation#(HorizontalScroll:class)}
 * @public
 */
export declare type ScrollEasing = "linear" | "ease-in" | "ease-out" | "ease-in-out" | string;

/**
 * A Search Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search | <input type="search" /> element }.
 *
 * @slot start - Content which can be provided before the search input
 * @slot end - Content which can be provided after the search clear button
 * @slot - The default slot for the label
 * @slot close-button - The clear button
 * @slot close-glyph - The clear glyph
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The element representing the input
 * @csspart clear-button - The button to clear the input
 *
 * @public
 */
export declare class Search extends FormAssociatedSearch {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    private autofocusChanged;
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute does is not a valid substitute for a labeling element.
     */
    placeholder: string;
    private placeholderChanged;
    /**
     * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
     * @public
     * @remarks
     * HTML Attribute: list
     */
    list: string;
    private listChanged;
    /**
     * The maximum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: maxlength
     */
    maxlength: number;
    private maxlengthChanged;
    /**
     * The minimum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: minlength
     */
    minlength: number;
    private minlengthChanged;
    /**
     * A regular expression that the value must match to pass validation.
     * @public
     * @remarks
     * HTMLAttribute: pattern
     */
    pattern: string;
    private patternChanged;
    /**
     * Sets the width of the element to a specified number of characters.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    size: number;
    private sizeChanged;
    /**
     * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    spellcheck: boolean;
    private spellcheckChanged;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * A reference to the internal close button element
     * @internal
     */
    root: HTMLDivElement;
    /**
     * A reference to the internal input element
     * @internal
     */
    control: HTMLInputElement;
    /**
     * @internal
     */
    connectedCallback(): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput(): void;
    /**
     * Handles the control's clear value event
     * @public
     */
    handleClearInput(): void;
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange(): void;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface Search extends StartEnd, DelegatesARIASearch {
}

declare class _Search extends FoundationElement {
}

declare interface _Search extends FormAssociated {
}

/**
 * Search configuration options
 * @public
 */
export declare type SearchOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The template for the {@link @microsoft/fast-foundation#(Search:class)} component.
 * @public
 */
export declare const searchTemplate: FoundationElementTemplate<ViewTemplate<Search>, SearchOptions>;

/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot button-container - The element representing the select button
 * @slot selected-value - The selected value
 * @slot indicator - The visual indicator for the expand/collapse state of the button
 * @slot - The default slot for slotted options
 * @csspart control - The element representing the select invoking element
 * @csspart selected-value - The element wrapping the selected value
 * @csspart indicator - The element wrapping the visual indicator
 * @csspart listbox - The listbox element
 * @fires input - Fires a custom 'input' event when the value updates
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export declare class Select extends FormAssociatedSelect {
    /**
     * The open attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: open
     */
    open: boolean;
    /**
     * Sets focus and synchronizes ARIA attributes when the open property changes.
     *
     * @param prev - the previous open value
     * @param next - the current open value
     *
     * @internal
     */
    protected openChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * The selectedIndex when the open property is true.
     *
     * @internal
     */
    private indexWhenOpened;
    /**
     * The internal value property.
     *
     * @internal
     */
    private _value;
    /**
     * The component is collapsible when in single-selection mode with no size attribute.
     *
     * @internal
     */
    get collapsible(): boolean;
    /**
     * The ref to the internal `.control` element.
     *
     * @internal
     */
    control: HTMLElement;
    /**
     * The value property.
     *
     * @public
     */
    get value(): string;
    set value(next: string);
    /**
     * Sets the value and display value to match the first selected option.
     *
     * @param shouldEmit - if true, the input and change events will be emitted
     *
     * @internal
     */
    private updateValue;
    /**
     * Updates the proxy value when the selected index changes.
     *
     * @param prev - the previous selected index
     * @param next - the next selected index
     *
     * @internal
     */
    selectedIndexChanged(prev: number | undefined, next: number): void;
    /**
     * Reflects the placement for the listbox when the select is open.
     *
     * @public
     */
    positionAttribute?: SelectPosition;
    /**
     * Indicates the initial state of the position attribute.
     *
     * @internal
     */
    private forcedPosition;
    /**
     * Holds the current state for the calculated position of the listbox.
     *
     * @public
     */
    position?: SelectPosition;
    protected positionChanged(prev: SelectPosition | undefined, next: SelectPosition | undefined): void;
    /**
     * Reference to the internal listbox element.
     *
     * @internal
     */
    listbox: HTMLDivElement;
    /**
     * The unique id for the internal listbox element.
     *
     * @internal
     */
    listboxId: string;
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @public
     */
    setPositioning(): void;
    /**
     * The max height for the listbox when opened.
     *
     * @internal
     */
    maxHeight: number;
    /**
     * The value displayed on the button.
     *
     * @public
     */
    get displayValue(): string;
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev: boolean, next: boolean): void;
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback(): void;
    /**
     * Handle opening and closing the listbox when the select is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    /**
     * Handles focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e: FocusEvent): boolean | void;
    /**
     * Updates the value when an option's value changes.
     *
     * @param source - the source object
     * @param propertyName - the property to evaluate
     *
     * @internal
     * @override
     */
    handleChange(source: any, propertyName: string): void;
    /**
     * Synchronize the form-associated proxy and updates the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev: Element[] | undefined, next: Element[]): void;
    /**
     * Prevents focus when size is set and a scrollbar is clicked.
     *
     * @param e - the mouse event object
     *
     * @override
     * @internal
     */
    mousedownHandler(e: MouseEvent): boolean | void;
    /**
     * Sets the multiple property on the proxy element.
     *
     * @param prev - the previous multiple value
     * @param next - the current multiple value
     */
    multipleChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * Updates the selectedness of each option when the list of selected options changes.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @override
     * @internal
     */
    protected selectedOptionsChanged(prev: ListboxOption[] | undefined, next: ListboxOption[]): void;
    /**
     * Sets the selected index to match the first option with the selected attribute, or
     * the first selectable option.
     *
     * @override
     * @internal
     */
    protected setDefaultSelectedOption(): void;
    /**
     * Resets and fills the proxy to match the component's options.
     *
     * @internal
     */
    private setProxyOptions;
    /**
     * Handle keyboard interaction for the select.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e: KeyboardEvent): boolean | void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Updates the proxy's size property when the size attribute changes.
     *
     * @param prev - the previous size
     * @param next - the current size
     *
     * @override
     * @internal
     */
    protected sizeChanged(prev: number | undefined, next: number): void;
    /**
     *
     * @internal
     */
    private updateDisplayValue;
}

/**
 * @internal
 */
export declare interface Select extends StartEnd, DelegatesARIASelect {
}

declare class _Select extends ListboxElement {
}

declare interface _Select extends FormAssociated {
}

/**
 * Select configuration options
 * @public
 */
export declare type SelectOptions = FoundationElementDefinition & StartEndOptions & {
    indicator?: string | SyntheticViewTemplate;
};

/**
 * Positioning directions for the listbox when a select is open.
 * @public
 */
export declare const SelectPosition: {
    readonly above: "above";
    readonly below: "below";
};

/**
 * Types for positioning the select element listbox when open
 * @public
 */
export declare type SelectPosition = typeof SelectPosition[keyof typeof SelectPosition];

/**
 * The template for the {@link @microsoft/fast-foundation#(Select:class)} component.
 * @public
 */
export declare const selectTemplate: FoundationElementTemplate<ViewTemplate<Select>, SelectOptions>;

/**
 * Implemented by objects capable of resolving services and other dependencies.
 * @public
 */
export declare interface ServiceLocator {
    /**
     * Determines whether the locator has the ability to provide an implementation
     * for the requested key.
     * @param key - The dependency key to lookup.
     * @param searchAncestors - Indicates whether to search the entire hierarchy of service locators.
     */
    has<K extends Key>(key: K | Key, searchAncestors: boolean): boolean;
    /**
     * Gets a dependency by key.
     * @param key - The key to lookup.
     */
    get<K extends Key>(key: K): Resolved<K>;
    /**
     * Gets a dependency by key.
     * @param key - The key to lookup.
     */
    get<K extends Key>(key: Key): Resolved<K>;
    /**
     * Gets a dependency by key.
     * @param key - The key to lookup.
     */
    get<K extends Key>(key: K | Key): Resolved<K>;
    /**
     * Gets an array of all dependencies by key.
     * @param key - The key to lookup.
     * @param searchAncestors - Indicates whether to search the entire hierarchy of service locators.
     */
    getAll<K extends Key>(key: K, searchAncestors?: boolean): readonly Resolved<K>[];
    /**
     * Gets an array of all dependencies by key.
     * @param key - The key to lookup.
     * @param searchAncestors - Indicates whether to search the entire hierarchy of service locators.
     */
    getAll<K extends Key>(key: Key, searchAncestors?: boolean): readonly Resolved<K>[];
    /**
     * Gets an array of all dependencies by key.
     * @param key - The key to lookup.
     * @param searchAncestors - Indicates whether to search the entire hierarchy of service locators.
     */
    getAll<K extends Key>(key: K | Key, searchAncestors?: boolean): readonly Resolved<K>[];
}

/**
 * The interface key that resolves the service locator itself.
 * @public
 */
export declare const ServiceLocator: InterfaceSymbol<ServiceLocator>;

/**
 * Registers the decorated class as a singleton dependency; the class will only be created once. Each
 * consecutive time the dependency is resolved, the same instance will be returned.
 *
 * @example
 * ```ts
 * @singleton()
 * class Foo { }
 * ```
 *
 * @public
 */
export declare function singleton<T extends Constructable>(): typeof singletonDecorator;

/**
 * @public
 */
export declare function singleton<T extends Constructable>(options?: SingletonOptions): typeof singletonDecorator;

/**
 * Registers the `target` class as a singleton dependency; the class will only be created once. Each
 * consecutive time the dependency is resolved, the same instance will be returned.
 *
 * @param target - The class / constructor function to register as a singleton.
 *
 * @example
 * ```ts
 * @singleton()
 * class Foo { }
 * ```
 *
 * @public
 */
export declare function singleton<T extends Constructable>(target: T & Partial<RegisterSelf<T>>): T & RegisterSelf<T>;

declare function singletonDecorator<T extends Constructable>(target: T & Partial<RegisterSelf<T>>): T & RegisterSelf<T>;

declare type SingletonOptions = {
    scoped: boolean;
};

/**
 * A Skeleton Custom HTML Element.
 *
 * @slot - The default slot
 *
 * @public
 */
export declare class Skeleton extends FoundationElement {
    /**
     * Indicates the Skeleton should have a filled style.
     *
     * @public
     * @remarks
     * HTML Attribute: fill
     */
    fill: string;
    /**
     * Indicates what the shape of the Skeleton should be.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape: SkeletonShape;
    /**
     * Indicates that the component can accept a pattern URL.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    pattern: string;
    /**
     * Indicates that the component has an activated shimmer effect
     *
     * @public
     * @remarks
     * HTML Attribute: shimmer
     */
    shimmer: boolean;
}

/**
 * A structure representing skeleton shapes
 * @public
 */
export declare type SkeletonShape = "rect" | "circle";

/**
 * The template for the fast-skeleton component
 * @public
 */
export declare const skeletonTemplate: FoundationElementTemplate<ViewTemplate<Skeleton>>;

/**
 * A Slider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#slider | ARIA slider }.
 *
 * @slot track - The track of the slider
 * @slot track-start - The track-start visual indicator
 * @slot thumb - The slider thumb
 * @slot - The default slot for labels
 * @csspart positioning-region - The region used to position the elements of the slider
 * @csspart track-container - The region containing the track elements
 * @csspart track-start - The element wrapping the track start slot
 * @csspart thumb-container - The thumb container element which is programatically positioned
 * @fires change - Fires a custom 'change' event when the slider value changes
 *
 * @public
 */
export declare class Slider extends FormAssociatedSlider implements SliderConfiguration {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     *
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * @internal
     */
    track: HTMLDivElement;
    /**
     * @internal
     */
    thumb: HTMLDivElement;
    /**
     * @internal
     */
    stepMultiplier: number;
    /**
     * @internal
     */
    direction: Direction;
    /**
     * @internal
     */
    isDragging: boolean;
    /**
     * @internal
     */
    position: string;
    /**
     * @internal
     */
    trackWidth: number;
    /**
     * @internal
     */
    trackMinWidth: number;
    /**
     * @internal
     */
    trackHeight: number;
    /**
     * @internal
     */
    trackLeft: number;
    /**
     * @internal
     */
    trackMinHeight: number;
    /**
     * The value property, typed as a number.
     *
     * @public
     */
    get valueAsNumber(): number;
    set valueAsNumber(next: number);
    /**
     * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
     *
     * @public
     */
    valueTextFormatter: (value: string) => string | null;
    /**
     * @internal
     */
    valueChanged(previous: string, next: string): void;
    /**
     * The minimum allowed value.
     *
     * @defaultValue - 0
     * @public
     * @remarks
     * HTML Attribute: min
     */
    min: number;
    private minChanged;
    /**
     * The maximum allowed value.
     *
     * @defaultValue - 10
     * @public
     * @remarks
     * HTML Attribute: max
     */
    max: number;
    private maxChanged;
    /**
     * Value to increment or decrement via arrow keys, mouse click or drag.
     *
     * @public
     * @remarks
     * HTML Attribute: step
     */
    step: number;
    private stepChanged;
    /**
     * The orientation of the slider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: Orientation;
    private orientationChanged;
    /**
     * The selection mode.
     *
     * @public
     * @remarks
     * HTML Attribute: mode
     */
    mode: SliderMode;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Increment the value by the step
     *
     * @public
     */
    increment(): void;
    /**
     * Decrement the value by the step
     *
     * @public
     */
    decrement(): void;
    protected keypressHandler: (e: KeyboardEvent) => void;
    /**
     * Places the thumb based on the current value
     *
     * @public
     * @param direction - writing mode
     */
    private setThumbPositionForOrientation;
    /**
     * Update the step multiplier used to ensure rounding errors from steps that
     * are not whole numbers
     */
    private updateStepMultiplier;
    private setupTrackConstraints;
    private setupListeners;
    /**
     * @internal
     */
    initialValue: string;
    private get midpoint();
    private setupDefaultValue;
    /**
     *  Handle mouse moves during a thumb drag operation
     *  If the event handler is null it removes the events
     */
    private handleThumbMouseDown;
    /**
     *  Handle mouse moves during a thumb drag operation
     */
    private handleMouseMove;
    private calculateNewValue;
    /**
     * Handle a window mouse up during a drag operation
     */
    private handleWindowMouseUp;
    private stopDragging;
    /**
     *
     * @param e - MouseEvent or null. If there is no event handler it will remove the events
     */
    private handleMouseDown;
    private convertToConstrainedValue;
}

declare class _Slider extends FoundationElement {
}

declare interface _Slider extends FormAssociated {
}

/**
 * The configuration structure of {@link @microsoft/fast-foundation#(Slider:class)}.
 * @public
 */
export declare interface SliderConfiguration {
    max: number;
    min: number;
    orientation?: Orientation;
    direction?: Direction;
    disabled?: boolean;
}

/**
 * A label element intended to be used with the {@link @microsoft/fast-foundation#(Slider:class)} component.
 *
 * @slot - The default slot for the label content
 * @csspart root - The element wrapping the label mark and text
 *
 * @public
 */
export declare class SliderLabel extends FoundationElement {
    /**
     * @internal
     */
    positionStyle: string;
    /**
     * @internal
     */
    root: HTMLDivElement;
    /**
     * The position of the label relative to the min and max value of the parent {@link @microsoft/fast-foundation#(Slider:class)}.
     *
     * @public
     * @remarks
     * HTML Attribute: position
     */
    position: string;
    private positionChanged;
    /**
     * Hides the tick mark.
     *
     * @public
     * @remarks
     * HTML Attribute: hide-mark
     */
    hideMark: boolean;
    /**
     * The disabled state of the label. This is generally controlled by the parent {@link @microsoft/fast-foundation#(Slider:class)}.
     *
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     * @internal
     */
    sliderOrientation: Orientation;
    /**
     * @internal
     */
    protected sliderOrientationChanged(): void;
    /**
     * @internal
     */
    sliderMinPosition: number;
    /**
     * @internal
     */
    sliderMaxPosition: number;
    /**
     * @internal
     */
    sliderDirection: Direction;
    private notifier;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleChange(source: any, propertyName: string): void;
    private isSliderConfig;
    private getSliderConfiguration;
    private positionAsStyle;
}

/**
 * The template for the {@link @microsoft/fast-foundation#(SliderLabel:class)} component.
 * @public
 */
export declare const sliderLabelTemplate: FoundationElementTemplate<ViewTemplate<SliderLabel>>;

/**
 * The selection modes of a {@link @microsoft/fast-foundation#(Slider:class)}.
 * @public
 */
export declare const SliderMode: {
    readonly singleValue: "single-value";
};

/**
 * The types for the selection mode of the slider
 * @public
 */
export declare type SliderMode = typeof SliderMode[keyof typeof SliderMode];

/**
 * Slider configuration options
 * @public
 */
export declare type SliderOptions = FoundationElementDefinition & {
    thumb?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Slider:class)} component.
 * @public
 */
export declare const sliderTemplate: FoundationElementTemplate<ViewTemplate<Slider>, SliderOptions>;

/**
 * A mixin class implementing start and end elements.
 * These are generally used to decorate text elements with icons or other visual indicators.
 * @public
 */
export declare class StartEnd {
    start: HTMLSlotElement;
    startContainer: HTMLSpanElement;
    handleStartContentChange(): void;
    end: HTMLSlotElement;
    endContainer: HTMLSpanElement;
    handleEndContentChange(): void;
}

/**
 * Start/End configuration options
 * @public
 */
export declare type StartEndOptions = StartOptions & EndOptions;

/**
 * Start configuration options
 * @public
 */
export declare type StartOptions = {
    start?: string | SyntheticViewTemplate;
};

/**
 * The template for the start element.
 * For use with {@link StartEnd}
 *
 * @public
 */
export declare const startSlotTemplate: (context: ElementDefinitionContext, definition: StartOptions) => ViewTemplate<StartEnd>;

/**
 * The template for the start element.
 * For use with {@link StartEnd}
 *
 * @public
 * @deprecated - use startSlotTemplate
 */
export declare const startTemplate: ViewTemplate<StartEnd>;

/**
 * A design token value with no observable dependencies
 * @public
 */
export declare type StaticDesignTokenValue<T> = T extends Function ? never : T;

/**
 * @alpha
 */
export declare const supportsElementInternals: boolean;

/**
 * A Switch Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#switch | ARIA switch }.
 *
 * @slot - The deafult slot for the label
 * @slot checked-message - The message when in a checked state
 * @slot unchecked-message - The message when in an unchecked state
 * @csspart label - The label
 * @csspart switch - The element representing the switch, which wraps the indicator
 * @csspart status-message - The wrapper for the status messages
 * @csspart checked-message - The checked message
 * @csspart unchecked-message - The unchecked message
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export declare class Switch extends FormAssociatedSwitch {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    initialValue: string;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    constructor();
    /**
     * @internal
     */
    keypressHandler: (e: KeyboardEvent) => void;
    /**
     * @internal
     */
    clickHandler: (e: MouseEvent) => void;
    /**
     * @internal
     */
    checkedChanged(prev: boolean | undefined, next: boolean): void;
}

declare class _Switch extends FoundationElement {
}

declare interface _Switch extends CheckableFormAssociated {
}

/**
 * Switch configuration options
 * @public
 */
export declare type SwitchOptions = FoundationElementDefinition & {
    switch?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Switch:class)} component.
 * @public
 */
export declare const switchTemplate: FoundationElementTemplate<ViewTemplate<Switch>, SwitchOptions>;

/**
 * A Tab Component to be used with {@link @microsoft/fast-foundation#(Tabs:class)}
 *
 * @slot - The default slot for the tab content
 *
 * @public
 */
export declare class Tab extends FoundationElement {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
}

/**
 * A TabPanel Component to be used with {@link @microsoft/fast-foundation#(Tabs:class)}
 *
 * @slot - The default slot for the tabpanel content
 *
 * @public
 */
export declare class TabPanel extends FoundationElement {
}

/**
 * The template for the {@link @microsoft/fast-foundation#TabPanel} component.
 * @public
 */
export declare const tabPanelTemplate: FoundationElementTemplate<ViewTemplate<TabPanel>>;

/**
 * A Tabs Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#tablist | ARIA tablist }.
 *
 * @slot start - Content which can be provided before the tablist element
 * @slot end - Content which can be provided after the tablist element
 * @slot tab - The slot for tabs
 * @slot tabpanel - The slot for tabpanels
 * @csspart tablist - The element wrapping for the tabs
 * @csspart tab - The tab slot
 * @csspart activeIndicator - The visual indicator
 * @csspart tabpanel - The tabpanel slot
 * @fires change - Fires a custom 'change' event when a tab is clicked or during keyboard navigation
 *
 * @public
 */
export declare class Tabs extends FoundationElement {
    /**
     * The orientation
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: TabsOrientation;
    /**
     * @internal
     */
    orientationChanged(): void;
    /**
     * The id of the active tab
     *
     * @public
     * @remarks
     * HTML Attribute: activeid
     */
    activeid: string;
    /**
     * @internal
     */
    activeidChanged(oldValue: string, newValue: string): void;
    /**
     * @internal
     */
    tabs: HTMLElement[];
    /**
     * @internal
     */
    tabsChanged(): void;
    /**
     * @internal
     */
    tabpanels: HTMLElement[];
    /**
     * @internal
     */
    tabpanelsChanged(): void;
    /**
     * Whether or not to show the active indicator
     * @public
     * @remarks
     * HTML Attribute: activeindicator
     */
    activeindicator: boolean;
    /**
     * @internal
     */
    activeIndicatorRef: HTMLElement;
    /**
     * @internal
     */
    showActiveIndicator: boolean;
    /**
     * A reference to the active tab
     * @public
     */
    activetab: HTMLElement;
    private prevActiveTabIndex;
    private activeTabIndex;
    private ticking;
    private tabIds;
    private tabpanelIds;
    private change;
    private isDisabledElement;
    private isFocusableElement;
    private getActiveIndex;
    private setTabs;
    private setTabPanels;
    private getTabIds;
    private getTabPanelIds;
    private setComponent;
    private handleTabClick;
    private isHorizontal;
    private handleTabKeyDown;
    private handleActiveIndicatorPosition;
    private animateActiveIndicator;
    /**
     * The adjust method for FASTTabs
     * @public
     * @remarks
     * This method allows the active index to be adjusted by numerical increments
     */
    adjust(adjustment: number): void;
    private adjustForward;
    private adjustBackward;
    private moveToTabByIndex;
    private focusTab;
    /**
     * @internal
     */
    connectedCallback(): void;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface Tabs extends StartEnd {
}

/**
 * Tabs option configuration options
 * @public
 */
export declare type TabsOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The orientation of the {@link @microsoft/fast-foundation#(Tabs:class)} component
 * @public
 */
export declare const TabsOrientation: {
    readonly vertical: "vertical";
    readonly horizontal: "horizontal";
};

/**
 * The types for the Tabs component
 * @public
 */
export declare type TabsOrientation = typeof TabsOrientation[keyof typeof TabsOrientation];

/**
 * The template for the {@link @microsoft/fast-foundation#(Tabs:class)} component.
 * @public
 */
export declare const tabsTemplate: FoundationElementTemplate<ViewTemplate<Tabs>, TabsOptions>;

/**
 * The template for the {@link @microsoft/fast-foundation#Tab} component.
 * @public
 */
export declare const tabTemplate: FoundationElementTemplate<ViewTemplate<Tab>>;

/**
 * A Text Area Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea | <textarea> element }.
 *
 * @slot - The default slot for the label
 * @csspart label - The label
 * @csspart root - The element wrapping the control
 * @csspart control - The textarea element
 * @fires change - Emits a custom 'change' event when the textarea emits a change event
 *
 * @public
 */
export declare class TextArea extends FormAssociatedTextArea {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * The resize mode of the element.
     * @public
     * @remarks
     * HTML Attribute: resize
     */
    resize: TextAreaResize;
    /**
     * A reference to the internal textarea element
     * @internal
     */
    control: HTMLTextAreaElement;
    /**
     * Indicates that this element should get focus after the page finishes loading.
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    private autofocusChanged;
    /**
     * The {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id | id} of the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form | form} the element is associated to
     * @public
     */
    formId: string;
    /**
     * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
     * @public
     * @remarks
     * HTML Attribute: list
     */
    list: string;
    private listChanged;
    /**
     * The maximum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: maxlength
     */
    maxlength: number;
    private maxlengthChanged;
    /**
     * The minimum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: minlength
     */
    minlength: number;
    private minlengthChanged;
    /**
     * The name of the element.
     * @public
     * @remarks
     * HTML Attribute: name
     */
    name: string;
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute does is not a valid substitute for a labeling element.
     */
    placeholder: string;
    /**
     * Sizes the element horizontally by a number of character columns.
     *
     * @public
     * @remarks
     * HTML Attribute: cols
     */
    cols: number;
    /**
     * Sizes the element vertically by a number of character rows.
     *
     * @public
     * @remarks
     * HTML Attribute: rows
     */
    rows: number;
    /**
     * Sets if the element is eligible for spell checking
     * but the UA.
     * @public
     * @remarks
     * HTML Attribute: spellcheck
     */
    spellcheck: boolean;
    private spellcheckChanged;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * Selects all the text in the text area
     *
     * @public
     */
    protected select(): void;
    /**
     * @internal
     */
    handleTextInput: () => void;
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange(): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface TextArea extends DelegatesARIATextbox {
}

declare class _TextArea extends FoundationElement {
}

declare interface _TextArea extends FormAssociated {
}

/**
 * Resize mode for a TextArea
 * @public
 */
export declare const TextAreaResize: {
    /**
     * No resize.
     */
    readonly none: "none";
    /**
     * Resize vertically and horizontally.
     */
    readonly both: "both";
    /**
     * Resize horizontally.
     */
    readonly horizontal: "horizontal";
    /**
     * Resize vertically.
     */
    readonly vertical: "vertical";
};

/**
 * Types for the Text Area resize mode
 * @public
 */
export declare type TextAreaResize = typeof TextAreaResize[keyof typeof TextAreaResize];

/**
 * The template for the {@link @microsoft/fast-foundation#(TextArea:class)} component.
 * @public
 */
export declare const textAreaTemplate: FoundationElementTemplate<ViewTemplate<TextArea>>;

/**
 * A Text Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text | <input type="text" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The text field element
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
export declare class TextField extends FormAssociatedTextField {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    private readOnlyChanged;
    /**
     * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    private autofocusChanged;
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute does is not a valid substitute for a labeling element.
     */
    placeholder: string;
    private placeholderChanged;
    /**
     * Allows setting a type or mode of text.
     * @public
     * @remarks
     * HTML Attribute: type
     */
    type: TextFieldType;
    private typeChanged;
    /**
     * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
     * @public
     * @remarks
     * HTML Attribute: list
     */
    list: string;
    private listChanged;
    /**
     * The maximum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: maxlength
     */
    maxlength: number;
    private maxlengthChanged;
    /**
     * The minimum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: minlength
     */
    minlength: number;
    private minlengthChanged;
    /**
     * A regular expression that the value must match to pass validation.
     * @public
     * @remarks
     * HTMLAttribute: pattern
     */
    pattern: string;
    private patternChanged;
    /**
     * Sets the width of the element to a specified number of characters.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    size: number;
    private sizeChanged;
    /**
     * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    spellcheck: boolean;
    private spellcheckChanged;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * A reference to the internal input element
     * @internal
     */
    control: HTMLInputElement;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * Selects all the text in the text field
     *
     * @public
     */
    protected select(): void;
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput(): void;
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange(): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export declare interface TextField extends StartEnd, DelegatesARIATextbox {
}

declare class _TextField extends FoundationElement {
}

declare interface _TextField extends FormAssociated {
}

/**
 * Text field configuration options
 * @public
 */
export declare type TextFieldOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The template for the {@link @microsoft/fast-foundation#(TextField:class)} component.
 * @public
 */
export declare const textFieldTemplate: FoundationElementTemplate<ViewTemplate<TextField>, TextFieldOptions>;

/**
 * Text field sub-types
 * @public
 */
export declare const TextFieldType: {
    /**
     * An email TextField
     */
    readonly email: "email";
    /**
     * A password TextField
     */
    readonly password: "password";
    /**
     * A telephone TextField
     */
    readonly tel: "tel";
    /**
     * A text TextField
     */
    readonly text: "text";
    /**
     * A URL TextField
     */
    readonly url: "url";
};

/**
 * Types for the text field sub-types
 * @public
 */
export declare type TextFieldType = typeof TextFieldType[keyof typeof TextFieldType];

/**
 * A Toolbar Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#Toolbar|ARIA Toolbar}.
 *
 * @slot start - Content which can be provided before the slotted items
 * @slot end - Content which can be provided after the slotted items
 * @slot - The default slot for slotted items
 * @slot label - The toolbar label
 * @csspart positioning-region - The element containing the items, start and end slots
 *
 * @public
 */
export declare class Toolbar extends FoundationElement {
    /**
     * The internal index of the currently focused element.
     *
     * @internal
     */
    private _activeIndex;
    /**
     * The index of the currently focused element, clamped between 0 and the last element.
     *
     * @internal
     */
    get activeIndex(): number;
    set activeIndex(value: number);
    /**
     * The text direction of the toolbar.
     *
     * @internal
     */
    direction: Direction;
    /**
     * The collection of focusable toolbar controls.
     *
     * @internal
     */
    private focusableElements;
    /**
     * The orientation of the toolbar.
     *
     * @public
     * @remarks
     * HTML Attribute: `orientation`
     */
    orientation: Orientation;
    /**
     * The elements in the default slot.
     *
     * @internal
     */
    slottedItems: HTMLElement[];
    protected slottedItemsChanged(): void;
    /**
     * The elements in the label slot.
     *
     * @internal
     */
    slottedLabel: HTMLElement[];
    /**
     * Set the activeIndex when a focusable element in the toolbar is clicked.
     *
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    childItems: Element[];
    protected childItemsChanged(prev: undefined | Element[], next: Element[]): void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * When the toolbar receives focus, set the currently active element as focused.
     *
     * @internal
     */
    focusinHandler(e: FocusEvent): boolean | void;
    /**
     * Determines a value that can be used to iterate a list with the arrow keys.
     *
     * @param this - An element with an orientation and direction
     * @param key - The event key value
     * @internal
     */
    private getDirectionalIncrementer;
    /**
     * Handle keyboard events for the toolbar.
     *
     * @internal
     */
    keydownHandler(e: KeyboardEvent): boolean | void;
    /**
     * get all the slotted elements
     * @internal
     */
    protected get allSlottedItems(): (HTMLElement | Node)[];
    /**
     * Prepare the slotted elements which can be focusable.
     *
     * @internal
     */
    protected reduceFocusableElements(): void;
    /**
     * Set the activeIndex and focus the corresponding control.
     *
     * @param activeIndex - The new index to set
     * @internal
     */
    private setFocusedElement;
    /**
     * Reduce a collection to only its focusable elements.
     *
     * @param elements - Collection of elements to reduce
     * @param element - The current element
     *
     * @internal
     */
    private static reduceFocusableItems;
    /**
     * @internal
     */
    private setFocusableElements;
}

/**
 * @internal
 */
export declare interface Toolbar extends StartEnd, DelegatesARIAToolbar {
}

/**
 * Toolbar configuration options
 * @public
 */
export declare type ToolbarOptions = FoundationElementDefinition & StartEndOptions;

/**
 * The template for the {@link @microsoft/fast-foundation#(Toolbar:class)} component.
 *
 * @public
 */
export declare const toolbarTemplate: FoundationElementTemplate<ViewTemplate<Toolbar>, ToolbarOptions>;

/**
 * An Tooltip Custom HTML Element.
 *
 * @slot - The default slot for the tooltip content
 * @csspart tooltip - The tooltip element
 * @fires dismiss - Fires a custom 'dismiss' event when the tooltip is visible and escape key is pressed
 *
 * @public
 */
export declare class Tooltip extends FoundationElement {
    /**
     * Whether the tooltip is visible or not.
     * If undefined tooltip is shown when anchor element is hovered
     *
     * @defaultValue - undefined
     * @public
     * HTML Attribute: visible
     */
    visible: boolean;
    private visibleChanged;
    /**
     * The id of the element the tooltip is anchored to
     *
     * @defaultValue - undefined
     * @public
     * HTML Attribute: anchor
     */
    anchor: string;
    private anchorChanged;
    /**
     * The delay in milliseconds before a tooltip is shown after a hover event
     *
     * @defaultValue - 300
     * @public
     * HTML Attribute: delay
     */
    delay: number;
    /**
     * Controls the placement of the tooltip relative to the anchor.
     * When the position is undefined the tooltip is placed above or below the anchor based on available space.
     *
     * @defaultValue - undefined
     * @public
     * HTML Attribute: position
     */
    position: TooltipPosition;
    private positionChanged;
    /**
     * Controls when the tooltip updates its position, default is 'anchor' which only updates when
     * the anchor is resized.  'auto' will update on scroll/resize events.
     * Corresponds to anchored-region auto-update-mode.
     * @public
     * @remarks
     * HTML Attribute: auto-update-mode
     */
    autoUpdateMode: AutoUpdateMode;
    /**
     * Controls if the tooltip will always remain fully in the viewport on the horizontal axis
     * @public
     * @remarks
     * HTML Attribute: horizontal-viewport-lock
     */
    horizontalViewportLock: boolean;
    /**
     * Controls if the tooltip will always remain fully in the viewport on the vertical axis
     * @public
     * @remarks
     * HTML Attribute: vertical-viewport-lock
     */
    verticalViewportLock: boolean;
    /**
     * the html element currently being used as anchor.
     * Setting this directly overrides the anchor attribute.
     *
     * @public
     */
    anchorElement: HTMLElement | null;
    private anchorElementChanged;
    /**
     * The current viewport element instance
     *
     * @internal
     */
    viewportElement: HTMLElement | null;
    private viewportElementChanged;
    /**
     * @internal
     * @defaultValue "dynamic"
     */
    verticalPositioningMode: AxisPositioningMode;
    /**
     * @internal
     * @defaultValue "dynamic"
     */
    horizontalPositioningMode: AxisPositioningMode;
    /**
     * @internal
     */
    horizontalInset: string;
    /**
     * @internal
     */
    verticalInset: string;
    /**
     * @internal
     */
    horizontalScaling: AxisScalingMode;
    /**
     * @internal
     */
    verticalScaling: AxisScalingMode;
    /**
     * @internal
     */
    verticalDefaultPosition: string | undefined;
    /**
     * @internal
     */
    horizontalDefaultPosition: string | undefined;
    /**
     * @internal
     */
    tooltipVisible: boolean;
    /**
     * Track current direction to pass to the anchored region
     * updated when tooltip is shown
     *
     * @internal
     */
    currentDirection: Direction;
    /**
     * reference to the anchored region
     *
     * @internal
     */
    region: AnchoredRegion;
    /**
     * The timer that tracks delay time before the tooltip is shown on hover
     */
    private showDelayTimer;
    /**
     * The timer that tracks delay time before the tooltip is hidden
     */
    private hideDelayTimer;
    /**
     * Indicates whether the anchor is currently being hovered or has focus
     */
    private isAnchorHoveredFocused;
    /**
     * Indicates whether the region is currently being hovered
     */
    private isRegionHovered;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * invoked when the anchored region's position relative to the anchor changes
     *
     * @internal
     */
    handlePositionChange: (ev: Event) => void;
    /**
     * mouse enters region
     */
    private handleRegionMouseOver;
    /**
     * mouse leaves region
     */
    private handleRegionMouseOut;
    /**
     * mouse enters anchor
     */
    private handleAnchorMouseOver;
    /**
     * mouse leaves anchor
     */
    private handleAnchorMouseOut;
    /**
     * anchor gets focus
     */
    private handleAnchorFocusIn;
    /**
     * anchor loses focus
     */
    private handleAnchorFocusOut;
    /**
     * starts the hide timer
     */
    private startHideDelayTimer;
    /**
     * clears the hide delay
     */
    private clearHideDelayTimer;
    /**
     * starts the show timer if not currently running
     */
    private startShowDelayTimer;
    /**
     * start hover
     */
    private startHover;
    /**
     * clears the show delay
     */
    private clearShowDelayTimer;
    /**
     * updated the properties being passed to the anchored region
     */
    private updateLayout;
    /**
     *  Gets the anchor element by id
     */
    private getAnchor;
    /**
     * handles key down events to check for dismiss
     */
    private handleDocumentKeydown;
    /**
     * determines whether to show or hide the tooltip based on current state
     */
    private updateTooltipVisibility;
    /**
     * shows the tooltip
     */
    private showTooltip;
    /**
     * hides the tooltip
     */
    private hideTooltip;
    /**
     * updates the tooltip anchored region props after it has been
     * added to the DOM
     */
    private setRegionProps;
}

/**
 * Enumerates possible tooltip positions
 *
 * @public
 */
export declare const TooltipPosition: {
    /**
     * The tooltip is positioned above the element
     */
    readonly top: "top";
    /**
     * The tooltip is positioned to the right of the element
     */
    readonly right: "right";
    /**
     * The tooltip is positioned below the element
     */
    readonly bottom: "bottom";
    /**
     * The tooltip is positioned to the left of the element
     */
    readonly left: "left";
    /**
     * The tooltip is positioned before the element
     */
    readonly start: "start";
    /**
     * The tooltip is positioned after the element
     */
    readonly end: "end";
    /**
     * The tooltip is positioned above the element and to the left
     */
    readonly topLeft: "top-left";
    /**
     * The tooltip is positioned above the element and to the right
     */
    readonly topRight: "top-right";
    /**
     * The tooltip is positioned below the element and to the left
     */
    readonly bottomLeft: "bottom-left";
    /**
     * The tooltip is positioned below the element and to the right
     */
    readonly bottomRight: "bottom-right";
    /**
     * The tooltip is positioned above the element and to the left
     */
    readonly topStart: "top-start";
    /**
     * The tooltip is positioned above the element and to the right
     */
    readonly topEnd: "top-end";
    /**
     * The tooltip is positioned below the element and to the left
     */
    readonly bottomStart: "bottom-start";
    /**
     * The tooltip is positioned below the element and to the right
     */
    readonly bottomEnd: "bottom-end";
};

/**
 * The possible tooltip positions
 *
 * @public
 */
export declare type TooltipPosition = typeof TooltipPosition[keyof typeof TooltipPosition];

/**
 * Creates a template for the {@link @microsoft/fast-foundation#(Tooltip:class)} component using the provided prefix.
 * @public
 */
export declare const tooltipTemplate: FoundationElementTemplate<ViewTemplate<Tooltip>>;

/**
 * Transforms an object after it is created but before it is returned
 * to the requestor.
 * @public
 */
declare type Transformer_2<K> = (instance: Resolved<K>) => Resolved<K>;
export { Transformer_2 as Transformer }

/**
 * Registers the decorated class as a transient dependency; each time the dependency is resolved
 * a new instance will be created.
 *
 * @example
 * ```ts
 * @transient()
 * class Foo { }
 * ```
 *
 * @public
 */
export declare function transient<T extends Constructable>(): typeof transientDecorator;

/**
 * Registers the `target` class as a transient dependency; each time the dependency is resolved
 * a new instance will be created.
 *
 * @param target - The class / constructor function to register as transient.
 *
 * @example
 * ```ts
 * @transient()
 * class Foo { }
 * ```
 *
 * @public
 */
export declare function transient<T extends Constructable>(target: T & Partial<RegisterSelf<T>>): T & RegisterSelf<T>;

declare function transientDecorator<T extends Constructable>(target: T & Partial<RegisterSelf<T>>): T & RegisterSelf<T>;

/**
 * A Tree item Custom HTML Element.
 *
 * @slot start - Content which can be provided before the tree item content
 * @slot end - Content which can be provided after the tree item content
 * @slot - The default slot for tree item text content
 * @slot item - The slot for tree items (fast tree items manage this assignment themselves)
 * @slot expand-collapse-button - The expand/collapse button
 * @csspart positioning-region - The element used to position the tree item content with exception of any child nodes
 * @csspart content-region - The element containing the expand/collapse, start, and end slots
 * @csspart items - The element wrapping any child items
 * @csspart expand-collapse-button - The expand/collapse button
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires selected-change - Fires a custom 'selected-change' event when the selected state changes
 *
 * @public
 */
export declare class TreeItem extends FoundationElement {
    /**
     * When true, the control will be appear expanded by user interaction.
     * @public
     * @remarks
     * HTML Attribute: expanded
     */
    expanded: boolean;
    private expandedChanged;
    /**
     * When true, the control will appear selected by user interaction.
     * @public
     * @remarks
     * HTML Attribute: selected
     */
    selected: boolean;
    private selectedChanged;
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     *  Reference to the expand/collapse button
     *
     * @internal
     */
    expandCollapseButton: HTMLDivElement;
    /**
     * Whether the item is focusable
     *
     * @internal
     */
    focusable: boolean;
    /**
     *
     *
     * @internal
     */
    childItems: HTMLElement[];
    /**
     * The slotted child tree items
     *
     * @internal
     */
    items: HTMLElement[];
    private itemsChanged;
    /**
     * Indicates if the tree item is nested
     *
     * @internal
     */
    nested: boolean;
    /**
     *
     *
     * @internal
     */
    renderCollapsedChildren: boolean;
    /**
     * Places document focus on a tree item
     *
     * @public
     * @param el - the element to focus
     */
    static focusItem(el: HTMLElement): void;
    /**
     * Whether the tree is nested
     *
     * @public
     */
    readonly isNestedItem: () => boolean;
    /**
     * Handle expand button click
     *
     * @internal
     */
    handleExpandCollapseButtonClick: (e: MouseEvent) => void;
    /**
     * Handle focus events
     *
     * @internal
     */
    handleFocus: (e: FocusEvent) => void;
    /**
     * Handle blur events
     *
     * @internal
     */
    handleBlur: (e: FocusEvent) => void;
    /**
     * Gets number of children
     *
     * @internal
     */
    childItemLength(): number;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast-dna/issues/3317
 * @internal
 */
export declare interface TreeItem extends StartEnd {
}

/**
 * Tree Item configuration options
 * @public
 */
export declare type TreeItemOptions = FoundationElementDefinition & StartEndOptions & {
    expandCollapseGlyph?: string | SyntheticViewTemplate;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(TreeItem:class)} component.
 * @public
 */
export declare const treeItemTemplate: FoundationElementTemplate<ViewTemplate<TreeItem>, TreeItemOptions>;

/**
 * A Tree view Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#TreeView | ARIA TreeView }.
 *
 * @slot - The default slot for tree items
 *
 * @public
 */
export declare class TreeView extends FoundationElement {
    /**
     /**
     * When true, the control will be appear expanded by user interaction.
     * @public
     * @remarks
     * HTML Attribute: render-collapsed-nodes
     */
    renderCollapsedNodes: boolean;
    /**
     * The currently selected tree item
     * @public
     */
    currentSelected: HTMLElement | TreeItem | null;
    /**
     *  Slotted children
     *
     * @internal
     */
    slottedTreeItems: HTMLElement[];
    private slottedTreeItemsChanged;
    /**
     * The tree item that is designated to be in the tab queue.
     *
     * @internal
     */
    currentFocused: HTMLElement | TreeItem | null;
    /**
     * Handle focus events
     *
     * @internal
     */
    handleFocus: (e: FocusEvent) => void;
    /**
     * Handle blur events
     *
     * @internal
     */
    handleBlur: (e: FocusEvent) => void;
    /**
     * ref to the tree item
     *
     * @internal
     */
    treeView: HTMLElement;
    private nested;
    connectedCallback(): void;
    /**
     * KeyDown handler
     *
     *  @internal
     */
    handleKeyDown: (e: KeyboardEvent) => boolean | void;
    /**
     * Handles click events bubbling up
     *
     *  @internal
     */
    handleClick(e: Event): boolean | void;
    /**
     * Handles the selected-changed events bubbling up
     * from child tree items
     *
     *  @internal
     */
    handleSelectedChange: (e: Event) => boolean | void;
    /**
     * Move focus to a tree item based on its offset from the provided item
     */
    private focusNextNode;
    /**
     * Updates the tree view when slottedTreeItems changes
     */
    private setItems;
    /**
     * checks if there are any nested tree items
     */
    private getValidFocusableItem;
    /**
     * checks if there are any nested tree items
     */
    private checkForNestedItems;
    /**
     * check if the item is focusable
     */
    private isFocusableElement;
    private isSelectedElement;
    private getVisibleNodes;
}

/**
 * The template for the {@link @microsoft/fast-foundation#TreeView} component.
 * @public
 */
export declare const treeViewTemplate: FoundationElementTemplate<ViewTemplate<TreeView>>;

/** @internal */
export declare function validateKey(key: any): void;

/**
 * This file enables typing support for ElementInternals APIs.
 * It is largely taken from https://github.com/microsoft/TSJS-lib-generator/pull/818/files.
 *
 * When TypeScript adds support for these APIs we can delete this file.
 */
declare interface ValidityStateFlags {
    badInput?: boolean;
    customError?: boolean;
    patternMismatch?: boolean;
    rangeOverflow?: boolean;
    rangeUnderflow?: boolean;
    stepMismatch?: boolean;
    tooLong?: boolean;
    tooShort?: boolean;
    typeMismatch?: boolean;
    valueMissing?: boolean;
}

/**
 * Defines the vertical positioning options for an anchored region
 *
 * @public
 */
export declare type VerticalPosition = "top" | "bottom" | "center" | "unset";

/**
 * A type representing the different weekday formats
 * @public
 */
export declare type WeekdayFormat = "long" | "narrow" | "short";

/**
 * a method to filter out any whitespace _only_ nodes, to be used inside a template
 * @param value - The Node that is being inspected
 * @param index - The index of the node within the array
 * @param array - The Node array that is being filtered
 *
 * @public
 */
export declare function whitespaceFilter(value: Node, index: number, array: Node[]): boolean;

/**
 * A type representing the different year formats
 * @public
 */
export declare type YearFormat = "2-digit" | "numeric";

export { }
