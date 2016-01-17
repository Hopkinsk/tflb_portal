<td>
<input type="checkbox" > 
</td>
<td>
<%= obj.studyId %> 
</td>
<td>
<%= obj.date %> 
</td>
<td>
<% if(obj.complete == 1){ %>
<span class="study-complete-tag alert-info"><b>Complete</b></span>
<% } else { %>

<button class="btn btn-sm alert-success js-continue-study"><b>Continue</b></button>
<% } %>
</td>
