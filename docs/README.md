# Sun House storefront

This repository is the VTEX IO Store Framework storefront for [Sun House](https://www.sunhouse.com.br) (`sunhouse.sunhouse`). Native VTEX blocks are composed with custom `sunhouse.*` apps. The repository contains the theme structure and storefront implementation.

## Store surfaces

| Surface | What it covers |
| --- | --- |
| Home | Hero banners, category grid, featured shelves, product highlight, full-width shelf banner, blog grid, showcase slider, pre-footer FAQ |
| Product (PDP) | Custom gallery, enhanced SKU selector with finish swatches, buy-together, WhatsApp CTAs by product type, YouTube Shorts, reviews, also-seen shelf |
| Search / PLP | Custom search result layout, ambient showcase, category grid, shelf cards with variation swatches |
| Header / Footer | Super menu, minicart, search, login, RD Station newsletter |
| Landings | Corporate, stores, Black Friday, designer/collection, institutional templates |

## Architecture

1. **Composition**: Pages are Store Framework JSONC under `store/blocks`, organized by surface (`pages/`, `common/`, `landing-pages/`, `components/`).
2. **SKU selection**: The PDP uses `sunhouse.enhanced-sku-selector` (finish images and popper). Shelves use [`sunhouse.shelf-enhanced-sku-selector`](https://github.com/AlexJSant/shelf-enhanced-sku-selector) so cards follow the same variation order as the PDP.
3. **Product types**: `sunhouse.condition-layout` selects PDP CTAs (standard, corporate, exclusive, unavailable) without duplicating the full template.
4. **Migrations**: Newer Home, PDP, PLP, and shelf blocks coexist with `_deprecated` trees until the previous surfaces are retired.
5. **Performance**: Home uses `__fold__`. Shelf swatches request resized assets from the image server rather than full catalog files.

## Theme layout

```
store/blocks/        # JSONC templates and block composition
styles/css/          # CSS Handles, organized by surface
checkout-ui-custom/  # Checkout UI customizations
docs/                # Documentation (docs builder)
```

CSS is grouped by the surface it belongs to (`styles/css/home/_new--home/`, `product/_new--product/`, `search/_new--search/`). Shared shelf and header rules sit under `styles/css/components/` and `styles/css/common/`.

## Custom apps (selected)

Custom `sunhouse.*` apps extend native VTEX blocks as storefront dependencies. The complete dependency list is in `manifest.json`.

| App | Role |
| --- | --- |
| `sunhouse.enhanced-sku-selector` | PDP variation selector with finish swatches |
| `sunhouse.shelf-enhanced-sku-selector` | Shelf swatches in PDP order ([repo](https://github.com/AlexJSant/shelf-enhanced-sku-selector)) |
| `sunhouse.product-images-custom` | PDP gallery |
| `sunhouse.buy-together-enhanced` | Complementary products on the PDP |
| `sunhouse.super-menu` / `sunhouse.category-menu` | Desktop and category navigation |
| `sunhouse.minicart` | Cart drawer |
| `sunhouse.search-result` | PLP layout |
| `sunhouse.embla-carousel` / `sunhouse.slider-layout` | Carousels and shelves |
| `sunhouse.whatsapp-lead-capture-pdp` | WhatsApp lead / buy CTAs |
| `sunhouse.rd-station-forms` | Newsletter in the footer |
| `sunhouse.youtube-shorts-widget` | YouTube Shorts embed on the PDP |
| `sunhouse.condition-layout` | Product-type branching |
| `sunhouse.container` | Layout wrapper used across pages |

## Customization

Styling uses CSS Handles and `blockClass` on flex-layout, container, and summary blocks. App-specific overrides follow the theme CSS file convention, for example `styles/css/components/shelf/_new--shelf/shelf-sku-selector/sunhouse.shelf-enhanced-sku-selector.css`.

> Site Editor remains available for content and props. Template structure is owned in this repository.

## Dependencies

Declared in `manifest.json`: native VTEX apps (`vtex.store`, `vtex.flex-layout`, `vtex.product-summary`, `vtex.search-result`, …) plus the `sunhouse.*` apps above. Peer dependencies include wishlist, speech-to-text, and Konfidency reviews.

Builders: `store`, `styles`, `docs`, `assets`, `checkout-ui-custom`.

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlexJSant"><img src="https://avatars.githubusercontent.com/u/138253863?v=4?s=100" width="100px;" alt="Alex Santana"/><br /><sub><b>Alex Santana</b></sub></a><br /><a href="https://github.com/AlexJSant" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- DOCS-IGNORE:end -->
