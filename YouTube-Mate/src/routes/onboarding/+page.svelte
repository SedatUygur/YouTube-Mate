<script lang="ts">
import { enhance } from '$app/forms';  
import { FileButton } from '@skeletonlabs/skeleton';

let files: FileList;
</script>

<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
<form
  class="pt-4"
  method="POST"
  use:enhance={({ form, data, action, cancel }) => {
    return async ({ result, update }) => {}
  }}
>
  <label for="name">
    <span>Username</span>
    <input type="text" id="username" value="sedat" minlength="4" required>
  </label>
  <p class="my-4">Lorem Ipsum is not simply random text.</p>
  <div class="flex justify-center">
    <FileButton bind:files button="btn variant-filled-surface">Upload File</FileButton>
  </div>
  <p class="pt-4">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
  <div class="flex justify-end my-4">
    <button class="btn variant-filled-success btn-base">Lets Go!</button>
  </div>
</form>