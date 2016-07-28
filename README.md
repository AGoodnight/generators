# generators

A repository of bare-bones generators

<b>Options for generators</b>
<table>
<tr>
<td>-l</td><td>the location ( absolute path ) where you want the build to be built</td>
</tr><tr>
<td>-n</td> <td>the name of your project</td>
</tr><tr>
<td>-r</td> <td>the location of any resources ( absolute path ), partials etc for the build</td>
</tr>
</table>

<b>Build an Angular/Flask/Bootstrap/Jasmine project</b>
<p>Using the build_angularbootstrap.sh supply the location, name and resources. your resources option will be the _partials directory</p>

You will be prompted by npm and bower for statisticall information. So it's not completley automated, however it is better than manual building.
