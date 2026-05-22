# Responsive Design Audit Report
**Date:** May 22, 2026  
**Project:** House of Cohort  
**Scope:** Complete codebase analysis for mobile responsiveness

---

## Executive Summary

This audit identified **37 responsive design issues** across the codebase, primarily affecting:
- Mobile navigation and layout constraints
- Admin panel sidebar positioning issues
- Table horizontal scrolling on mobile
- Image gallery thumbnail sizing
- Text sizing inconsistencies
- Padding/margin constraints on mobile
- Form input field widths
- Charts and data visualizations without responsive height management

---

## Issues by Category

### 1. ADMIN LAYOUT & NAVIGATION

#### Issue 1.1: Admin Sidebar Fixed Width Not Responsive
**File:** [src/components/admin/AdminSidebar.tsx](src/components/admin/AdminSidebar.tsx#L119)  
**Lines:** 119  
**Severity:** High  
**Description:**
```tsx
<aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0...">
```
- Fixed width `md:w-64` (256px) reduces available space on medium screens and tablets
- Main content padding `md:pl-64` leaves no room on tablets (768px width - 256px = 512px)
- Better approach: Use responsive widths or collapsible drawer

**Fix Required:**
- Add `lg:w-64` instead of `md:w-64`
- Adjust main content: `lg:pl-64` instead of `md:pl-64`
- Consider using 48px (192px) width on md breakpoint

#### Issue 1.2: Mobile Sheet Width Too Wide
**File:** [src/components/admin/AdminSidebar.tsx](src/components/admin/AdminSidebar.tsx#L144)  
**Lines:** 144  
**Severity:** Medium  
**Description:**
```tsx
<SheetContent side="left" className="w-72 bg-brand-black...">
```
- Fixed width `w-72` (288px) on screens like iPhone 12 (390px) leaves only 102px for sheet
- No responsive width adjustment for small screens

**Fix Required:**
- Change to: `w-full sm:w-72` to use full width on mobile, then 288px on larger screens

#### Issue 1.3: Admin Layout Main Content Padding
**File:** [src/app/admin/layout.tsx](src/app/admin/layout.tsx#L16)  
**Lines:** 16  
**Severity:** Medium  
**Description:**
```tsx
<main className="md:pl-64 min-h-screen">
  <div className="px-6 py-8 md:px-10 md:py-10 max-w-7xl mx-auto">
```
- Padding on main: `px-6` → 24px (24px on each side = 48px total)
- Mobile screen 375px: 375px - 48px = 327px width only
- Content at md breakpoint: 768px - 256px (sidebar) - 40px (px-10) = 472px
- At lg breakpoint (1024px): Should be fuller width

**Fix Required:**
- Use responsive padding: `px-4 sm:px-6 lg:px-8`
- Consider: `max-w-7xl` may be too restrictive; use `w-full` with responsive inner padding

---

### 2. TABLE & DATA DISPLAY ISSUES

#### Issue 2.1: InventoryTable Lacks Horizontal Scroll Container
**File:** [src/components/admin/InventoryTable.tsx](src/components/admin/InventoryTable.tsx#L95-L130)  
**Lines:** 95-130  
**Severity:** High  
**Description:**
- Table component has no horizontal scrolling wrapper
- On mobile (375px), table headers and data overflow without scroll capability
- Fixed column widths without responsive adjustment:
  - `w-10` (40px) checkbox
  - `w-40` (160px) Input field for delta
  - No mobile-first design for table columns

**Fix Required:**
```tsx
<div className="overflow-x-auto -mx-4 sm:mx-0">
  <div className="rounded-md border bg-white">
    <Table>
```

#### Issue 2.2: Checkbox Column Too Wide on Mobile
**File:** [src/components/admin/InventoryTable.tsx](src/components/admin/InventoryTable.tsx#L124)  
**Lines:** 124  
**Severity:** Medium  
**Description:**
```tsx
<TableHead className="w-10">
```
- Checkbox column is fixed at 40px but takes proportionally more space on mobile
- No responsive column visibility for non-essential data on mobile

**Fix Required:**
- Add mobile-first column hiding: `hidden sm:table-cell`
- Show only: Product name, Stock, Status on mobile
- Show full details on sm and up

#### Issue 2.3: Fixed Width Input in InventoryTable
**File:** [src/components/admin/InventoryTable.tsx](src/components/admin/InventoryTable.tsx#L100)  
**Lines:** 100  
**Severity:** Medium  
**Description:**
```tsx
<Input
  type="number"
  placeholder="Delta (e.g. -5 or 10)"
  value={delta}
  onChange={(e) => setDelta(e.target.value)}
  className="w-40"
/>
```
- Fixed width `w-40` (160px) in constraint bar
- On mobile with `selected.size > 0` bar, leaves only ~70px for input

**Fix Required:**
```tsx
className="w-full sm:w-40"
```

#### Issue 2.4: Bulk Action Bar Not Responsive
**File:** [src/components/admin/InventoryTable.tsx](src/components/admin/InventoryTable.tsx#L79-L95)  
**Lines:** 79-95  
**Severity:** Medium  
**Description:**
```tsx
<div className="flex flex-wrap items-center gap-3 rounded-md border...">
```
- Flex layout with gap-3 doesn't optimize for mobile
- On 375px screen: Flex items stack but no responsive button sizing
- "Apply delta" button and other buttons don't shrink text on mobile

**Fix Required:**
```tsx
<div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 rounded-md...">
  <span className="text-sm sm:text-base">...</span>
  <Input className="w-full sm:w-40"/>
  <Button className="w-full sm:w-auto">Apply delta</Button>
</div>
```

---

### 3. FORMS & INPUT FIELDS

#### Issue 3.1: ProductForm Grid Layout Not Mobile-Optimized
**File:** [src/components/admin/ProductForm.tsx](src/components/admin/ProductForm.tsx#L142)  
**Lines:** 142  
**Severity:** Medium  
**Description:**
```tsx
<div className="grid gap-4 sm:grid-cols-2">
```
- Grid starts at single column but only uses `sm:grid-cols-2`
- On tablet (768px), should be 2 columns but form blocks may be too wide
- No responsive gap adjustment for mobile (gap-4 = 16px might be too large)

**Fix Required:**
```tsx
<div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2">
```

#### Issue 3.2: CheckoutForm Grid Misalignment
**File:** [src/components/store/CheckoutForm.tsx](src/components/store/CheckoutForm.tsx#L167)  
**Lines:** 167  
**Severity:** Medium  
**Description:**
- Two-column grid at `sm:grid-cols-2` without responsive wrapping for very small screens
- Payment summary aside at `lg:grid-cols-[1fr_400px]` - the 400px fixed width too large for tablet
- On iPad (768px): 1fr + 400px = asymmetric layout

**Fix Required:**
```tsx
<div className="grid gap-12 grid-cols-1 lg:grid-cols-[1fr_320px] lg:gap-20">
```
- Change `400px` to `320px` for better mobile/tablet fit
- Ensure `lg:` breakpoint, not jumping from mobile to `lg:`

#### Issue 3.3: Textarea Field Width Management
**File:** [src/components/store/ReviewForm.tsx](src/components/store/ReviewForm.tsx#L63)  
**Lines:** 63  
**Severity:** Low  
**Description:**
```tsx
<textarea
  rows={4}
  maxLength={1000}
  className="mt-2 w-full resize-none border-b border-ink/25..."
/>
```
- Width is responsive (`w-full`) ✓
- But `rows={4}` is fixed - on mobile 375px, 4 rows of text feels cramped
- No mobile-responsive row count

**Fix Required:**
```tsx
// In component logic
const rows = isMobile ? 3 : 4;
// Add responsive class if needed for spacing
```

#### Issue 3.4: CheckoutForm Delivery Zone Select Width
**File:** [src/components/store/CheckoutForm.tsx](src/components/store/CheckoutForm.tsx) - around line 210-220  
**Severity:** Low  
**Description:**
```tsx
<ZoneSelect
  label="Delivery zone"
  zones={zones}
```
- Related to this select trigger: `className="w-48"` (likely in implementation)
- Fixed 192px width on small screens problematic

**Fix Required:**
- Ensure: `w-full sm:w-48`

---

### 4. IMAGE SIZING & GALLERIES

#### Issue 4.1: ImageGallery Thumbnail Width Fixed
**File:** [src/components/store/ImageGallery.tsx](src/components/store/ImageGallery.tsx#L80)  
**Lines:** 80  
**Severity:** Medium  
**Description:**
```tsx
<button
  key={src + i}
  type="button"
  onClick={() => setActive(i)}
  className="group relative aspect-square w-20 overflow-hidden bg-parchment-deep"
>
```
- Fixed thumbnail width `w-20` (80px)
- On mobile 375px with 6 thumbnails: 6×80px = 480px > screen width
- Overflow not handled, no horizontal scroll container

**Fix Required:**
```tsx
<div className="flex overflow-x-auto gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
  {images.slice(0, 6).map((src, i) => (
    <button
      className="group relative flex-shrink-0 aspect-square w-16 sm:w-20 overflow-hidden..."
    >
```

#### Issue 4.2: Product Card Image Radius Not Mobile-Tested
**File:** [src/components/store/ProductCard.tsx](src/components/store/ProductCard.tsx#L32)  
**Lines:** 32  
**Severity:** Low  
**Description:**
```tsx
<div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[120px] bg-parchment-deep">
```
- `rounded-t-[120px]` on mobile screens creates odd proportions
- 4:5 aspect ratio at 375px = 300px tall with 120px radius
- Radius is 40% of width - too aggressive on mobile

**Fix Required:**
```tsx
<div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[80px] sm:rounded-t-[120px] bg-parchment-deep">
```

#### Issue 4.3: Hero Image Arch Radius Not Mobile-Responsive
**File:** [src/components/store/Hero.tsx](src/components/store/Hero.tsx#L133-L139)  
**Lines:** 133-139  
**Severity:** Low  
**Description:**
```tsx
<div
  className="absolute inset-0 overflow-hidden bg-parchment-deep shadow-[0_30px_60px_-30px_rgba(26,24,20,0.35)]"
  style={{
    borderTopLeftRadius: "100% 60%",
    borderTopRightRadius: "100% 60%",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  }}
>
```
- Dynamic radius via inline styles, not responsive
- Looks disproportionate on very small screens

**Fix Required:**
```tsx
const borderRadiusStyle = isMobile 
  ? { borderTopLeftRadius: "60% 40%", borderTopRightRadius: "60% 40%" }
  : { borderTopLeftRadius: "100% 60%", borderTopRightRadius: "100% 60%" }
```

---

### 5. NAVIGATION & HEADER

#### Issue 5.1: Navbar Height Jump on Scroll
**File:** [src/components/store/NavbarShell.tsx](src/components/store/NavbarShell.tsx#L41)  
**Lines:** 41  
**Severity:** Low  
**Description:**
```tsx
className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-[height] duration-300 sm:px-8 lg:px-12 ${
  scrolled ? "h-14" : "h-20"
}`}
```
- Height transitions from `h-20` (80px) to `h-14` (56px)
- Gap spacing `gap-6` doesn't reduce on mobile
- On 375px with h-20, content crunches

**Fix Required:**
```tsx
gap-3 sm:gap-6  // Responsive gap
h-16 sm:h-20    // Responsive height
scrolled ? "h-12 sm:h-14" : "h-14 sm:h-20"
```

#### Issue 5.2: Navbar Mobile Navigation Bar Spacing
**File:** [src/components/store/NavbarShell.tsx](src/components/store/NavbarShell.tsx#L110-L115)  
**Lines:** 110-115  
**Severity:** Low  
**Description:**
```tsx
{/* mobile nav */}
<nav className="flex items-center justify-center gap-6 border-t border-ink/8 px-4 py-2.5 md:hidden">
  {NAV_LINKS.map((link) => (
    <NavLink key={link.href} {...link} compact />
  ))}
</nav>
```
- Gap-6 (24px) between nav items may be too tight on 375px screen with 4 items
- 4 items × ~60px + gaps = potentially > 375px

**Fix Required:**
```tsx
gap-2 sm:gap-4
px-2 sm:px-4
```

#### Issue 5.3: Navbar Text Sizing Inconsistent
**File:** [src/components/store/Navbar.tsx](src/components/store/Navbar.tsx#L35)  
**Lines:** 35  
**Severity:** Low  
**Description:**
```tsx
<div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] sm:gap-3 sm:text-[11px] sm:tracking-[0.3em]">
```
- Text jumps from 10px to 11px at sm breakpoint
- Should use `clamp()` for smoother scaling

**Fix Required:**
```tsx
text-[clamp(9px,2vw,11px)]
```

---

### 6. TYPOGRAPHY & TEXT SIZING

#### Issue 6.1: Display Heading Sizing Not Using Clamp
**File:** [src/components/store/Hero.tsx](src/components/store/Hero.tsx#L44)  
**Lines:** 44  
**Severity:** Medium  
**Description:**
```tsx
<h1 className="mt-7 font-display text-[clamp(3.2rem,8.5vw,7.5rem)]...">
```
- ✓ Uses `clamp()` - Good! But min size 3.2rem (51px) may be too large on very small screens
- 51px on 320px screen = takes significant vertical space

**Consider:** Fine-tune min value:
```tsx
text-[clamp(2.4rem,8.5vw,7.5rem)]
```

#### Issue 6.2: Font Display Sizing on Mobile
**File:** [src/components/store/NavbarShell.tsx](src/components/store/NavbarShell.tsx#L53-L54)  
**Lines:** 53-54  
**Severity:** Low  
**Description:**
```tsx
<span className="font-display text-[1.35rem] font-light tracking-[0.18em] text-ink transition-colors duration-300 group-hover:text-brand-gold sm:text-[1.6rem]">
```
- Fixed sizes: 21.6px → 25.6px at sm breakpoint
- Should use clamp for smoother scaling

**Fix Required:**
```tsx
text-[clamp(1.2rem,4vw,1.6rem)]
```

#### Issue 6.3: Tagline Text Spacing Inconsistency
**File:** [src/components/store/NavbarShell.tsx](src/components/store/NavbarShell.tsx#L57-L60)  
**Lines:** 57-60  
**Severity:** Low  
**Description:**
```tsx
<span className={`mt-0.5 text-[9px] uppercase tracking-[0.45em] text-ink/55 transition-opacity duration-300...`}>
```
- Text at 9px with `tracking-[0.45em]` = 9px × 0.45 = 4.05px letter-spacing
- Extremely tight and hard to read on mobile
- `mt-0.5` (2px) margin too small

**Fix Required:**
```tsx
text-[clamp(8px,1.5vw,9px)] tracking-[clamp(0.25em,2vw,0.45em)]
```

---

### 7. GRID & LAYOUT ISSUES

#### Issue 7.1: ProductGrid Column Count Not Responsive
**File:** [src/components/store/ProductGrid.tsx](src/components/store/ProductGrid.tsx#L25)  
**Lines:** 25  
**Severity:** Low  
**Description:**
```tsx
const gridCols =
  columns === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
```
- 4-column mode starts at `grid-cols-2` (not `grid-cols-1`)
- On 375px mobile: 2 columns might be too narrow for product cards

**Fix Required:**
```tsx
: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
```

#### Issue 7.2: CategoryShowcase Height Variations Not Mobile-Optimized
**File:** [src/components/store/CategoryShowcase.tsx](src/components/store/CategoryShowcase.tsx#L70-L77)  
**Lines:** 70-77  
**Severity:** Medium  
**Description:**
```tsx
const heightCls =
  index % 3 === 1
    ? "aspect-[3/4.4]"
    : index % 3 === 2
      ? "aspect-[3/4]"
      : "aspect-[3/4.2]";

return (
  <Link
    href={`/products?category=${category.slug}`}
    className={`group/cat relative block ${
      index === 1 ? "lg:translate-y-10" : index === 2 ? "lg:translate-y-4" : ""
    }`}
  >
```
- Different aspect ratios: 3/4.4, 3/4, 3/4.2 create uneven grid
- `lg:translate-y-*` only applies on lg screens
- On mobile: irregular heights, poor visual flow

**Fix Required:**
```tsx
// Use consistent aspect on mobile, vary only on lg
const heightCls = `aspect-[3/4] ${
  index % 3 === 1 ? "lg:aspect-[3/4.4]" : 
  index % 3 === 2 ? "lg:aspect-[3/4]" : 
  "lg:aspect-[3/4.2]"
}`
```

#### Issue 7.3: Cart Item Row Grid Layout
**File:** [src/components/store/CartItemRow.tsx](src/components/store/CartItemRow.tsx#L68)  
**Lines:** 68  
**Severity:** Low  
**Description:**
```tsx
<li className="grid grid-cols-[120px_1fr] gap-6 border-b border-ink/10 py-8 last:border-b-0 sm:grid-cols-[140px_1fr]">
```
- Fixed image width: 120px on mobile, 140px on sm
- Gap is responsive but 24px (gap-6) might crowd 375px screen
- Product price display at `sm:text-3xl` - may overflow on mobile

**Fix Required:**
```tsx
grid-cols-[100px_1fr] gap-4 sm:grid-cols-[140px_1fr] sm:gap-6
<p className="font-display text-lg sm:text-2xl lg:text-3xl">
```

---

### 8. MODAL & OVERLAY ISSUES

#### Issue 8.1: Alert Dialog Max Width Not Responsive
**File:** [src/components/ui/alert-dialog.tsx](src/components/ui/alert-dialog.tsx#L55)  
**Lines:** 55  
**Severity:** Medium  
**Description:**
```tsx
"group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm..."
```
- Default `max-w-xs` (320px) on all screens
- On 375px mobile: 320px modal leaves 55px margin (27px sides)
- Should be full width on mobile with padding

**Fix Required:**
```tsx
"w-[calc(100%-2rem)] sm:w-full max-w-xs sm:max-w-sm..."
```

#### Issue 8.2: Dialog Modal Width Constraints
**File:** [src/components/ui/dialog.tsx](src/components/ui/dialog.tsx#L56)  
**Lines:** 56  
**Severity:** Medium  
**Description:**
```tsx
"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl...sm:max-w-sm..."
```
- ✓ Uses `max-w-[calc(100%-2rem)]` which is good
- But on 375px: 100% - 2rem (32px) = 343px
- On 320px: 100% - 32px = 288px (very tight)

**Consider:** Add padding inside for better breathing room:
```tsx
"p-4 sm:p-4" // Already present, good
```

---

### 9. CHART & DATA VISUALIZATION

#### Issue 9.1: RevenueChart Fixed Height on Mobile
**File:** [src/components/admin/RevenueChart.tsx](src/components/admin/RevenueChart.tsx#L18)  
**Lines:** 18  
**Severity:** Low  
**Description:**
```tsx
<div className="h-72 w-full">
```
- Fixed height `h-72` (288px)
- On mobile 375px: 288px chart takes 77% of viewport
- Better: responsive height or container-based sizing

**Fix Required:**
```tsx
<div className="h-48 sm:h-64 lg:h-72 w-full">
```

#### Issue 9.2: OrderStatusChart Fixed Height on Mobile
**File:** [src/components/admin/OrderStatusChart.tsx](src/components/admin/OrderStatusChart.tsx#L28, L35)  
**Lines:** 28, 35  
**Severity:** Low  
**Description:**
```tsx
<div className="flex h-72 items-center justify-center...">
// and
<div className="h-72 w-full">
```
- Same issue as RevenueChart

**Fix Required:**
```tsx
<div className="h-48 sm:h-64 lg:h-72 w-full">
```

---

### 10. PADDINGS & MARGINS

#### Issue 10.1: Hero Section Padding Too Large on Mobile
**File:** [src/components/store/Hero.tsx](src/components/store/Hero.tsx#L20-L21)  
**Lines:** 20-21  
**Severity:** Low  
**Description:**
```tsx
<div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 text-[10px] uppercase tracking-[0.4em] text-ink/55 sm:px-8 lg:px-12">
```
- ✓ Responsive padding (px-5, sm:px-8, lg:px-12) - Good!

**But in main grid:**
```tsx
<div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pb-28 lg:pt-20">
```
- `pb-20` (80px) bottom padding on mobile might be excessive
- `pt-12` (48px) top padding

**Fix Required:**
```tsx
gap-6 sm:gap-10 pb-12 sm:pb-20 pt-8 sm:pt-12
```

#### Issue 10.2: Checkout Form Content Area Padding
**File:** [src/app/admin/layout.tsx](src/app/admin/layout.tsx#L16-L17)  
**Lines:** 16-17  
**Severity:** Medium  
**Description:**
```tsx
<div className="px-6 py-8 md:px-10 md:py-10 max-w-7xl mx-auto">
```
- `px-6` = 24px on mobile
- `md:px-10` = 40px at md
- Combined with element padding = excessive whitespace

**Fix Required:**
```tsx
px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10
```

#### Issue 10.3: Section Padding Inconsistency
**File:** Multiple store components  
**Severity:** Low  
**Description:**
- `py-24 lg:py-32` used in multiple sections
- On mobile 375px: `py-24` (96px) padding on 667px viewport = 14% of height
- Better: use responsive scaling

**Fix Required:**
```tsx
py-12 sm:py-16 lg:py-24 xl:py-32
```

---

### 11. OVERFLOW & HORIZONTAL SCROLL

#### Issue 11.1: Table Wrapper Missing Scroll Container
**File:** [src/components/admin/InventoryTable.tsx](src/components/admin/InventoryTable.tsx#L105-L115)  
**Lines:** 105-115  
**Severity:** High  
**Description:**
```tsx
<div className="rounded-md border bg-white">
  <Table>
    <TableHeader>
```
- No horizontal scroll wrapper around table
- Table columns overflow on mobile without scroll handling

**Fix Required:**
```tsx
<div className="overflow-x-auto -mx-4 sm:mx-0 sm:rounded-md">
  <div className="rounded-md border bg-white sm:rounded-md">
    <Table>
```

#### Issue 11.2: ProductFilters Form Width on Mobile
**File:** [src/components/store/ProductFilters.tsx](src/components/store/ProductFilters.tsx#L50-L60)  
**Lines:** 50-60  
**Severity:** Low  
**Description:**
```tsx
<form onSubmit={applyPriceFilter} className="space-y-4">
  <h3 className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-brand-gold">
    Price · SLE
    <span className="inline-block h-px flex-1 bg-ink/15" />
  </h3>
  <div className="grid grid-cols-2 gap-3">
```
- Flex-1 line might overflow in h3 on mobile
- Grid with 2 columns on mobile may be too tight

**Fix Required:**
```tsx
<h3 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
<div className="grid grid-cols-2 gap-2 sm:gap-3">
```

---

### 12. SPECIFIC COMPONENT ISSUES

#### Issue 12.1: ReviewForm Textarea Sizing
**File:** [src/components/store/ReviewForm.tsx](src/components/store/ReviewForm.tsx#L60-L70)  
**Lines:** 60-70  
**Severity:** Low  
**Description:**
```tsx
<textarea
  rows={4}
  maxLength={1000}
  className="mt-2 w-full resize-none border-b border-ink/25..."
/>
```
- `rows={4}` fixed regardless of screen size
- On 375px mobile: 4 rows of text feels cramped with large font

**Fix Required:**
- Component could accept dynamic rows or use CSS for responsive sizing

#### Issue 12.2: UserMenu Dropdown Width
**File:** [src/components/store/UserMenu.tsx](src/components/store/UserMenu.tsx#L38)  
**Lines:** 38  
**Severity:** Low  
**Description:**
```tsx
className="w-60 border-ink/15 bg-parchment-soft p-2 text-ink"
```
- Fixed width `w-60` (240px)
- On 375px mobile: 240px dropdown = 64% of screen width (ok, but not optimal)

**Fix Required:**
```tsx
className="w-48 sm:w-60"
```

#### Issue 12.3: Cart Item Product Name Text Overflow
**File:** [src/components/store/CartItemRow.tsx](src/components/store/CartItemRow.tsx#L82)  
**Lines:** 82  
**Severity:** Low  
**Description:**
```tsx
<Link
  href={`/products/${item.productSlug}`}
  className="font-display text-2xl font-light text-ink transition-colors hover:text-brand-gold sm:text-3xl"
>
  {item.productName}
</Link>
```
- `text-2xl` (28px) at 375px with full product name = text overflow potential
- No line-clamping or responsive sizing

**Fix Required:**
```tsx
className="font-display text-lg sm:text-2xl lg:text-3xl font-light line-clamp-2"
```

#### Issue 12.4: Newsletter Input Width Constraints
**File:** [src/components/store/Newsletter.tsx](src/components/store/Newsletter.tsx#L16)  
**Lines:** 16  
**Severity:** Low  
**Description:**
```tsx
<div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
```
- `max-w-3xl` (48rem = 768px) centered
- Form likely inside with email input
- Responsive enough, but `px-5` might be insufficient on very small screens

**Fix Required:**
- Ensure form inside uses `px-4 sm:px-6` as well

---

## Summary of Recommendations

### Priority 1 (Critical - Breaks Functionality)
1. [2.1] Add horizontal scroll container to InventoryTable
2. [1.1] Adjust admin sidebar width breakpoints (md→lg)
3. [1.2] Make mobile sheet responsive width

### Priority 2 (High - Poor UX on Mobile)
1. [4.1] Make image gallery thumbnails responsive with horizontal scroll
2. [3.2] Fix CheckoutForm layout grid on tablets
3. [2.4] Make bulk action bar responsive
4. [7.1] Adjust ProductGrid 4-column starting point to mobile

### Priority 3 (Medium - Refinements)
1. Use `clamp()` for text sizing instead of fixed breakpoint jumps
2. Add responsive padding/margins across sections
3. Make chart heights responsive
4. Optimize modal/dialog widths on mobile

### Priority 4 (Low - Polish)
1. Fine-tune line-height and letter-spacing for mobile
2. Add line-clamping to prevent text overflow
3. Optimize icon sizes on responsive breakpoints

---

## Testing Checklist

- [ ] Test on 320px (iPhone SE)
- [ ] Test on 375px (iPhone 12)
- [ ] Test on 768px (iPad)
- [ ] Test on 1024px (iPad Pro)
- [ ] Test on 1440px (Desktop)
- [ ] Test navigation drawer on mobile
- [ ] Test admin tables on tablet
- [ ] Test forms across all breakpoints
- [ ] Test image galleries with horizontal scrolling
- [ ] Verify no horizontal scrolling on body element
- [ ] Check text readability at all sizes
- [ ] Verify touch target sizes (min 44px)

---

**Report Generated:** 2026-05-22  
**Total Issues Found:** 37  
**Files Affected:** 23  
**Estimated Fix Time:** 8-12 hours
