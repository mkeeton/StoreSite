import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'
export default {
entry: 'app/main.js',
    dest: 'wwwroot/dist/build.js', // output a single application bundle
sourceMap: false,
format: 'iife',
plugins: [
    nodeResolve({jsnext: true, module: true}),
    commonjs({
        include: ['node_modules/rxjs/**',
            'node_modules/primeng/**'],
        namedExports: {
            'node_modules/primeng/primeng.js': [
                'PanelModule',
                'InputSwitchModule',
                'InputMaskModule',
                'ProgressBarModule',
                'DropdownModule',
                'CalendarModule',
                'InputTextModule',
                'DataTableModule',
                'DataListModule',
                'ButtonModule',
                'DialogModule',
                'AccordionModule',
                'RadioButtonModule',
                'ToggleButtonModule',
                'CheckboxModule',
                'SplitButtonModule',
                'ToolbarModule',
                'SelectButtonModule',
                'OverlayPanelModule',
                'TieredMenuModule',
                'GrowlModule',
                'ChartModule',
                'Checkbox',
                'Dropdown',
                'Calendar',
                'DataGridModule',
                'DataTable',
                'MultiSelectModule',
                'TooltipModule',
                'FileUploadModule',
                'TabViewModule',
                'AutoCompleteModule'
            ]
        },
    }),
    uglify()
]
}