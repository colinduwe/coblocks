/**
 * Internal dependencies
 */
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { toggleFormat } = wp.richText;
const { RichTextToolbarButton, RichTextShortcut } = wp.editor;

/**
 * Block constants
 */
const name = 'coblocks/uppercase';

export const uppercase = {
	name,
	title: __( 'Uppercase' ),
	tagName: 'span',
	className: 'uppercase',
	edit( { isActive, value, onChange } ) {
		const onToggle = () => onChange( toggleFormat( value, { type: name } ) );
		
		return (
			<Fragment>
				<RichTextShortcut
					type="access"
					character="u"
					onUse={ onToggle }
				/>
				<RichTextToolbarButton
					icon={ icons.formatUppercase }
					title={ __( 'Uppercase' ) }
					onClick={ onToggle }
					isActive={ isActive }
					shortcutType="access"
					shortcutCharacter="u"
				/>
			</Fragment>
		);
		
	},
};
