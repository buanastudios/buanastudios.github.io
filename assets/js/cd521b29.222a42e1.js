"use strict";(self.webpackChunk_eightshift_docs=self.webpackChunk_eightshift_docs||[]).push([[97817],{77927:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var s=n(74848),o=n(28453);const i={title:"Using multiple same components",description:"Explains how to use multiple same components inside",slug:"multiple-same-components",authors:"obradovic",date:new Date("2023-06-12T00:00:00.000Z"),tags:["eightshift","boilerplate","components","blocks"],hide_table_of_contents:!1},a=void 0,r={permalink:"/blog/multiple-same-components",source:"@site/blog/2023-06-12-multiple-same-components.md",title:"Using multiple same components",description:"Explains how to use multiple same components inside",date:"2023-06-12T00:00:00.000Z",tags:[{inline:!0,label:"eightshift",permalink:"/blog/tags/eightshift"},{inline:!0,label:"boilerplate",permalink:"/blog/tags/boilerplate"},{inline:!0,label:"components",permalink:"/blog/tags/components"},{inline:!0,label:"blocks",permalink:"/blog/tags/blocks"}],readingTime:6.305,hasTruncateMarker:!0,authors:[{name:"Igor Obradovi\u0107",title:"WordPress Engineer",url:"https://github.com/iobrado",imageURL:"https://avatars.githubusercontent.com/u/23059501?v=4",key:"obradovic"}],frontMatter:{title:"Using multiple same components",description:"Explains how to use multiple same components inside",slug:"multiple-same-components",authors:"obradovic",date:"2023-06-12T00:00:00.000Z",tags:["eightshift","boilerplate","components","blocks"],hide_table_of_contents:!1},unlisted:!1,prevItem:{title:"Working with custom queries",permalink:"/blog/working-with-custom-queries"},nextItem:{title:"Block Patterns",permalink:"/blog/block-patterns"}},l={authorsImageUrls:[void 0]},c=[{value:"Manifest and attributes",id:"manifest-and-attributes",level:2},{value:"The &quot;props&quot; Helper",id:"the-props-helper",level:2},{value:"A step-by-step example",id:"a-step-by-step-example",level:2},{value:"Conclusion",id:"conclusion",level:3}];function d(t){const e={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...t.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.p,{children:"From time to time, you may need to create a block or a more complex component that uses more than one instance of the same component. In this blog post, we'll explain how this works in a bit more detail."}),"\n",(0,s.jsx)(e.p,{children:"An example of this use case is the Card component, which uses two heading components. You may get the general idea by just going through the code and trying to reverse-engineer it, but this example will give you a much better understanding of how it works and how to use it. First, let's cover some basics."}),"\n",(0,s.jsx)(e.h2,{id:"manifest-and-attributes",children:"Manifest and attributes"}),"\n",(0,s.jsx)(e.p,{children:"The way multiple same components work is by having a different key. Here is an example of the Card component:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-json",children:'"components": {\n\t"image": "image",\n\t"intro": "heading",\n\t"heading": "heading",\n\t"paragraph": "paragraph",\n\t"button": "button"\n},\n'})}),"\n",(0,s.jsxs)(e.p,{children:["As you can see, one heading component has the ",(0,s.jsx)(e.code,{children:"intro"})," key, while the other one has the ",(0,s.jsx)(e.code,{children:"heading"})," key. That way the ",(0,s.jsx)(e.strong,{children:"intro"})," heading component is being referred to as ",(0,s.jsx)(e.code,{children:"intro"})," so there is no mixup with the attribute values between the two heading blocks. This can be seen when setting the default attributes:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-json",children:'"cardIntroSize": {\n\t"type": "string",\n\t"default": "tiny"\n},\n"cardHeadingSize": {\n\t"type": "string",\n\t"default": "big"\n}\n'})}),"\n",(0,s.jsx)(e.h2,{id:"the-props-helper",children:'The "props" Helper'}),"\n",(0,s.jsx)(e.p,{children:"This method does all the heavy lifting for us. It replaces the default attribute names with the ones we provide. There is both the PHP and JS version of it."}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-php",children:"Components::render('heading', Components::props('intro', $attributes, [\n\t'selectorClass' => 'intro',\n\t'blockClass' => $componentClass\n]))\n"})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-js",children:"\n<HeadingEditor\n\t{...props('intro', attributes, {\n\t\tselectorClass: 'intro',\n\t\tblockClass: componentClass,\n\t})}\n/>\n\n"})}),"\n",(0,s.jsxs)(e.p,{children:["If you ",(0,s.jsx)(e.code,{children:"var_dump"})," the props helper, you\u2019ll notice the ",(0,s.jsx)(e.code,{children:"prefix"})," key, which is built from the names of the blocks and components used hierarchically. For example, when looking at a regular Heading component in the Card block, the prefix will be:"]}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.code,{children:"cardCardHeading"})," - first is the Card block name, then the Card component name and finally Heading component name."]}),"\n",(0,s.jsxs)(e.p,{children:["The Heading component that is called Intro then has the prefix ",(0,s.jsx)(e.code,{children:"cardCardIntro"}),". This prefix is then added to the attribute name, which then finally results in ",(0,s.jsx)(e.code,{children:"cardCardHeadingSize"})," and ",(0,s.jsx)(e.code,{children:"cardCardIntroSize"})," attributes, for example."]}),"\n",(0,s.jsx)(e.p,{children:"While at first glance it seems strange to have this naming scheme, it actually allows us to figure out the hierarchy just by looking at the attribute name."}),"\n",(0,s.jsx)(e.h2,{id:"a-step-by-step-example",children:"A step-by-step example"}),"\n",(0,s.jsx)(e.p,{children:"The block we'll be creating as an example will be a block which we can use for some sort of comparison or listing pros and cons. To create it, we will need the following:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["two ",(0,s.jsx)(e.code,{children:"Heading"})," components"]}),"\n",(0,s.jsxs)(e.li,{children:["two ",(0,s.jsx)(e.code,{children:"List"})," components"]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"The easiest way to create a new block is by using the boilerplate command"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.code,{children:"wp boilerplate blocks use-block --name=example"})}),"\n",(0,s.jsx)(e.p,{children:"Once the new block is added to your project, rename it. Also, don\u2019t forget to update all file names and imports in JS."}),"\n",(0,s.jsxs)(e.p,{children:["We should start with ",(0,s.jsx)(e.code,{children:"manifest.json"}),", where we define the components we'll use and set the default attributes. For now, just define the components and their keys:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-json",children:'"components": {\n\t"heading": "heading",\n\t"lists": "lists",\n\t"secondaryHeading": "heading",\n\t"secondaryLists": "lists"\n}\n'})}),"\n",(0,s.jsx)(e.p,{children:'The first section has the default key names, while the "duplicates" have different key names.'}),"\n",(0,s.jsxs)(e.p,{children:["After manifest, we can move to the JS part. As this is a fairly simple block without any advanced options or layouts, we need to add two ",(0,s.jsx)(e.code,{children:"HeadingEditor"})," components and two ",(0,s.jsx)(e.code,{children:"ListsEditor"})," components. To make styling easier, we can separate them in two ",(0,s.jsx)(e.code,{children:"div"})," elements. When you\u2019re finished, your code should look like this:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-jsx",children:"import React from 'react';\nimport { __ } from '@wordpress/i18n';\nimport { HeadingEditor } from '../../../components/heading/components/heading-editor';\nimport { ListsEditor } from '../../../components/lists/components/lists-editor';\n\nimport { props, selector } from '@eightshift/frontend-libs/scripts';\n\nexport const ComparisonEditor = ({ attributes, setAttributes }) => {\n\tconst {\n\t\tblockClass,\n\t} = attributes;\n\n\tconst comparisonPrimaryClass = selector(blockClass, blockClass, 'primary');\n\n\tconst comparisonSecondaryClass = selector(blockClass, blockClass, 'secondary');\n\n\treturn (\n\t\t<div className={blockClass}>\n\t\t\t<div className={comparisonPrimaryClass}>\n\t\t\t\t<HeadingEditor\n\t\t\t\t\t{...props('heading', attributes, {\n\t\t\t\t\t\tblockClass: blockClass,\n\t\t\t\t\t\tsetAttributes: setAttributes,\n\t\t\t\t\t})}\n\t\t\t\t/>\n\n\t\t\t\t<ListsEditor\n\t\t\t\t\t{...props('lists', attributes, {\n\t\t\t\t\t\tblockClass: blockClass,\n\t\t\t\t\t\tsetAttributes: setAttributes,\n\t\t\t\t\t})}\n\t\t\t\t/>\n\t\t\t</div>\n\t\t\t<div className={comparisonSecondaryClass}>\n\t\t\t\t<HeadingEditor\n\t\t\t\t\t{...props('secondaryHeading', attributes, {\n\t\t\t\t\t\tselectorClass: 'secondary-heading',\n\t\t\t\t\t\tblockClass: blockClass,\n\t\t\t\t\t\tsetAttributes: setAttributes,\n\t\t\t\t\t})}\n\t\t\t\t/>\n\n\t\t\t\t<ListsEditor\n\t\t\t\t\t{...props('secondaryLists', attributes, {\n\t\t\t\t\t\tselectorClass: 'secondary-lists',\n\t\t\t\t\t\tblockClass: blockClass,\n\t\t\t\t\t\tsetAttributes: setAttributes,\n\t\t\t\t\t})}\n\t\t\t\t/>\n\t\t\t</div>\n\t\t</div>\n\t);\n};\n"})}),"\n",(0,s.jsxs)(e.p,{children:["Note how we defined the different names with the ",(0,s.jsx)(e.code,{children:"props"})," helper. Additionally, we set the selector class for easier targeting of components when styling."]}),"\n",(0,s.jsxs)(e.p,{children:["Next, we can add the options. Again, the ",(0,s.jsx)(e.code,{children:"props"})," helper does all the heavy lifting for us. This is how the code should look after adding all component options:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-jsx",children:"import React from 'react';\nimport { __ } from '@wordpress/i18n';\nimport { props, getOptions } from '@eightshift/frontend-libs/scripts';\nimport { HeadingOptions } from '../../../components/heading/components/heading-options';\nimport { ListsOptions } from '../../../components/lists/components/lists-options';\nimport { PanelBody } from '@wordpress/components';\nimport manifest from '../manifest.json';\n\nexport const ComparisonOptions = ({ attributes, setAttributes }) => {\n\treturn (\n\t\t<PanelBody title={__('Comparison', 'eightshift')}>\n\t\t\t<HeadingOptions\n\t\t\t\t{...props('heading', attributes, {\n\t\t\t\t\tsetAttributes,\n\t\t\t\t\toptions: getOptions(attributes, manifest)\n\t\t\t\t})}\n\t\t\t\treducedBottomSpacing\n\t\t\t/>\n\n\t\t\t<ListsOptions\n\t\t\t\t{...props('lists', attributes, {\n\t\t\t\t\tsetAttributes,\n\t\t\t\t\toptions: getOptions(attributes, manifest)\n\t\t\t\t})}\n\t\t\t\treducedBottomSpacing\n\t\t\t/>\n\n\t\t\t<HeadingOptions\n\t\t\t\t{...props('secondaryHeading', attributes, {\n\t\t\t\t\tsetAttributes,\n\t\t\t\t\toptions: getOptions(attributes, manifest)\n\t\t\t\t})}\n\t\t\t\tlabel={__('Secondary Heading', 'eightshift')}\n\t\t\t\treducedBottomSpacing\n\t\t\t/>\n\n\t\t\t<ListsOptions\n\t\t\t\t{...props('secondaryLists', attributes, {\n\t\t\t\t\tsetAttributes,\n\t\t\t\t\toptions: getOptions(attributes, manifest)\n\t\t\t\t})}\n\t\t\t\tlabel={__('Secondary Lists', 'eightshift')}\n\t\t\t\treducedBottomSpacing\n\t\t\t/>\n\t\t</PanelBody>\n\t);\n};\n"})}),"\n",(0,s.jsx)(e.p,{children:"Adding the PHP part should be simple, but here is the code for reference:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-php",children:"<?php\n\n/**\n * Template for the Comparison Block view.\n *\n * @package Eightshift\n */\n\nuse EightshiftVendor\\EightshiftLibs\\Helpers\\Components;\n\n$globalManifest = Components::getManifest(dirname(__DIR__, 2));\n$manifest = Components::getManifest(__DIR__);\n\n$blockClass = $attributes['blockClass'] ?? '';\n\n$comparisonPrimaryClass = Components::selector($blockClass, $blockClass, 'primary');\n\n$comparisonSecondaryClass = Components::selector($blockClass, $blockClass, 'secondary');\n\n$unique = Components::getUnique();\n\n?>\n\n<div class=\"<?php echo esc_attr($blockClass); ?>\">\n\t<?php echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); ?>\n\t<div class=\"<?php echo esc_attr($comparisonPrimaryClass); ?>\">\n\t\t<?php\n\t\t\techo Components::render('heading', Components::props('heading', $attributes)),\n\t\t\tComponents::render('lists', Components::props('lists', $attributes));\n\t\t?>\n\t</div>\n\t<div class=\"<?php echo esc_attr($comparisonSecondaryClass); ?>\">\n\t\t<?php\n\t\t\techo Components::render('heading', Components::props('secondaryHeading', $attributes)),\n\t\t\tComponents::render('lists', Components::props('secondaryLists', $attributes));\n\t\t?>\n\t</div>\n</div>\n"})}),"\n",(0,s.jsx)(e.p,{children:"The block should work properly now, but the two lists look the same. To make a difference between the two, we can change the default list colors in the manifest. If we don\u2019t have the colors we want already available in the project, first we need to add them to the global manifest."}),"\n",(0,s.jsxs)(e.p,{children:["For a detailed explanation on how to add new colors to your project, you can read a previous blog post about ",(0,s.jsx)(e.a,{href:"/blog/modifying-blocks-color-theme#adding-new-colors-to-your-project",children:"modifying blocks"}),"."]}),"\n",(0,s.jsxs)(e.p,{children:["Now we have to add these new colors to the Lists component ",(0,s.jsx)(e.code,{children:"manifest.json"}),". In ",(0,s.jsx)(e.code,{children:"options"})," key, find the ",(0,s.jsx)(e.code,{children:"listsColor"})," and add your new colors."]}),"\n",(0,s.jsxs)(e.p,{children:["When the new colors are added to the Lists component, we can set these new colors as defaults by adding the following attributes in ",(0,s.jsx)(e.code,{children:"manifest.json"})," of our Comparison block:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-json",children:'"comparisonListsColor": {\n\t"type": "string",\n\t"default": "green-haze"\n},\n"comparisonSecondaryListsColor": {\n\t"type": "string",\n\t"default": "milano-red"\n}\n'})}),"\n",(0,s.jsx)(e.p,{children:"The first list will now have green bullet points, and the second one will have red bullet points."}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{alt:"Comparison block",src:n(74692).A+"",width:"1406",height:"346"})}),"\n",(0,s.jsxs)(e.p,{children:["Notice again how the attribute name is structured - current block name (",(0,s.jsx)(e.strong,{children:"comparison"}),"), component name (",(0,s.jsx)(e.strong,{children:"Lists"})," or ",(0,s.jsx)(e.strong,{children:"SecondaryLists"}),"), attribute (",(0,s.jsx)(e.strong,{children:"Color"}),")."]}),"\n",(0,s.jsxs)(e.p,{children:["If you\u2019re ever in doubt of what is the exact attribute name, you can always ",(0,s.jsx)(e.code,{children:"var_dump"})," the ",(0,s.jsx)(e.code,{children:"props"})," helper for that component and you will see the full attribute names as the keys."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{children:"Array\n(\n    [prefix] => comparisonSecondaryLists\n    // ...\n    [comparisonSecondaryListsOrdered] => ul\n    [comparisonSecondaryListsSize] => body:regular\n    [comparisonSecondaryListsColor] => milano-red\n    [comparisonSecondaryListsColorOnlyMarker] =>\n    [comparisonSecondaryListsUse] => 1\n    // ...\n)\n"})}),"\n",(0,s.jsx)(e.h3,{id:"conclusion",children:"Conclusion"}),"\n",(0,s.jsxs)(e.p,{children:["Although this was a simple example, we covered the most important things to have in mind when using multiple same components in a block. For additional practice, you can add some more attributes or go through some of our pre-made blocks which use multiple same components. Some components/blocks you can look into are ",(0,s.jsx)(e.code,{children:"Card"})," and ",(0,s.jsx)(e.code,{children:"Quote"}),"."]})]})}function p(t={}){const{wrapper:e}={...(0,o.R)(),...t.components};return e?(0,s.jsx)(e,{...t,children:(0,s.jsx)(d,{...t})}):d(t)}},74692:(t,e,n)=>{n.d(e,{A:()=>s});const s=n.p+"assets/images/comparison-block-0abb53656f82a74375e23dc8334eb266.webp"},28453:(t,e,n)=>{n.d(e,{R:()=>a,x:()=>r});var s=n(96540);const o={},i=s.createContext(o);function a(t){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function r(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(o):t.components||o:a(t.components),s.createElement(i.Provider,{value:e},t.children)}}}]);