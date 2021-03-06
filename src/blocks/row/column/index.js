/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Edit from './components/edit';
import icons from './../../../utils/icons';
import BackgroundImagePanel, { BackgroundAttributes, BackgroundClasses, BackgroundImageTransforms } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, getBlockType } = wp.blocks;
const { RichText, InnerBlocks, getColorClassName } = wp.editor;

/**
 * Block constants
 */
const name = 'column';

const title = __( 'Column' );

const icon = icons.column;

const blockAttributes = {
	width: {
		type: 'string',
	},
	contentAlign: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customTextColor: {
		type: 'string',
	},
	...DimensionsAttributes,
	...BackgroundAttributes,
};

const settings = {

	title: title,

	description: __( 'An immediate child of a row.' ),

	attributes: blockAttributes,

	parent: [ 'coblocks/row' ],

	supports: {
		inserter: false,
	},

	edit: Edit,

	getEditWrapperProps( attributes ) {

		const { paddingSize } = attributes;

		// If the column block has children, return the following.
		if ( paddingSize != 'advanced' && paddingSize == 'no' ) {
			return { 'data-background-dropzone': false };
		}
	},

	save( { attributes } ) {

		const {
			coblocks,
			backgroundColor,
			backgroundImg,
			customBackgroundColor,
			textColor,
			customTextColor,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			paddingUnit,
			paddingSyncUnits,
			marginSyncUnits,
			marginSize,
			paddingSize,
			contentAlign,
		} = attributes;
		const textClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames({
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			[ `coblocks-column-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
		} );

		const innerClasses = classnames(
			'wp-block-coblocks-column__inner',
			...BackgroundClasses( attributes ), {
			'has-padding': paddingSize && paddingSize != 'no',
			'has-margin': marginSize && marginSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
			[ `has-${ marginSize }-margin` ] : marginSize && ( marginSize != 'advanced' ),
		} );

		const styles = {
			color: textClass ? undefined : customTextColor,
			textAlign: contentAlign ? contentAlign : null,
		};

		const innerStyles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			// paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			// paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			// paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			// paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
			// marginTop: marginSize === 'advanced' && marginTop ? marginTop + marginUnit : undefined,
			// marginRight: marginSize === 'advanced' && marginRight ? marginRight + marginUnit : undefined,
			// marginBottom: marginSize === 'advanced' && marginBottom ? marginBottom + marginUnit : undefined,
			// marginLeft: marginSize === 'advanced' && marginLeft ? marginLeft + marginUnit : undefined,
		};

		return (
			<div className={ classes } style={ styles } >
				<div className={ innerClasses } style={ innerStyles }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };
