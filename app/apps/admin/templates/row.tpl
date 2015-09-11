<td>
<input type="checkbox"> 
</td>
<td>
<%= obj.studyId %> 
</td>
<td>
<%= obj.date %> 
</td>
<td>
<% if(obj.complete == 1){ %>
<span class="study-complete-tag alert-success">Complete</span>
<% } else { %>

<button class="btn btn-sm alert-danger js-continue-study"> Continue </button>
<% } %>
</td>
