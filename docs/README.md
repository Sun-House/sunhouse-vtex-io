# SunHouse Store Theme

The **SunHouse Store Theme** (`sunhouse.sunhouse`) is the VTEX IO Store Framework storefront for [Sun House](https://www.sunhouse.com.br) — a furniture catalog with many finish variations. This repository is the production theme, kept here as a **portfolio** piece, not a starter to clone or republish.

Blocks, CSS, and custom `sunhouse.*` apps are composed into Home, Product, Search, Header/Footer, institutional pages, and campaign landings. Native Store Framework blocks are used where they fit; custom apps cover gaps the default shelf, SKU selector, menu, and PDP flows do not.

## Store surfaces

| Surface | What it covers |
| --- | --- |
| Home | Hero banners, category grid, featured shelves, product highlight, full-width shelf banner, blog grid, showcase slider, pre-footer FAQ |
| Product (PDP) | Custom gallery, enhanced SKU selector with finish swatches, buy-together, WhatsApp CTAs by product type, YouTube Shorts, reviews, also-seen shelf |
| Search / PLP | Custom search result layout, ambient showcase, category grid, shelf cards with variation swatches |
| Header / Footer | Super menu, minicart, search, login, RD Station newsletter |
| Landings | Corporate, stores, Black Friday, designer/collection, institutional templates |

## Behavior

1. **Composition**: Pages are Store Framework JSONC under `store/blocks`, split by surface (`pages/`, `common/`, `landing-pages/`, `components/`).
2. **Catalog complexity**: PDP uses `enhanced-sku-selector` (finish images + popper). Shelves use [`shelf-enhanced-sku-selector`](https://github.com/AlexJSant/shelf-enhanced-sku-selector) so cards show the same variation order as the product page.
3. **Product types**: `condition-layout` switches PDP CTAs (standard, corporate, exclusive, unavailable) without duplicating the whole template.
4. **Refresh**: Newer Home / PDP / PLP / shelf blocks live alongside `_deprecated` trees until the old surfaces are fully retired.
5. **Performance**: Home uses `__fold__`; shelf swatches request resized assets from the image server instead of full catalog files.

## Theme layout

```
store/blocks/     # JSONC templates and block composition
styles/css/       # CSS Handles, mirrored by surface (home, product, search, header…)
checkout-ui-custom/
docs/             # This file (docs builder)
```

CSS follows the page it belongs to (`styles/css/home/_new--home/`, `product/_new--product/`, `search/_new--search/`). Shared shelf and header rules sit under `styles/css/components/` and `styles/css/common/`.

## Custom apps (selected)

These are the storefront pieces that go beyond native VTEX blocks. The full list is in `manifest.json`.

| App | Role |
| --- | --- |
| `sunhouse.enhanced-sku-selector` | PDP variation selector with finish samples |
| `sunhouse.shelf-enhanced-sku-selector` | Shelf swatches in PDP order ([repo](https://github.com/AlexJSant/shelf-enhanced-sku-selector)) |
| `sunhouse.product-images-custom` | PDP gallery |
| `sunhouse.buy-together-enhanced` | Complementary products on the PDP |
| `sunhouse.super-menu` / `sunhouse.category-menu` | Desktop and category navigation |
| `sunhouse.minicart` | Cart drawer |
| `sunhouse.search-result` | PLP layout |
| `sunhouse.embla-carousel` / `sunhouse.slider-layout` | Carousels and shelves |
| `sunhouse.whatsapp-lead-capture-pdp` | WhatsApp lead / buy CTAs |
| `sunhouse.rd-station-forms` | Newsletter in the footer |
| `sunhouse.youtube-shorts-widget` | Shorts embed on the PDP |
| `sunhouse.condition-layout` | Product-type branching |
| `sunhouse.container` | Layout wrapper used across pages |

## Customization

Styling is CSS Handles plus `blockClass` on flex-layout, container, and summary blocks. App-specific overrides use the usual theme file, for example `styles/css/components/shelf/_new--shelf/shelf-sku-selector/sunhouse.shelf-enhanced-sku-selector.css`.

> Site Editor remains available for content and props. Template structure is owned in this repository.

## Dependencies

Declared in `manifest.json`: native VTEX apps (`vtex.store`, `vtex.flex-layout`, `vtex.product-summary`, `vtex.search-result`, …) plus the `sunhouse.*` apps above. Peer apps include wishlist, speech-to-text, and Konfidency reviews.

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
